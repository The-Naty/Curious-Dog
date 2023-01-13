import React from 'react';
import { QuestionWithAsker } from '../../lib/types/question-with-user.type';

interface Props {
  answer?: string;
  questionId: number;
  showForm: boolean;
  replyText: string;
  showFormHandler: () => void;
  typeAnswerHandler: (e: React.ChangeEvent<EventTarget>) => void;
}

const QuestionCardAnswerContainer = ({ answer, questionId, showForm, showFormHandler, replyText, typeAnswerHandler }: Props) => {
  return (
    <>
      {answer ? (
        <>
          <p className="flex justify-center	border-t border-b border-indigo-500"> answer </p>
          <p className="mt-3">{answer}</p>
        </>
      ) : (
        <div className="flex justify-end">
          <button
            className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded text-xs"
            onClick={showFormHandler}
          >
            Reply
          </button>
        </div>
      )}
      {showForm && !answer ? (
        <>
          <div className="mt-3 w-full">
            <div className="mb-3">
              <textarea
                value={replyText}
                className="w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                id={`Reply text ${questionId}`}
                rows={4}
                placeholder="Your answer"
                onChange={typeAnswerHandler}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default QuestionCardAnswerContainer;
