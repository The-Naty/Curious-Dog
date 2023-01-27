import { Question } from '../interfaces/question.interface';
import { User } from '../interfaces/user.interface';

export type QuestionWithAsker = Question & { asker: User | null };
export type QuestionWithAskerAndReciver = Question & { asker: User | null } & { receiver: User };
