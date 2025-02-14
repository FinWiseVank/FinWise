import { MdOutlineNightlightRound } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import React from 'react'


export const ModeNigth = () => {
  return (
    <div>
        <div className="flex justify-end gap-2 text-white">
            <MdOutlineNightlightRound />
        </div>
        <div className="flex justify-end gap-2 text-white">
            <MdLightMode />
        </div>
    </div>
  )
}
