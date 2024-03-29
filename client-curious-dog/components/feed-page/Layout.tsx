import { Dispatch, SetStateAction, useCallback, useState, useEffect } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useMyQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import QuestionCard from '../shared-components/QuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';
import Toggler from '../shared-components/Toggler';

const Layout = () => {
  const [checkRecived, setCheckRecived] = useState<boolean>(true);
  const [lockRecived, setlockRecived] = useState<boolean>(true);
  const [checkAsked, setCheckAsked] = useState<boolean>(false);
  const [checkFollowingAskedQuestions, setChecFollowingAskedQuestions] = useState<boolean>(false);
  const [checFollowingRecivedQuestions, setChecFollowingRecivedQuestions] = useState<boolean>(false);

  const limit = 5;
  const {
    data: questionsData,
    isLoading: questionLoading,
    refetch: questionsRefetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyQuestions({
    asked: checkAsked,
    recived: checkRecived,
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

  useEffect(() => {
    if (!checkAsked && !checkFollowingAskedQuestions && !checFollowingRecivedQuestions) {
      setCheckRecived(true);
      setlockRecived(true);
    } else {
      setlockRecived(false);
    }
  }, [checFollowingRecivedQuestions, checkAsked, checkFollowingAskedQuestions, checkRecived]);

  return (
    <>
      <div className="xl:flex flex-row-reverse justify-between items-start my-4">
        <div className="flex flex-col justify-center">
          <Toggler
            checkedState={checkRecived}
            updateStateHandler={() => updateToggler(setCheckRecived)}
            togglerText={'Recived questions'}
            disabled={lockRecived}
          />

          <Toggler checkedState={checkAsked} updateStateHandler={() => updateToggler(setCheckAsked)} togglerText={'Asked questions'} />
          <Toggler
            checkedState={checkFollowingAskedQuestions}
            updateStateHandler={() => updateToggler(setChecFollowingAskedQuestions)}
            togglerText={'Follwoing asked questions'}
          />
          <Toggler
            checkedState={checFollowingRecivedQuestions}
            updateStateHandler={() => updateToggler(setChecFollowingRecivedQuestions)}
            togglerText={'Follwoing recived questions'}
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
          {hasNextPage || questionLoading ? null : (
            <span className="text-center flex justify-center my-4 text-black">Seems there are no more questions on your feed</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Layout;
