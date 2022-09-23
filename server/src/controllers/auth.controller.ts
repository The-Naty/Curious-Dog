import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { IAuthService } from '../services/auth.service'
import { AuthenticationCustomRequest } from '../middleware/authenticate-token.middleware'

export interface IAuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>
}

class AuthController implements IAuthController {
    constructor(private authService: IAuthService = new AuthService()) {}

    public register = async (
        req: AuthenticationCustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { username, password, email } = req.body
        console.log(req.user)

        const token = await this.authService.registerUserAndSignToken({
            username: username,
            password: password,
            email: email,
        })
        res.status(201)
            .cookie('auth', token, { httpOnly: true })
            .send(`${username} is successfully registered`)
    }
}
export { AuthController }
