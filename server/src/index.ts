import "dotenv/config";
import server from "./server";
import { prisma } from './database';

server.listen(process.env.PORT, () => {
  console.log("server is running");
});

// const trstConnection = (async() => {
 
//   const allUsers = await prisma.user.findMany() 
//   console.log("sdsdsdsd",allUsers)
// })();

