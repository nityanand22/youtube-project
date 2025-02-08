import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { randomMessage, randomNameGenerate } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const ChatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        addMessage({
          name: randomNameGenerate(),
          message: randomMessage(30),
        })
      );
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="w-full h-[500px] ml-2 p-2 border border-black overflow-y-scroll flex flex-col-reverse">
        <div>
          {ChatMessages.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>

      <form
        className="w-full flex justify-between p-2"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Message Sent");
          dispatch(
            addMessage({
              name: "Nityanand",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="w-full p-2 border border-black"
          type="text"
          placeholder="Type a message"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className=" px-3 mx-2 bg-red-600">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
