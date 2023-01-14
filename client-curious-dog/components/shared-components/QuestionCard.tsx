import React, { useState, useMemo } from 'react';
import { answerQuestion } from '../../lib/api/questions.api';
import { Question } from '../../lib/interfaces/question.interface';
import { QuestionWithAsker } from '../../lib/types/question-with-user.type';
import { computeUpdateAt } from '../../util/utilities';
import QuestionCardAnswerContainer from './QuestionCardAnswerContainer';
import QuestionCardHeader from './QuestionCardHeader';

interface Props {
  question: QuestionWithAsker;
  onQuestionAnswered: (question: Question) => void;
}

const QuestionCard = ({ question, onQuestionAnswered }: Props) => {
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
          <QuestionCardHeader question={question} />
          <p className="text-gray-700 text-base my-4">{question.body}</p>
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
          <div className="py-3">
            <p className="text-gray-600 text-xs my-2">Last updated {updatedAdd}</p>
          </div>
        </div>
        <hr className="w-full" />
      </div>
    </div>
  );
};

export default QuestionCard;
