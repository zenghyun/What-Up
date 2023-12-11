import { ioResponse, SystemMessage, LoginResponse } from "../types/io.type";

const getUserController = require("../Controllers/user.controller");
const getChatController = require("../Controllers/chat.controller");

module.exports = function (io: ioResponse) {
  // 연결된 사람의 정보를 매개변수로 넘김
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on(
      "login",
      async (userName: string, cb: (arg0: LoginResponse) => void) => {
        // 유저정보를 저장
        try {
          const user = await getUserController.saveUser(userName, socket.id);

          const welcomeMessage: SystemMessage = {
            chat: `${user.name}님이 방에 입장하였습니다.`,
            user: { id: null, name: "system" },
          };

          io.emit("message", welcomeMessage);
          cb({ ok: true, data: user });
        } catch (error) {
          cb({ ok: false, error: error.message });
        }
      }
    );

    socket.on(
      "sendMessage",
      async (message: string, cb: (arg0: LoginResponse) => void) => {
        try {
          // 유저 찾기 socket.id
          const user = await getUserController.checkUser(socket.id);
          // 메세지 저장 (유저)
          const newMessage = await getChatController.saveChat(message, user);
          io.emit("message", newMessage);
          cb({ ok: true });
        } catch (error) {
          cb({ ok: false, error: error.message });
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
