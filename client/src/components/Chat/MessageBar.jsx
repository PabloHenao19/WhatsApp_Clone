import React, { useState } from "react";
import { BsEmojiSmile } from 'react-icons/bs';
import { ImAttachment } from 'react-icons/im';
import { MdSend } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { useStateProvider } from "@/context/StateContext";
import axios from "axios";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";

function MessageBar() {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");

 const sendMessage = async () => {
  if (!message.trim()) return; // Evitar enviar mensajes vacíos
  try {
    const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
      from: userInfo?.id, // Asegúrate de que 'userInfo' tenga el id
      to: currentChatUser?.id,
      message,
    });

    // Dispatch para agregar el mensaje localmente y que se muestre ya en el chat
    dispatch({
      type: "SET_NEW_MESSAGE",
      newMessage: {
        id: data.id || Date.now(), // usa el id que te regresa el backend o uno temporal
        senderId: userInfo.id,
        message: message,
        type: "text",
      },
    });

    setMessage(""); // Limpiar input
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <div className="flex gap-6">
        <BsEmojiSmile className="text-panel-header-icon cursor-pointer text-xl" title="Emoji" />
        <ImAttachment className="text-panel-header-icon cursor-pointer text-xl" title="Attach File" />
      </div>
      <div className="w-full rounded-lg h-10 flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg x-5 py-4 w-full"
          onChange={e => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className="flex w-10 items-center justify-center">
        <button>
          <MdSend
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Send Message"
            onClick={sendMessage}
          />
          {/* <FaMicrophone className="text-panel-header-icon cursor-pointer text-xl" title="Record" /> */}
        </button>
      </div>
    </div>
  );
}

export default MessageBar;

