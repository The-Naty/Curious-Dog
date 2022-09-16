import App from "./app";

import IndexRoute from "./api/routes/index.route";
// import UsersRoute from "./api/routes/user.route";

(async () => {
  console.log("server running");

  const app = new App([new IndexRoute()]);
  await app.initializeApp();
  app.listen();
})();
