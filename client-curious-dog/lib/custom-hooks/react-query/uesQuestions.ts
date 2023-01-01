import { useQuery } from 'react-query';
import { fetchQuestions } from '../../api/questions.api';

function execute(asked: boolean) {
  return fetchQuestions(asked);
}

const useQuestions = (asked: boolean) => useQuery(['questions'], () => execute(asked), { cacheTime: 0 });

export default useQuestions;
