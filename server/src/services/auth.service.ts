import { User } from '@prisma/client';
import { prisma } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IAuthService {
  registerUserAndSignToken(userData: Partial<User>): Promise<string>;
}

export class AuthService implements IAuthService {
  private AUTH_TOKEN_EXPIRY = '7d';

  public async registerUserAndSignToken(userData: Partial<User>): Promise<string> {
    const { email, password, username, profilePicture } = userData;
    const hashedPassword = await this.hashPassword(password as string);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        profilePicture,
      } as User,
    });

    return this.generateSignedUserToken(newUser.id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async generateSignedUserToken(id: number): Promise<string> {
    return jwt.sign({ id }, process.env.SECRET_KEY as string, {
      expiresIn: this.AUTH_TOKEN_EXPIRY,
    });
  }
}
