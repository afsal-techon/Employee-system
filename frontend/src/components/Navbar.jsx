import React, { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoNotifications } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import ProfilePopover from './UI/ProfilePopover';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Alert from './UI/Alert';
import { useAuthStore } from '../Store/authStore';



const Navbar = () => {


    const navigate = useNavigate()
    const [isAlertOpen, setIsAlertOpen] = useState(false);
   const { user } = useAuthStore()


    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login')
    }


  return (
     <>
    <div className=' w-full h-16 bg-white flex items-center'>
        <div className='w-full flex justify-between items-center px-4 md:px-6'>
           <MdMenu size={26} className="cursor-pointer text-blue-600" />

         {/* Right Section */}
         <div className='flex items-center gap-6'>

            <div className='flex gap-4 items-center'>
                <IoMdSettings size={22} className="cursor-pointer text-blue-600" />
            <IoNotifications size={22} className="cursor-pointer text-blue-600" />
            </div>

                 {/* Profile */}
            <div className='flex items-cente gap-3 border-l pl-4 border-gray-300'>
                 <div className="flex flex-col leading-tight">
                    <p className='text-blue-600 font-semibold text-sm md:text-base'>{user?.name}</p>
                    <p className='text-gray-500 text-xs'>{user?.role}</p>
                </div>
                 
                <ProfilePopover openAlert={()=>setIsAlertOpen(true)} />

            </div>

         </div>
        </div>
    </div>
          {/* Logout Alert */}
      <Alert
        isOpen={isAlertOpen}
        closeModal={() => setIsAlertOpen(false)}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onConfirm={handleLogout}
      />
    </>
  )
}

export default Navbar