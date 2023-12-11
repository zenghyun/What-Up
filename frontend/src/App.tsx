import { useEffect, useState, useCallback } from "react";
import "./App.css";
import socket from "./server";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

import { LoginResponse } from "../../backend/src/types/io.type";
import { MessageResponse } from "./types/message.type";
import { UserInfo } from "../../backend/src/types/user.type";

function App() {
  const [user, setUser] = useState<UserInfo | undefined>({});
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<Array<MessageResponse>>([]);

  const askUserName = useCallback(() => {
    const userName: string | null = prompt("당신의 이름을 입력하세요");

    socket.emit("login", userName, (res: LoginResponse) => {
      if (res?.ok) {
        setUser(res.data);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, [askUserName]);

  const sendMessage = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      socket.emit("sendMessage", message, (res: unknown) => {
        console.log("sendMessage res", res);
      });
    },
    [message]
  );

  return (
    <div>
      <div className="App">
        {user ? (
          <MessageContainer messageList={messageList} user={user} />
        ) : null}

        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
