import { NextFunction, Request, Response } from 'express'
import { AuthService, IAuthService } from '../services/auth.service'
import { RequestWithUserPayload } from '../common/interfaces/requestWithUserPayload.interface'
export interface IAuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>
}

class AuthController implements IAuthController {
    constructor(private authService: IAuthService = new AuthService()) {}

    public register = async (
        req: RequestWithUserPayload,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { username, password, email } = req.body
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
