import { useQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import QuestionCard from '../shared-components/QuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';

const Layout = () => {
  const limit = 13;
  const { data: questionsData, isLoading: questionLoading } = useQuestions({ asked: false, limit: limit, page: 1 });

  return (
    <>
      {questionLoading
        ? renderPlaceholders(limit, <QuestionCardPlaceholder />)
        : questionsData?.questions?.map(question => {
            return <QuestionCard key={question.id} question={question} />;
          })}
    </>
  );
};

export default Layout;
