import Link from 'next/link';
import React from 'react';

interface headerItemProps {
  IconComp: React.ReactNode;
  text: string;
  active?: boolean;
  url: string;
}

const listItemStyle = 'mt-2 px-3 mx-1 text-basis hover:cursor-pointer';

const HeaderItem = ({ IconComp, text, active, url }: headerItemProps) => {
  return (
    <li className={`${listItemStyle} ${active ? 'border-b-4 border-indigo-400 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
      <Link href={url} className="flex flex-col items-center">
        {IconComp}
        <span>{text}</span>
      </Link>
    </li>
  );
};

export default HeaderItem;
