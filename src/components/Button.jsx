import React from 'react';
import { CiCirclePlus } from "react-icons/ci";

export const Button = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="mt-4 transition-transform transform hover:scale-105 hover:text-blue-600"
    >
      <CiCirclePlus className='text-5xl cursor-pointer text-blue-500' />
    </button>
  );
};