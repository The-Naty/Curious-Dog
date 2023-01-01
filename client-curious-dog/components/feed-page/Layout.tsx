import React from 'react';
import { useQuery } from 'react-query';
import { fetchQuestions } from '../../lib/api/questions.api';
import { Question } from '../../lib/interfaces/question.interface';
import useQuestions from '../../lib/custom-hooks/react-query/uesQuestions';

const Layout = () => {
  const { data: questionsData, isLoading: questionLoading } = useQuestions(false);

  return (
    <div>
      feed Layout
      <div>
        {questionsData?.map(q => {
          return <span key={q.id}> {q.body}</span>;
        })}
      </div>
    </div>
  );
};

export default Layout;
