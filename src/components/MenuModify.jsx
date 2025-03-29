import React from 'react';
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

//submenu modificar evento
export const MenuModify = ({ onEdit, onDelete }) => {
  return (
    <div className="flex justify-center space-x-4 bg-gray-800 p-2 rounded">
      <FaPen className='text-green-500 hover:text-[#5ea3d4] cursor-pointer' onClick={onEdit} />
      <FaRegTrashAlt className='text-red-500 hover:text-[#5ea3d4] cursor-pointer' onClick={onDelete} />
    </div>
  );
};
