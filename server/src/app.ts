import express from "express";
// import routes from "./routes";
import Routes from "./common/interfaces/routes.interface";
import cors from "cors";
import errorHandlerMiddleware from "./middleware/error.handler";
import { prisma } from "./database";

class App {
  public app: express.Application;
  public port: string | number;
  public routes: Routes[];
  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.routes = routes;
  }

  public async initializeApp() {
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
    this.initializeErrorHandling();
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api/", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;
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
