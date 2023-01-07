import React from "react";
import { EButtonType } from "./FilledBtn";

type Props = {
  content: string;
  type?: EButtonType;
};

const OutlineBtn = ({ content, type }: Props) => {
  return (
    <button
      className=" hover:bg-black hover:text-white p-3 px-10 text-pink-900 border-2 font-bold rounded-lg"
      type={type ? type : "button"}
    >
      {content}
    </button>
  );
};

export default OutlineBtn;
