export interface User {
  id?: number;
  username: string;
  email: string;
  profilePicture?: string;
  token?: string;
  _count?: { receivedQuestions: number };
}
