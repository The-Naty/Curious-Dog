import "dotenv/config";
import server from "./server";
import { prisma } from "./database";

server.listen(process.env.PORT, () => {
  console.log("server is running");
});

//Test Connection

//Adding user to database

// const addUser = (async () => {
//   const user = await prisma.user.create({
//     data: {
//       email: "tazy@prisma.io",
//       password: "12121234",
//       username: "tazy",
//     },
//   });
// })();

//Fetching all users from database

// const getAllUsers = (async () => {
//   const allUsers = await prisma.user.findMany();
//   console.log("All Users", allUsers);
// })();
