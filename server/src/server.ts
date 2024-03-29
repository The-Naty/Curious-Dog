import App from './app';
import { IndexRoute } from './api/routes/index.route';
import { AuthRoute } from './api/routes/auth.route';
import { QuestionRoute } from './api/routes/question.route';
import { FollowRoute } from './api/routes/follow.route';
import { UserRoute } from './api/routes/user.route';

(async () => {
  const app = new App([new IndexRoute(), new AuthRoute(), new QuestionRoute(), new FollowRoute(), new UserRoute()]);
  await app.initializeApp();
  app.listen();
})();
