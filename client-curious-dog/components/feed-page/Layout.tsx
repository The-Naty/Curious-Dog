import { useQuestions } from '../../lib/hooks/question.hooks';
import QuestionCard from '../shared-components/QuestionCard';

const Layout = () => {
  const { data: questionsData, isLoading: questionLoading } = useQuestions({ asked: false, limit: 13, page: 1 });

  return (
    <>
      {questionsData?.questions?.map(question => {
        return <QuestionCard key={question.id} question={question} />;
      })}
    </>
  );
};

export default Layout;
