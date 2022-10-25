import { NextFunction, Request, Response } from 'express';
import { AuthService, IAuthService } from '../services/auth.service';
import { UniqueConstraintViolation } from '../common/errors';
export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService = new AuthService()) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, email } = req.body;

    try {
      const token = await this.authService.registerUserAndSignToken({
        username: username,
        password: password,
        email: email,
      });

      res.status(201).cookie('auth', token, { httpOnly: true }).send(`${username} is successfully registered`);
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, email } = req.body;

    try {
      const data = await this.authService.loginUserAndSignToken({
        username: username,
        password: password,
        email: email,
      });

      res
        .status(200)
        .cookie('auth', data.token, { httpOnly: true })
        .json({ username: data.user.username, email: data.user.email, profile_picture: data.user.profilePicture });
    } catch (err) {
      next(err);
    }
  };
}
