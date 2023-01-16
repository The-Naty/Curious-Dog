import { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useMyQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import QuestionCard from '../shared-components/QuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';

const Layout = () => {
  const limit = 3;
  const { data: questionsData, isLoading: questionLoading, refetch: questionsRefetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyQuestions({
    asked: false,
    limit: limit,
  });
  useBottomScrollListener(
    useCallback(async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage]),
  );
  return (
    <>
      {questionLoading
        ? renderPlaceholders(limit, <QuestionCardPlaceholder />)
        : questionsData?.pages.map(p => {
            return p.questions.map(question => {
              return <QuestionCard key={question.id} question={question} onQuestionAnswered={() => questionsRefetch()} />;
            });
          })}
      {isFetchingNextPage ? renderPlaceholders(limit, <QuestionCardPlaceholder />) : null}
      {hasNextPage ? null : <span className="text-center flex justify-center my-4">Seems there are no more questions on your feed</span>}
    </>
  );
};

export default Layout;
