import { User } from "@prisma/client";
import { prisma } from "../database";
import bcrypt from 'bcrypt'


export interface IAuthService {
  registerUser(userData: Partial<User>): Promise<User>;
  
}
class AuthService implements IAuthService{

  
  public async registerUser(userData: Partial<User>): Promise<User> {
    const { email, password, username, profilePicture } = userData;
    const hashedPassword = await this.hashPassword((password) as string)
      const newUser = await prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword,
            profilePicture
          } as User,
        })    
  
      return newUser
  }
  private async hashPassword(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword;
  }
}

export { AuthService };
