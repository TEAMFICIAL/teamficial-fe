import React from 'react';

type Props = {
  title: string;
  placeholder?: string;
};

const TextInput = ({ title, placeholder = 'Ex. 카카오톡 오픈채팅 링크' }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="title-3">{title}</p>
      <input
        className="body-6 rounded-md border-1 border-gray-300 p-2 px-7 py-3 focus:border-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
