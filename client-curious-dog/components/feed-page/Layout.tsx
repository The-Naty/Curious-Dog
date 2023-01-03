import { useQuestions } from '../../lib/hooks/question.hooks';

const Layout = () => {
  const { data: questionsData, isLoading: questionLoading } = useQuestions({ asked: false, limit: 3, page: 1 });

  return (
    <div>
      feed Layout
      <div>
        {questionsData?.questions?.map(q => {
          return <span key={q.id}> {q.body}</span>;
        })}
      </div>
    </div>
  );
};

export default Layout;
