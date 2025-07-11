import { useStateProvider } from "@/context/StateContext";
import { calculateTime } from "@/utils/CalculateTime";
import React from "react";

function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-18 z-0"></div>
      <div className="mx-10 my-6 relative bottom-0 z-40 left-0">
      <div className="flex w-full">
        <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
          {messages?.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === userInfo.id
                ? "justify-end"
                : "justify-start"
              }`}
            >
              {message.type === "text" && (
                <div
                  className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                    message.senderId === userInfo.id
                      ? "bg-outgoing-background"
                      : "bg-incoming-background"
                  }`}
                >
                  <span className="break-all">{message.message}</span>
                  {/*<div className="flex gap-1 items-end">
                    <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                      {calculateTime(message.createdAt)}
                    </span>
                  </div>*/}

                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default ChatContainer;



