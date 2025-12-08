import React from "react";

const FormButtons = ({
  isSubmitting = false,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  submitDisabled = false,
}) => {
  return (
    <div className="flex justify-end pt-4 gap-2">
      <button
        type="button"
        onClick={onCancel}
         disabled={isSubmitting}
        className="px-6 py-2 bg-[#ff5656] cursor-pointer text-gray-700 border border-gray-300 rounded-lg hover:bg-[#ff3d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cancelText}
      </button>

      <button
        type="submit"
         disabled={isSubmitting || submitDisabled} 
        className="common-button px-6 py-2 cursor-pointer"
      >
        {isSubmitting ? <div className="loader"></div> : submitText}
      </button>
    </div>
  );
};

export default FormButtons;
