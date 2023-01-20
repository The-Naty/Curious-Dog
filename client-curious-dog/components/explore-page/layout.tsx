import { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useGlobalQuestions } from '../../lib/hooks/question.hooks';
import { renderPlaceholders } from '../../util/utilities';
import GlobalQuestionCard from '../shared-components/GlobalQuestionCard';
import QuestionCardPlaceholder from '../shared-components/placeholders/QuestionCardPlaceholder';
import FeaturedList from '../shared-components/FeaturedList';
import { useFeaturedUsers } from '../../lib/hooks/user.hooks';

const Layout = () => {
  const limit = 5;

  const {
    data: globalQuestionsData,
    isLoading: globalQuestionsLoading,
    refetch: globalQuestionsRefetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGlobalQuestions({
    limit: limit,
  });

  const { data: featuredUsersData, isLoading: featuredUsersLoading, refetch: featuredUsersRefetch } = useFeaturedUsers();

  useBottomScrollListener(
    useCallback(async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage]),
  );

  return (
    <>
      {featuredUsersLoading ? renderPlaceholders(1, <QuestionCardPlaceholder />) : <FeaturedList featuredUsers={featuredUsersData} />}

      {globalQuestionsLoading
        ? renderPlaceholders(limit, <QuestionCardPlaceholder />)
        : globalQuestionsData?.pages.map(p => {
            return p.questions.map(question => {
              return <GlobalQuestionCard key={question.id} question={question} onQuestionAnswered={() => globalQuestionsRefetch()} />;
            });
          })}
      {isFetchingNextPage ? renderPlaceholders(limit, <QuestionCardPlaceholder />) : null}
      {hasNextPage ? null : <span className="text-center flex justify-center my-4">Seems like we are out of question to show ..</span>}
    </>
  );
};

export default Layout;
