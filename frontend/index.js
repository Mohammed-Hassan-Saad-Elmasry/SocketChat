const socket = io("http://localhost:3000", {
  autoConnect: false,
});

socket.on("connect", () => {
  console.log("connected to socket backend");
});

const message = document.querySelector("#name");
const userId = document.querySelector("#userId");
const sendmessage = document.querySelector("#connect");

const token = document.querySelector("#token");
const sendtoken = document.querySelector("#sendtoken");

sendtoken.addEventListener("click", () => {
  const userToken = token.value;
  if (userToken) {
    socket.auth = { token: userToken };
    socket.connect();
  }
});

sendmessage.addEventListener("click", () => {
  socket.emit("sendmessage", { userId: userId.value, message: message.value });
});

socket.on("hellouser", (message) => {
  console.log(message);
});

socket.on("hello", (data) => {
  console.log(data);
});

socket.on("messageTouser", (message) => {
  console.log("Received message: ", message);
});
socket.on("connect_error", (err) => {
  console.log("Connection failed:", err.message); 
});
