import { User } from "@prisma/client";
import { prisma } from "../database";
import { HashService, IHashService } from './hash.service';

export interface IAuthService {
  registerUser(userData: Partial<User>): Promise<User>;
}
class AuthService implements IAuthService{

  constructor(private  hashService: IHashService = new HashService()) {
  }

  public async registerUser(userData: Partial<User>): Promise<User> {
    const { email, password, username, profilePicture } = userData;
    const hashedPassword = await this.hashService.hashPassword((password) as string)
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
}

export { AuthService };
