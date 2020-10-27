const socketIo = require("socket.io");
let io = {};

const init = (server, session) => {
  io = socketIo(server)
    .use((socket, next) => {
      session(socket.request, {}, next);
    })
    .on("connection", (socket) => {
      // console.log(socket.request.session.passport);
    });
};

module.exports = {
  init,
  io,
};
