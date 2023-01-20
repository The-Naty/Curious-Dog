import React from 'react';

interface Props {
  checkedState: boolean;
  updateStateHandler: () => void;
}
const Toggler = ({ checkedState, updateStateHandler }: Props) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checkedState} className="sr-only peer" onChange={updateStateHandler} />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">display questions you asked</span>
    </label>
  );
};

export default Toggler;
