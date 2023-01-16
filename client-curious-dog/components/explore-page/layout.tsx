import React, { useCallback } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useGlobalQuestions } from '../../lib/hooks/question.hooks';

const Layout = () => {
  const limit = 3;
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
  useBottomScrollListener(
    useCallback(async () => {
      if (hasNextPage) {
        await fetchNextPage();
      }
    }, [fetchNextPage, hasNextPage]),
  );
  console.log(globalQuestionsData);
  return <div>explore layout</div>;
};

export default Layout;
