import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";

const EditDeleteIcon = ({ onEdit , onDelete  }) => {
  return (
    <div className='flex gap-4 items-center text-gray-500'>
        <button className='cursor-pointer hover:text-red-700 transition'>
            <FaEdit onClick={onEdit} size={16}/>
        </button>

   <button className='cursor-pointer hover:text-red-700 transition'>
            <FaTrash onClick={onDelete} size={16}/>
        </button>

    </div>
  )
}

export default EditDeleteIcon