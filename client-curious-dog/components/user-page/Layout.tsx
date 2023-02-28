import { useUserStats } from '../../lib/hooks/user.hooks';
import UserFollowDetailsTabs from '../shared-components/UserFollowDetailsTabs';
import UserHeader from '../shared-components/UserHeader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AskQuestionContainer from '../shared-components/AskQuestionContainer';
import { askQuestion } from '../../lib/api/questions.api';
import { toast } from 'react-toastify';

interface Props {
  userId?: number;
}
const Layout = ({ userId }: Props) => {
  const {
    data: statsData,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useUserStats({
    userId: userId,
  });
  const router = useRouter();

  const [questionText, setQuestionText] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isStatsError) {
      router.push('/');
    }
  }, [isStatsError, router, statsError]);

  const typeQuestionHandler = (e: React.ChangeEvent<EventTarget>) => {
    setQuestionText((e.target as HTMLInputElement).value);
  };

  const updateToggler = () => {
    setIsAnonymous(prevState => !prevState);
  };

  const submitQuestionHandler = async () => {
    setLoading(true);
    try {
      await askQuestion({ receiverId: userId, isAnonymous: isAnonymous, body: questionText });
      setQuestionText('');
      toast('Question asked', { type: 'success' });
    } catch (e) {
      toast('Failed to send question', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="xl:flex flex-row-reverse  items-start my-4">
        <div className="flex flex-col justify-center"></div>
        <div className="flex flex-col justify-center flex-grow px-4">
          <UserHeader stats={statsData} isStatsLoading={isStatsLoading} />
          {isStatsLoading ? null : (
            <AskQuestionContainer
              questionText={questionText}
              isAnonymous={isAnonymous}
              loading={loading}
              typeQuestionHandler={typeQuestionHandler}
              updateTogglerHandler={updateToggler}
              submitQuestionHandler={submitQuestionHandler}
            />
          )}

          <UserFollowDetailsTabs userId={userId} />
        </div>
      </div>
    </>
  );
};

export default Layout;
