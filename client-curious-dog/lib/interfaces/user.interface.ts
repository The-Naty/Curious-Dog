export interface User {
  id?: number;
  username: string;
  email: string;
  profilePicture?: string;
  token?: string;
  _count?: { receivedQuestions: number; followers: number };
  followers?: [];
  following?: [];
  follower: User;
  folllowing: User;
}
