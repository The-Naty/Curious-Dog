import React, { useState, useEffect } from 'react';
import { Question } from '../../lib/interfaces/question.interface';
import { User } from '../../lib/interfaces/user.interface';

interface Props {
  question: Question & { asker: User | null };
}

const QuestionCard = ({ question }: Props) => {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);

  const submitAnswerHandler = () => {};

  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-col  md:max-w-xl rounded-lg bg-white shadow-lg w-full border-solid border-l-2 border-indigo-400">
        <div className="p-6 flex flex-col justify-start ">
          {question.asker ? (
            <div className="flex  justify-between mb-3">
              <div className="flex items-center">
                <div className="rounded-full border-solid border-2 border-indigo-600">
                  <img
                    className="rounded-full"
                    src={`${question.asker.profilePicture ? question.asker.profilePicture : '/static/placeholder.jpeg'}`}
                    style={{ objectFit: 'contain' }}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col ml-2 justify-end h-full">
                  <p>{question.asker.username}</p>
                  <span className="text-xs"> was curious about ..</span>
                </div>
              </div>
              <div className="flex flex-col">
                {question.askerId === question.receiverId ? (
                  <div>
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-200 text-gray-700 rounded-full">
                      Asked by you
                    </span>
                  </div>
                ) : null}
                {question.answer ? (
                  <div>
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-200 text-gray-700 rounded-full">
                      Answered
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-200 text-gray-700 rounded-full">
                      Unaswered
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="rounded-full border-solid border-2 border-indigo-600">
                <img
                  className="rounded-full"
                  src={'/static/curious_dog_temp.jpg'}
                  style={{ objectFit: 'contain' }}
                  width={100}
                  height={100}
                  alt="ananomys temp"
                />
              </div>
              <div className="flex flex-col ml-2 mb-4 justify-end h-full text-xs">was ananomusly asking ..</div>
            </div>
          )}
          <p className="text-gray-700 text-base my-4">{question.body}</p>

          {question.answer ? (
            <>
              <p className="flex justify-center	border-t border-b border-indigo-500"> answer </p>
              <p className="mt-3">{question.answer}</p>
            </>
          ) : (
            <div className="flex justify-end">
              <button
                className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded text-xs"
                onClick={() => setShowReplyForm(prevValue => !prevValue)}
              >
                Reply
              </button>
            </div>
          )}
          {showReplyForm ? (
            <>
              <div className="mt-3 w-full">
                <div className="mb-3">
                  <textarea
                    className="w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
                    id={`Reply text ${question.id}`}
                    rows={3}
                    placeholder="Your answer"
                  ></textarea>
                </div>
                <button
                  className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded text-xs w-full"
                  onClick={submitAnswerHandler}
                >
                  Submit your answer
                </button>
              </div>
            </>
          ) : null}
        </div>
        <hr className="w-full" />
        <div className="p-3">
          <p className="text-gray-600 text-xs my-2">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
