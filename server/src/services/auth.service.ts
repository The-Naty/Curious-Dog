import { User } from '@prisma/client';
import { prisma } from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { InvalidCredentialsError } from '../common/errors';

export interface IAuthService {
  registerUserAndSignToken(userData: Partial<User>): Promise<string>;
  loginUserAndSignToken(userData: Partial<User>): Promise<{ user?: User | null; token?: string }>;
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

  public async loginUserAndSignToken(userData: Partial<User>): Promise<{ user?: User | null; token?: string }> {
    const { email, password, username } = userData;

    const user = await prisma.user.findUnique({
      where: {
        ...(email
          ? {
              email: email,
            }
          : {}),
        ...(username
          ? {
              username: username,
            }
          : {}),
      },
    });
    if (!user) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    const validatePassword = await this.decryptPassword(password as string, user?.password as string);
    if (!validatePassword) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    const token = await this.generateSignedUserToken(user?.id as number);
    return { user, token };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async decryptPassword(password: string, passwordDB: string): Promise<boolean> {
    return bcrypt.compare(password, passwordDB);
  }

  private async generateSignedUserToken(id: number): Promise<string> {
    return jwt.sign({ id }, process.env.SECRET_KEY as string, {
      expiresIn: this.AUTH_TOKEN_EXPIRY,
    });
  }
}
