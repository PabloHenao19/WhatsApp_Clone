import getPrismaInstance from "../utils/PrismaClient.js";

// Controlador para agregar un mensaje
export const addMessage = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { message, from, to } = req.body;
    const fromId = parseInt(from);
    const toId = parseInt(to);

    if (!message || isNaN(fromId) || isNaN(toId)) {
      return res.status(400).json({
        status: false,
        error: "From, to, and message are required and must be valid.",
      });
    }

    const getUser = global.onlineUsers?.get(toId);
    const newMessage = await prisma.messages.create({
      data: {
        message,
        sender: { connect: { id: fromId } },
        reciever: { connect: { id: toId } },
        messageStatus: getUser ? "delivered" : "sent",
      },
      include: { sender: true, reciever: true },
    });

    return res.status(201).json({
      status: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (err) {
    next(err);
  }
};

// Controlador para obtener mensajes entre dos usuarios
export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const fromId = parseInt(req.params.from);
    const toId = parseInt(req.params.to);

    if (isNaN(fromId) || isNaN(toId)) {
      return res.status(400).json({
        status: false,
        error: "Invalid user IDs provided in parameters.",
      });
    }

    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: fromId, recieverId: toId },
          { senderId: toId, recieverId: fromId },
        ],
      },
      orderBy: { id: "asc" },
    });

    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (
        message.messageStatus !== "read" &&
        message.senderId === toId
      ) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });

    if (unreadMessages.length > 0) {
      await prisma.messages.updateMany({
        where: {
          id: {
            in: unreadMessages,
          },
        },
        data: {
          messageStatus: "read",
        },
      });
    }

    return res.status(200).json({
      status: true,
      messages,
    });
  } catch (err) {
    next(err);
  }
};



