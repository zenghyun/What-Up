import { useEffect } from "react";
import "./App.css";
import socket from "./server";

function App() {
  useEffect(() => {
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.emit("login", userName, (res: any) => {
      console.log(res);
    });
  };
  return (
    <div>
      <div className="App"></div>
    </div>
  );
}

export default App;
