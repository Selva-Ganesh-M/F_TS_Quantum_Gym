import React from "react";

type Props = {
  content: string;
};

const FilledBtn = ({ content }: Props) => {
  return (
    <button className="bg-pink-900 p-3 px-10 text-white rounded-lg font-bold">
      {content}
    </button>
  );
};

export default FilledBtn;
