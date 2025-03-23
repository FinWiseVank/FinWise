import React from 'react';
import { FaBox } from "react-icons/fa";

export const Box = ({ children }) => {
  return (
    <div className="box p-4 border rounded shadow-md bg-gray-100">
      {children ? (
        <div className="content">
          {children}
        </div>
      ) : (
        <FaBox className='text-5xl text-blue-500 size-25' />
      )}
    </div>
  );
};
