import { User } from "@prisma/client";
import { prisma } from "../database";

class AuthService {
  
  public async registerUser(userData: Partial<User>): Promise<void> {
    const { email, password, username, profilePicture } = userData;
    try {
      await prisma.user.create({
          data: {
            email,
            username,
            password,
            profilePicture
          } as User,
        })
        console.log("User created succefully")
    } catch (err){
      console.log("failed to create user, for:", err)
    }
      
  }
}

export default AuthService;
