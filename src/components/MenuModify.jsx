import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

//submenu modificar evento
export const MenuModify = () => {
  return (
    <div>
        <FaPen className='text-white hover:text-[#5ea3d4]' />
        <FaRegTrashAlt className='text-white hover:text-[#5ea3d4]' />
    </div>
  )
}
