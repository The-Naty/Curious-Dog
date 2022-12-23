import React from "react";

const HeaderItem = ({ IconComp, text, active }) => {
  return (
    <li
      className={`${listItemStyle} ${
        active
          ? "border-b-4 border-indigo-400 text-slate-900"
          : "text-slate-500"
      }`}
    >
      <div className="flex flex-col items-center">
        {IconComp}
        <span>{text}</span>
      </div>
    </li>
  );
};

export default HeaderItem;

const listItemStyle = "mt-2 px-3 mx-1 text-basis 	hover:text-slate-700	  ";
