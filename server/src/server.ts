import App from "./app";
import {IndexRoute} from "./api/routes/index.route";
import {AuthRoute} from "./api/routes/auth.route";

(async () => {
  const app = new App([new IndexRoute(), new AuthRoute()]);
  await app.initializeApp();
  app.listen();
})();
