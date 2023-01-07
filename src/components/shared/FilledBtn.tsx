import React from "react";
import { useNavigate } from "react-router-dom";

export enum EButtonType {
  submit = "submit",
  button = "button",
  reset = "reset",
}

type Props = {
  content: string;
  to?: string;
  type?: EButtonType;
};

const FilledBtn = ({ content, to, type }: Props) => {
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
      className="bg-pink-900  hover:shadow-[0px_0px_10px_3px_rgba(0,0,0,0.2)] hover:border-1  p-3 px-10 text-white rounded-lg font-bold"
      type={type ? type : "button"}
    >
      {content}
    </button>
  );
};

export default FilledBtn;
