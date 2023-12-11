import { useRef, useEffect } from "react";
import "./MessageContainer.css";
import { Container } from "@mui/system";
import { MessageResponse } from "../../types/message.type";
import { UserInfo } from "../../../../backend/src/types/user.type";
const MessageContainer = ({
  messageList,
  user,
}: {
  messageList: Array<MessageResponse>;
  user: UserInfo;
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="message-area">
      {messageList.map((message, index) => {
        return (
          <Container key={message._id} className="message-container">
            {message.user?.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : message.user?.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    (index === 0
                      ? { visibility: "visible" }
                      : messageList[index - 1].user.name === user.name) ||
                    messageList[index - 1].user.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="user-box">
                  <p className="user-name">{user.name}</p>
                  <div className="your-message">{message.chat}</div>
                </div>
              </div>
            )}
          </Container>
        );
      })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
