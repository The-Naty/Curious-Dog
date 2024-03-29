import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';

interface Props {
  answer?: string;
  questionId: number;
  showForm: boolean;
  replyText: string;
  loading: boolean;
  reciverId: number;
  showFormHandler: () => void;
  typeAnswerHandler: (e: React.ChangeEvent<EventTarget>) => void;
  submitAnswerHandler: (e: React.MouseEvent<EventTarget>) => void;
}

const QuestionCardAnswerContainer = ({
  answer,
  questionId,
  reciverId,
  showForm,
  replyText,
  loading,
  showFormHandler,
  typeAnswerHandler,
  submitAnswerHandler,
}: Props) => {
  const disableSubmit = answer ? replyText.length === answer?.length : !replyText.length;
  const [user, setUser] = useAtom(userAtom);

  return (
    <>
      {answer ? (
        <>
          <p className="flex justify-center	border-t border-b border-indigo-500 text-black"> answer </p>
          <p className="my-3 break-all text-black">{answer}</p>
        </>
      ) : null}
      {reciverId === user?.id ? (
        <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded text-xs"
            onClick={showFormHandler}
          >
            {answer ? 'edit' : 'reply'}
          </button>
        </div>
      ) : null}

      {showForm ? (
        <>
          <div className="mt-3 w-full">
            <div className="mb-3">
              <textarea
                value={replyText}
                className="w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none bg-white	"
                id={`Reply text ${questionId}`}
                rows={4}
                placeholder="Your answer"
                onChange={typeAnswerHandler}
              />
            </div>
            <button
              className={`bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs w-full ${
                loading ? '' : 'disabled:opacity-25'
              }`}
              onClick={submitAnswerHandler}
              disabled={disableSubmit || loading}
            >
              {loading ? <LoadingSpinner /> : answer ? 'Update your reply' : 'Submit your reply'}
            </button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default QuestionCardAnswerContainer;
