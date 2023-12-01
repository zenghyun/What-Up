// 웹소켓 세팅
const { createServer } = require("http");
const appServer = require("./app");
const { Server } = require("socket.io");
// dotenv => node.js에서 환경 변수를 좀 더 효과적으로 관리하기 위해 사용 
require("dotenv").config();

const httpServer = createServer(appServer);
const io = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    allowedHeaders: ["Content-Type"],
  },
});
require("./utils/io")(io);
httpServer.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
