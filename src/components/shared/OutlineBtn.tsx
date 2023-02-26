import React from "react";
import { EButtonType } from "./FilledBtn";

type Props = {
  content: string | React.ReactNode;
  type?: EButtonType;
  onClick?: () => void;
  className?: string;
  to?: string;
  fz?: string;
  rounded?: string;
  px?: string;
  py?: string;
  p?: string;
  width?: string;
  h?: string;
  border?: string;
};

const OutlineBtn = ({ content, border, type, onClick, className, p, px, py, fz, rounded, width, h }: Props) => {
  return (
    <button
      className={`
      ${className} 
      ${p ? p : "p-3"}
      ${px ? px : "px-10"}
      ${rounded ? rounded : "rounded-lg"}
      ${fz ? fz : ""}
      ${h ? h : ""}
      ${width ? width : "w-auto"}
      ${border || "border-2 border-pink-200"}
      hover:bg-black hover:text-white p-3 px-10 text-pink-900 font-bold rounded-lg `}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {content}
    </button >
  );
};

export default OutlineBtn;
