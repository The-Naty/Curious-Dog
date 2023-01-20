import React, { useMemo, useState } from 'react';
import { Question } from '../../lib/interfaces/question.interface';
import { QuestionWithAskerAndReciver } from '../../lib/types/question-with-user.type';
import { computeUpdateAt } from '../../util/utilities';
import QuestionCardHeader from './QuestionCardHeader';
import RecieverHeader from './ReceiverHeader';
import { useAtom } from 'jotai';
import { userAtom } from '../../lib/atoms/user.atom';
import QuestionCardAnswerContainer from './QuestionCardAnswerContainer';
import { answerQuestion } from '../../lib/api/questions.api';

interface Props {
  question: QuestionWithAskerAndReciver;
  onQuestionAnswered: (question: Question) => void;
}
const GlobalQuestionCard = ({ question, onQuestionAnswered }: Props) => {
  const [user, setUser] = useAtom(userAtom);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>(question.answer || '');
  const [loading, setLoading] = useState<boolean>(false);

  const typeAnswerHandler = (e: React.ChangeEvent<EventTarget>) => {
    setReplyText((e.target as HTMLInputElement).value);
  };

  const showFormHandler = () => {
    setShowReplyForm(prevValue => !prevValue);
  };

  const submitAnswerHandler = async (e: React.MouseEvent<EventTarget>) => {
    setLoading(true);
    const answeredQuestion = await answerQuestion({ id: question.id, answer: replyText });
    onQuestionAnswered(answeredQuestion);
    setLoading(false);
    setShowReplyForm(false);
  };

  const updatedAdd = useMemo(() => computeUpdateAt(question.updatedAt), [question.updatedAt]);

  return (
    <div className="flex justify-center my-4">
      <div className="flex flex-col  md:max-w-xl rounded-lg bg-white shadow-lg w-full border-solid border-l-2 border-indigo-400">
        <div className="p-6 flex flex-col justify-start ">
          <RecieverHeader receiver={question.receiver} />
          <QuestionCardHeader question={question} />

          <p className="text-gray-700 text-base my-4">{question.body}</p>
          {question.receiverId === user?.id ? (
            <QuestionCardAnswerContainer
              answer={question.answer}
              questionId={question.id}
              showForm={showReplyForm}
              replyText={replyText}
              loading={loading}
              showFormHandler={showFormHandler}
              typeAnswerHandler={typeAnswerHandler}
              submitAnswerHandler={submitAnswerHandler}
            />
          ) : question.answer ? (
            <>
              <p className="flex justify-center	border-t border-b border-indigo-500"> answer </p>
              <p className="mt-3">{question.answer}</p>
            </>
          ) : null}

          <div className="py-3">
            <p className="text-gray-600 text-xs my-2">Last updated {updatedAdd}</p>
          </div>
        </div>
        <hr className="w-full" />
      </div>
    </div>
  );
};

export default GlobalQuestionCard;
