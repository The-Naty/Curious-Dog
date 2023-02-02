import { User } from '@prisma/client';
import { prisma } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../common/errors';
import { Event, publishNotification } from './pubsub.service';

export interface IAuthService {
  registerUserAndSignToken(userData: Partial<User>): Promise<{ token: string; newUser: User }>;
  loginUserAndSignToken(userData: { email?: string; username?: string; password: string }): Promise<{ user: User; token: string }>;
}

export class AuthService implements IAuthService {
  private AUTH_TOKEN_EXPIRY = '7d';

  public async registerUserAndSignToken(userData: Partial<User>): Promise<{ token: string; newUser: User }> {
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

    const token = await this.generateSignedUserToken(newUser.id);
    publishNotification(Event.UserRegister, { user: newUser });
    return { token, newUser };
  }

  public async loginUserAndSignToken(userData: { email?: string; username?: string; password: string }): Promise<{ user: User; token: string }> {
    const { email, password, username } = userData;

    const user = await prisma.user.findUniqueOrThrow({ where: { username, email } });

    const isPasswordValid = await this.comparePassword(password as string, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid credentials');
    }
    const token = await this.generateSignedUserToken(user.id);

    return { user, token };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, passwordDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }

  private async generateSignedUserToken(id: number): Promise<string> {
    return jwt.sign({ id }, process.env.SECRET_KEY as string, {
      expiresIn: this.AUTH_TOKEN_EXPIRY,
    });
  }
}
