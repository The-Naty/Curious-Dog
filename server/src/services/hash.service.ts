import bcrypt from 'bcrypt'

export interface IHashService {
    
  hashPassword(password: string): Promise<string>;
}
class HashService implements IHashService{
  
  public async hashPassword(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword;
  }
}

export { HashService };
