import React, { Dispatch, SetStateAction, useState } from 'react';
import Toggler from './Toggler';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  questionText: string;
  isAnonymous: boolean;
  loading: boolean;
  typeQuestionHandler: (e: React.ChangeEvent<EventTarget>) => void;
  updateTogglerHandler: () => void;
  submitQuestionHandler: () => void;
}

const AskQuestionContainer = ({ questionText, isAnonymous, loading, typeQuestionHandler, updateTogglerHandler, submitQuestionHandler }: Props) => {
  return (
    <div className="flex justify-center my-4 w-full flex-grow">
      <div className="flex flex-col  md:max-w-xl rounded-lg bg-white shadow-lg w-full">
        <div className="p-6 flex flex-col justify-start ">
          <p className="text-gray-700 text-base my-4 text-center">would you like to ask something ...</p>
          <textarea
            value={questionText}
            className="w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none bg-white"
            rows={4}
            placeholder="Your question"
            onChange={typeQuestionHandler}
            disabled={loading}
          />
        </div>
        <div className="flex justify-end mt-2 mx-2">
          <Toggler
            checkedState={isAnonymous}
            updateStateHandler={updateTogglerHandler}
            togglerText={'Anonymously asking'}
            disabled={questionText.length < 1 || loading}
          />
        </div>
        <div className="my-2 mx-2">
          <button
            className={`bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs w-full ${
              loading ? '' : 'disabled:opacity-25'
            }`}
            onClick={submitQuestionHandler}
            disabled={questionText.length < 1 || loading}
          >
            {loading ? <LoadingSpinner /> : 'ask question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionContainer;
