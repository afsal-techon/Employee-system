import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoMdSettings, IoIosNotifications  } from "react-icons/io";
import ProfilePopover from "./UI/ProfilePopover";
import { useNavigate } from "react-router-dom";
import Alert from "./UI/Alert";
import { useAuthStore } from "../Store/authStore";

const Navbar = ({ onToggleSidebar, isSidebarCollapsed, isMobile }) => {
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { user } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-16 bg-white flex items-center border-b border-gray-200 sticky top-0 z-30">
        <div className="w-full flex justify-between items-center px-4 md:px-6">
          {/* Menu Button - Always visible */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <MdMenu size={24} className="text-blue-600" />
          </button>

          {/* Right Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Icons */}
            <div className="flex gap-3 md:gap-4 items-center">
              <button 
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Settings"
              >
                <IoMdSettings 
                  size={20} 
                  className="text-blue-600 hover:text-blue-700" 
                />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Notifications"
              >
                <IoIosNotifications  
                  size={20} 
                  className="text-blue-600 hover:text-blue-700" 
                />
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-3 border-l pl-3 md:pl-4 border-gray-300">
              <div className="hidden sm:flex flex-col leading-tight text-right">
                <p className="text-blue-600 font-semibold text-sm md:text-base">
                  {user?.name}
                </p>
                <p className="text-gray-500 text-xs">{user?.role}</p>
              </div>

              <ProfilePopover openAlert={() => setIsAlertOpen(true)} />
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
  );
};

export default Navbar;