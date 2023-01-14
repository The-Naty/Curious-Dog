export interface Question {
  id: number;
  body: string;
  answer?: string;
  isAnonymous: boolean;
  askerId: number;
  receiverId: number;
  createdAt: string;
  updatedAt: string;
}
