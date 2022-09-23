import { User } from '@prisma/client'
import { prisma } from '../database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface IAuthService {
    registerUserAndSignToken(userData: Partial<User>): Promise<string>
}

export class AuthService implements IAuthService {
    public async registerUserAndSignToken(
        userData: Partial<User>
    ): Promise<string> {
        const { email, password, username, profilePicture } = userData
        const hashedPassword = await this.hashPassword(password as string)
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                profilePicture,
            } as User,
        })

        const token = this.generateSignedUserToken(newUser.id)

        return token
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        return hashedPassword
    }

    private async generateSignedUserToken(id: number): Promise<string> {
        const token = jwt.sign(
            { _id: id.toString() },
            process.env.SECRET_KEY as string,
            {
                expiresIn: '7 days',
            }
        )
        return token
    }
}
