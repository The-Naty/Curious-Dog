import "dotenv/config";
import server from "./server";
import { prisma } from "./database";

server.listen(process.env.PORT, () => {
  console.log("server is running");
});

const testConnection = (async (): Promise<any> => {
  try {
    const users = await prisma.user.findMany();

    console.log(users, "aa");

    console.log("connection esablished");
  } catch (err) {
    throw new Error(`Failed to connect due to ${err}`);
  }
})();
