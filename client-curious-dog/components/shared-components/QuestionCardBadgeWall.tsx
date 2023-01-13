import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import { QuestionWithAsker } from '../../lib/types/question-with-user.type';

interface Props {
  question: QuestionWithAsker;
}
const QuestionCardBadgeWall = ({ question }: Props) => {
  const [user, setUser] = useAtom(userAtom);

  return (
    <div className="flex flex-col">
      {question.askerId === user?.id ? (
        <div>
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
            Asked by you
          </span>
        </div>
      ) : null}
      {question.answer ? (
        <div>
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-200 text-gray-700 rounded-full">
            Answered
          </span>
        </div>
      ) : (
        <div>
          <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-200 text-gray-700 rounded-full">
            Unaswered
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionCardBadgeWall;
