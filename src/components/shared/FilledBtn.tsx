import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  content: string;
  to?: string;
};

const FilledBtn = ({ content, to }: Props) => {
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
      className="bg-pink-900 p-3 px-10 text-white rounded-lg font-bold"
    >
      {content}
    </button>
  );
};

export default FilledBtn;
