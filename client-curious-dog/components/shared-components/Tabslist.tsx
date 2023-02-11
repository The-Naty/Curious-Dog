import React from 'react';

interface Props {
  tabs: string[];
  selected: number;
  onTabUpdated: (tab: number) => void;
}
const Tabslist = ({ tabs, selected = 0, onTabUpdated }: Props) => {
  return (
    <div className="flex justify-around p-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-rounded overflow-x-auto border-b-2 border-indigo-300">
      {tabs.map((tab: string, index: number) => {
        return (
          <button
            key={index}
            className={`${
              selected === index ? 'bg-indigo-400 text-white border-indigo-50' : ''
            } m-2 bg-transparent enabled:hover:bg-indigo-500 text-indigo-700 font-semibold enabled:hover:text-white py-2 px-4 border border-indigo-500 enabled:hover:border-transparent rounded text-xs`}
            onClick={() => onTabUpdated(index)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
};

export default Tabslist;
