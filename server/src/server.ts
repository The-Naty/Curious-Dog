import App from './app';
import { IndexRoute } from './api/routes/index.route';
import { AuthRoute } from './api/routes/auth.route';
import { QuestionRoute } from './api/routes/question.route';

(async () => {
  const app = new App([new IndexRoute(), new AuthRoute(), new QuestionRoute()]);
  await app.initializeApp();
  app.listen();
})();
