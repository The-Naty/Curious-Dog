import express from 'express';
import { Route } from './common/interfaces/routes.interface';
import cors from 'cors';
import cookie from 'cookie-parser';
import { errorMiddleware } from './middleware/error-handler.middleware';
// import { createTopicEvents } from './services/pubsub.service';

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
    this.initializeErrorHandling();

    // await createTopicEvents();
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
    this.app.use(cookie());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
