import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import { BsFileBarGraph } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { CiBoxes, CiBag1, CiHome } from "react-icons/ci";
import { MdOutlineAccountBalance, MdClose } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarMenu = [
  {
    label: "Dashboard",
    icon: CiHome,
    path: "/",
  },
  {
    label: "Branch",
    icon: BsFileBarGraph,
    path: "/branch",
  },
  {
    label: "Employee",
    icon: LuShoppingCart,
    subMenu: [
      { label: "Department", path: "/department" },
      { label: "Position", path: "/position" },
      { label: "Employees", path: "/employees" },
    ],
  },
  {
    label: "Products",
    icon: CiBoxes,
    subMenu: [
      { label: "Category", path: "/category" },
      { label: "Unit", path: "/unit" },
      { label: "Product", path: "/product" },
    ],
  },
  {
    label: "Project",
    icon: CiBag1,
    path: "/project",
  },
  {
    label: "Accounts",
    icon: MdOutlineAccountBalance,
    path: "/accounts",
  },
  {
    label: "Report",
    icon: HiOutlineDocumentReport,
    path: "/report",
  },
];

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile && !isCollapsed) {
        onToggleCollapse();
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      onToggleCollapse();
    }
  }, [location.pathname, isMobile]);

  const toggleMenu = (menu) => {
    if (!isCollapsed) {
      setOpenMenu(openMenu === menu ? null : menu);
    }
  };

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path);
      if (isMobile) {
        onToggleCollapse();
      }
    } else if (item.subMenu && !isCollapsed) {
      toggleMenu(item.label);
    }
  };

  const handleCloseSidebar = () => {
    onToggleCollapse();
  };

  return (
    <>
      {/* Overlay for mobile - Only show when sidebar is open on mobile */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative 
          bg-white h-screen shadow-lg overflow-y-auto 
          transition-all duration-300 z-50
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobile ? 'rounded-r-2xl' : ''}
          ${isMobile && !isCollapsed ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="w-full py-3">
          {/* Logo and Close Button for Mobile */}
          <div className="flex items-center justify-between px-4 relative">
            <div className="flex items-center justify-center flex-1">
              {isCollapsed ? (
                <img className="w-10 h-10" src={Logo} alt="Logo" />
              ) : (
                <img className="w-20 h-20" src={Logo} alt="Logo" />
              )}
            </div>
            
            {/* Close Button - Only show on mobile when sidebar is open */}
            {isMobile && !isCollapsed && (
              <button
                onClick={handleCloseSidebar}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MdClose size={24} className="text-blue-600" />
              </button>
            )}
          </div>

          <div className="flex flex-col px-4 my-4 space-y-2">
            {sidebarMenu.map((item) => (
              <div key={item.label}>
                {/* Parent menu */}
                <div
                  onClick={() => handleItemClick(item)}
                  className={`
                    flex gap-3 py-3 items-center cursor-pointer 
                    hover:bg-blue-50 rounded-xl transition-colors
                    ${isCollapsed ? 'justify-center px-2' : 'px-4'}
                    ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''}
                  `}
                  title={isCollapsed ? item.label : ''}
                >
                  <item.icon 
                    className={`flex-shrink-0 ${
                      location.pathname === item.path ? 'text-blue-600' : 'text-blue-600'
                    }`} 
                    size={isCollapsed ? 24 : 26} 
                  />
                  
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold text-md whitespace-nowrap">
                        {item.label}
                      </p>
                    </>
                  )}
                </div>

                {/* Submenu - Only show when not collapsed */}
                {!isCollapsed && item.subMenu && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ml-6 ${
                      openMenu === item.label
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="mt-1 flex flex-col space-y-1 text-gray-700">
                      {item.subMenu.map((sub) => (
                        <p
                          key={sub.label}
                          onClick={() => {
                            navigate(sub.path);
                            if (isMobile) onToggleCollapse();
                          }}
                          className={`cursor-pointer py-2 px-3 hover:bg-blue-50 rounded-lg text-sm ${
                            location.pathname === sub.path ? 'bg-blue-50 text-blue-600 font-medium' : ''
                          }`}
                        >
                          {sub.label}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;