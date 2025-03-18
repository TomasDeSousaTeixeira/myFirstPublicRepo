import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "https";
import fs from "fs";
export const app = express();

// Load SSL certificate and key
const options = {
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
};

const server = createServer(options, app);
app.use(
  cors({
    origin: "https://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(routes);
const io = new Server(server, {
  cors: {
    origin: "https://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.locals.userSockets = new Map();

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  if (id) {
    app.locals.userSockets.set(id, socket);

    socket.on("disconnect", () => {
      app.locals.userSockets.delete(id);
    });
  }
});

server.listen(5000, () => {
  console.log(`HTTP server: http://localhost:5000`);
  console.log(`WebSocket server: ws://localhost:5000`);
});
