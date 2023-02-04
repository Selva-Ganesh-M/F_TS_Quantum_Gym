import React from "react";
import { EButtonType } from "./FilledBtn";

type Props = {
  content: string | React.ReactNode;
  type?: EButtonType;
  onClick?: () => void;
  className?: string
};

const OutlineBtn = ({ content, type, onClick, className }: Props) => {
  return (
    <button
      className={`${className} hover:bg-black hover:text-white p-3 px-10 text-pink-900 border-2 font-bold rounded-lg`}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {content}
    </button >
  );
};

export default OutlineBtn;
