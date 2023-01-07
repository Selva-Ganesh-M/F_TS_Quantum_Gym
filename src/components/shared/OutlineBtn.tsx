import React from "react";

type Props = {
  content: string;
};

const OutlineBtn = ({ content }: Props) => {
  return (
    <button className=" p-3 px-10 text-pink-900 border-2 font-bold rounded-lg">
      {content}
    </button>
  );
};

export default OutlineBtn;
