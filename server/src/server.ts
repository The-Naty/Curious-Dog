import express from "express";
import routes from "./routes";

import cors from "cors";
import errorHandlerMiddleware from "./middleware/error.handler";

const server = express();

server.use(cors());
server.use("/", routes);
server.use(errorHandlerMiddleware);

export default server;
