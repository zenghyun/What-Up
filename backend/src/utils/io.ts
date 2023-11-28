module.exports = function (io) {
  // 연결된 사람의 정보를 매개변수로 넘김
  io.on("connection", async (socket) => {
    console.log("client is connected", socket.id);

    socket.on("login", async (userName, cb) => {
      console.log(userName);
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected");
    });
  });
};
