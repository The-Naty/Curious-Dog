import { NextFunction, Request, Response } from 'express';
import { AuthService, IAuthService } from '../services/auth.service';
export interface IAuthController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService = new AuthService()) {}

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password, email } = req.body;

    try {
      const data = await this.authService.registerUserAndSignToken({
        username: username,
        password: password,
        email: email,
      });

      res.status(201).cookie('auth', data.token, { httpOnly: true }).json({
        id: data.newUser.id,
        username: data.newUser.username,
        email: data.newUser.email,
        profilePicture: data.newUser.profilePicture,
        token: data.token,
      });
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

      res.status(200).cookie('auth', data.token, { httpOnly: true }).json({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        profilePicture: data.user.profilePicture,
        followers: data.user.followers,
        following: data.user.following,
        token: data.token,
      });
    } catch (err) {
      next(err);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).clearCookie('auth').send('user logged out');
  };
}
