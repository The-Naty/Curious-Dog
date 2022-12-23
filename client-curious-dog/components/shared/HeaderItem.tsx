import React from 'react';

interface headerItemProps {
  IconComp: React.ReactNode;
  text: string;
  active?: boolean;
}

const listItemStyle = 'mt-2 px-3 mx-1 text-basis hover:cursor-pointer';

const HeaderItem = ({ IconComp, text, active }: headerItemProps) => {
  return (
    <li className={`${listItemStyle} ${active ? 'border-b-4 border-indigo-400 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
      <div className="flex flex-col items-center">
        {IconComp}
        <span>{text}</span>
      </div>
    </li>
  );
};

export default HeaderItem;
