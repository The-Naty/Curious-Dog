import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../database'
import { User } from '@prisma/client'

export const secret: Secret = process.env.SECRET_KEY as string

export interface AuthenticationCustomRequest extends Request {
    // token: string | JwtPayload
    user?: User
}

export const auth = async (
    req: AuthenticationCustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies['auth']
        if (!token) {
            throw new Error()
        }
        const decoded = jwt.verify(token, secret) as JwtPayload
        const user = await prisma.user.findUniqueOrThrow({
            where: { id: parseInt(decoded._id) },
        })
        req.user = user
        next()
    } catch (err) {
        console.log(err)

        res.status(401).send('Unautorized. Invalid user data')
    }
}
