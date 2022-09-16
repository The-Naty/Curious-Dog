import App from "./app";
import IndexRoute from "./api/routes/index.route";

(async () => {
  const app = new App([new IndexRoute()]);
  await app.initializeApp();
  app.listen();
})();
