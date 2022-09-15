import "dotenv/config";
import "./common/utils/handleRunErrors";
import App from "./app";

import IndexRoute from "./api/routes/index.route";
// import UsersRoute from "./api/routes/user.route";

(async () => {
  //   const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);
  //   await app.initializeApp();
  //   app.listen();
})();
