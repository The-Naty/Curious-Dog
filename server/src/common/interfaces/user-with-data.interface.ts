import { Follows } from '@prisma/client';

export interface userWithInfo {
  id: number;
  email: string;
  password?: string;
  username: string;
  profilePicture: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  followers?: Follows[];
  following?: Follows[];
}
