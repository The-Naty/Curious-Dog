import express from "express";
import {Route} from "./common/interfaces/routes.interface";
import cors from "cors";

class App {
  public app: express.Application;
  public port: string | number;
  public routes: Route[];

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.routes = routes;
  }

  public async initializeApp() {
    this.initializeMiddlewares();
    this.initializeRoutes(this.routes);
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }
}

export default App;
