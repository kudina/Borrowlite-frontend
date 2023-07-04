import React from "react";
import { Link } from "react-router-dom";

export const InputSelect = ({
  pOnclick,
  cOnclick,
  cList,
  open,
  value,
  fValue,
  dValue,
  width,
}) => {
  return (
    <div
      className={`mt-4 relative lg:w-[${width}] w-full  md:mx-auto `}
    >
      <div
        className="w-full mt-2 p-3 border border-gray-300 rounded-[5px] h-[45px]   lg:h-[55px] focus:outline-none focus:border-gray-400 focus:ring-0 flex justify-between items-center "
        onClick={pOnclick}
      >
        <span>{dValue !== null ? dValue : fValue}</span>{" "}
        <img
          src="/assets/images/arrowDown.png"
          alt=""
          className={`h-[5px] w-[8px] ${open && "rotate-180"}`}
        />
      </div>
      <ul
        className={`my-[5px] border-[1px] border-[#D9D9D9] rounded-[2px] drop-shadow max-h-[9rem] overflow-y-auto scrollbar scrollbar-thumb-textGrey scrollbar-w-[6px] scrollbar-track-deepGrey scrollbar-thumb-rounded-[20px] scrollbar-track-rounded-[20px] absolute w-full z-[1] ${
          !open && "hidden "
        }`}
      >
        {cList.map((list) => (
          <li
            key={list.name}
            className={`w-full border-y-[1px] border-y-white p-[5px]  hover:bg-accent hover:text-white  ${
              value === list.value
                ? "bg-accent text-white"
                : "bg-white text-[#717579]"
            }`}
            onClick={() => {
              cOnclick(list);
            }}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const MenuSub = ({
  pOnclick,
  cOnclick,
  childList,
  img,
  name,
  openChild,
}) => {
  return (
    <>
      <div
        className="group flex items-center text-[0.8rem] pl-[25px] mt-2 hover:bg-accent p-1 hover:text-white"
        onClick={pOnclick}
      >
        {img}
        {name}
        <svg
          className="w-[10px] h-[10px] ml-2 fill-current group-hover:fill-white"
          viewBox="0 0 30 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.525 0L15 12.3617L26.475 0L30 3.80567L15 20L0 3.80567L3.525 0Z" />
        </svg>
      </div>

      <ul className={`flex flex-col ml-[30px] ${!openChild && "hidden"}`}>
        {childList.map((child) => {
          return (
            <Link
              key={child.name}
              to={child.link}
              onClick={cOnclick}
              className="text-textGrey  text-[12px] p-[5px] hover:text-white hover:bg-accent pl-[20px] rounded-[1px] mr-[10px]"
            >
              {" "}
              {child.name}
            </Link>
          );
        })}
      </ul>
    </>
  );
};
