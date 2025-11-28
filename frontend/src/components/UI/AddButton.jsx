import React from 'react'

const AddButton = ({logo,btnHeading, onClick}) => {
  return (
    <div className=' flex justify-center items-center'>
        <div>
          <button onClick = {onClick} className='bg-blue-600 ml-2 rounded-md p-4 cursor-pointer hover:bg-blue-700'>
         <span className='text-white'>{logo}</span>   
        </button>

      <p className='text-end text-sm font-semibold text-blue-600'>{btnHeading}</p> 
        </div>
    </div>
  )
}

export default AddButton