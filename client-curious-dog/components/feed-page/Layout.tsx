import { useCallback, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useMyQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import QuestionCard from '../shared-components/QuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';
import Toggler from '../shared-components/Toggler';

const Layout = () => {
  const [checkAsked, setCheckAsked] = useState<boolean>(false);
  const limit = 3;
  const { data: questionsData, isLoading: questionLoading, refetch: questionsRefetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyQuestions({
    asked: checkAsked,
    limit: limit,
  });

  useBottomScrollListener(
    useCallback(async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage]),
  );

  const updateToggler = () => {
    setCheckAsked(prevState => !prevState);
  };

  return (
    <>
      <div className="xl:flex flex-row-reverse justify-center justify-between items-start my-4">
        <div className="flex justify-center">
          <Toggler checkedState={checkAsked} updateStateHandler={updateToggler} />
        </div>
        <div className="flex flex-col justify-center flex-grow">
          {questionLoading
            ? renderPlaceholders(limit, <QuestionCardPlaceholder />)
            : questionsData?.pages.map(p => {
                return p.questions.map(question => {
                  return <QuestionCard key={question.id} question={question} onQuestionAnswered={() => questionsRefetch()} />;
                });
              })}
          {isFetchingNextPage ? renderPlaceholders(limit, <QuestionCardPlaceholder />) : null}
          {hasNextPage ? null : <span className="text-center flex justify-center my-4">Seems there are no more questions on your feed</span>}
        </div>
      </div>
    </>
  );
};

export default Layout;
