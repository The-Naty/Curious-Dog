import { User } from "@prisma/client";
import { prisma } from "../database";

export interface IAuthService {
  registerUser(userData: Partial<User>): Promise<User>;
}
class AuthService implements IAuthService{
  
  public async registerUser(userData: Partial<User>): Promise<User> {
    const { email, password, username, profilePicture } = userData;
      const newUser = await prisma.user.create({
          data: {
            email,
            username,
            password,
            profilePicture
          } as User,
        })    
  
      return newUser
  }
}

export { AuthService };
