import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useMyQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import QuestionCard from '../shared-components/QuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';
import Toggler from '../shared-components/Toggler';

const Layout = () => {
  const [checkAsked, setCheckAsked] = useState<boolean>(false);
  const [checkFollowingAskedQuestions, setChecFollowingAskedQuestions] = useState<boolean>(false);
  const [checFollowingRecivedQuestions, setChecFollowingRecivedQuestions] = useState<boolean>(false);

  const limit = 3;
  const { data: questionsData, isLoading: questionLoading, refetch: questionsRefetch, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyQuestions({
    asked: checkAsked,
    followingAsked: checkFollowingAskedQuestions,
    followingRecived: checFollowingRecivedQuestions,
    limit: limit,
  });

  useBottomScrollListener(
    useCallback(async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage]),
  );

  const updateToggler = (stateUpdater: Dispatch<SetStateAction<boolean>>) => {
    stateUpdater(prevState => !prevState);
  };

  return (
    <>
      <div className="xl:flex flex-row-reverse justify-center justify-between items-start my-4">
        <div className="flex flex-col justify-center">
          <Toggler checkedState={checkAsked} updateStateHandler={() => updateToggler(setCheckAsked)} togglerText={'display questions you asked'} />
          <Toggler
            checkedState={checkFollowingAskedQuestions}
            updateStateHandler={() => updateToggler(setChecFollowingAskedQuestions)}
            togglerText={'display follwoing asked questions'}
          />
          <Toggler
            checkedState={checFollowingRecivedQuestions}
            updateStateHandler={() => updateToggler(setChecFollowingRecivedQuestions)}
            togglerText={'display follwoing recived questions'}
          />
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
