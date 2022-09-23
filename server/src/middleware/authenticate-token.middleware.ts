import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import { prisma } from '../database'
import {RequestWithUserPayload} from '../common/interfaces/requestWithUserPayload.interface'
export const secret: Secret = process.env.SECRET_KEY as string

export const auth = async (
    req: RequestWithUserPayload,
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

        res.status(401).send('Unautorized. Invalid Credentials')
    }
}
