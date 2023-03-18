import React from "react";
import { useNavigate } from "react-router-dom";
import { EButtonType } from "./FilledBtn";
import { twMerge } from 'tailwind-merge'

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
  sx?: string
};

const OutlineBtn = ({ sx, content, border, type, onClick, className, p, px, py, fz, rounded, width, h, to }: Props) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (!to) {
      return;
    }
    return navigate(`${to}`);
  };
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
      ${border || "border-[1px] border-black"}
      hover:bg-black hover:text-white p-3 px-10 text-pink-900 font-bold rounded-lg 
      ${sx && sx}
      `}
      type={type ? type : "button"}
      onClick={onClick ? onClick : handleClick}
    >
      {content}
    </button >
  );
};

export default OutlineBtn;
