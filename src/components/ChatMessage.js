import React from "react";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center space-x-2 m-2">
      <img
        className="h-8"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"
        alt="user-icon"
      />
      <span className="font-bold">{name}</span>
      <span>{message}</span>
    </div>
  );
};

export default ChatMessage;
