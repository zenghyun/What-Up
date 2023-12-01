const User = require("../Models/user");

const userController = {
  saveUser: async (userName: String, sid: String) => {
    // 이미 존재하는 유저인지 확인 후, 없다면 새로 유저정보를 만듬
    let user = await User.findOne({ name: userName });
    if (!user) {
      user = new User({
        name: userName,
        token: sid,
        online: true,
      });
    }
    // 이미 존재하는 유저라면, 연결 정보 token값만 변경
    user.token = sid;
    user.online = true;

    await user.save();
    return user;
  },
  checkUser: async (sid: String) => {
    const user = await User.findOne({ token: sid });
    if (!user) throw new Error("User not found");
    return user;
  },
};

module.exports = userController;
