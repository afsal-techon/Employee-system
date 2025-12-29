import React, { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import AOS from "aos";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = "md",
  closeOnOverlayClick = true
}) => {
    useEffect(() => {
    AOS.refresh();
  }, []);
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

  // Re-run AOS when modal appears


  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center backdrop-blur-xs justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div
        data-aos="fade-down"
        data-aos-duration="400"
        data-aos-easing="ease-out"
        className={`bg-white rounded-xl shadow-lg w-full ${sizeClasses[size]} transition-all`}
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
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
