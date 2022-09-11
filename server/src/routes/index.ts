import express from "express";

const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response) => {
  return res.json("ask.FM_clone API!");
});

// adding new routes
// routes.use('/', routeObjAfterBeingImported)

export default routes;
