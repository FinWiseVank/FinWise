import { MdOutlineNightlightRound } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import React from 'react'


export const ModeNigth = () => {
  return (
    <div>
        <div className="flex justify-end gap-2">
            <MdOutlineNightlightRound />
        </div>
        <div className="flex justify-end gap-2">
            <MdLightMode />
        </div>
    </div>
  )
}
