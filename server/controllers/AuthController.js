import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required.", status: false });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ msg: "Invalid email format.", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found.", status: false });
    }
    return res.json({ msg: "User found.", status: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, profilePicture } = req.body;
    if (!email || !name || !profilePicture) {
      return res.json({ msg: "Email, Name and Image are required.", status: false });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ msg: "Invalid email format.", status: false });
    }
    if (name.length < 3) {
      return res.json({ msg: "Name must be at least 3 characters.", status: false });
    }
    const prisma = getPrismaInstance();
    const user = await prisma.user.create ({
      data: { email, name, about, profilePicture },
    });
    return res.json({ msg: "Success", status: true, user });
  } catch (err) {
    if (err.code === "P2002") {
      return res.json({ msg: "Email already exists.", status: false });
    }
    next(err);
  }
};

export const getAllusers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance	();
    const users = await prisma.user.findMany ({
    orderBy:{name: "asc"},
    select:{
      id:true,
      email:true,
      name:true,
      profilePicture:true,
      about:true,
    },
    });
    const usersGroupedByInitialLetter = {};

    users.forEach((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      if(!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }
      usersGroupedByInitialLetter[initialLetter].push(user);
      
    });
    return res.status(200).send({ users: usersGroupedByInitialLetter});
  } catch(err) {
    next (err);
  }
}