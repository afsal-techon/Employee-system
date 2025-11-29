import React from 'react';
import { MdClose } from 'react-icons/md';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = "md",
  closeOnOverlayClick = true
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-50
                 bg-black/40 animate-overlay-fade"
      onClick={handleOverlayClick}
    >
      <div
        className={
          `bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]}
           max-h-[80vh] flex flex-col
           animate-modal-soft`
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdClose size={20} className="text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
