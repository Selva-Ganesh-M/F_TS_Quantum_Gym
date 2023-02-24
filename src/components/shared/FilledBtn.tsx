import React from "react";
import { useNavigate } from "react-router-dom";

export enum EButtonType {
  submit = "submit",
  button = "button",
  reset = "reset",
}

type Props = {
  content: any;
  to?: string;
  type?: EButtonType;
  fz?: string;
  rounded?: string;
  px?: string;
  py?: string;
  p?: string;
  width?: string;
};

const FilledBtn = ({ content, to, type, width, px, py, p, rounded, fz }: Props) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (!to) {
      return;
    }
    return navigate(`${to}`);
  };
  return (
    <button
      onClick={handleClick}
      className={`
      ${p ? p : "p-3"}
      ${px ? px : "px-10"}
      ${rounded ? rounded : "rounded-lg"}
      ${fz ? fz : ""}
      ${width ? width : "w-auto"}
      bg-pink-900  hover:shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:border-1 text-white font-bold`}
      type={type ? type : "button"}
    >
      {content}
    </button>
  );
};

export default FilledBtn;
