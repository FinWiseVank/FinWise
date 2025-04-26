import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] lg:w-[50%] max-h-[90%] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold cursor-pointer"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
