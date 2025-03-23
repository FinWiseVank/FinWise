import React from 'react'// rface

export const Card = ({ children }) => {
  return (
    <div className="bg-[#ffffff] rounded-lg mt-8 p-4 shadow-md">
      {children}
    </div>
  );
};
