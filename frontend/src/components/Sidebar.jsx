import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.jpg";
import { BsFileBarGraph } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { CiBoxes, CiBag1, CiHome } from "react-icons/ci";
import { MdOutlineAccountBalance, MdClose, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
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

const Sidebar = ({ isCollapsed, onToggleCollapse, isMobile }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      onToggleCollapse();
    }
  }, [location.pathname, isMobile, isCollapsed, onToggleCollapse]);

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
    if (isMobile) {
      onToggleCollapse();
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isSubMenuActive = (subMenu) => {
    return subMenu?.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Overlay for mobile */}
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
          bg-white h-full shadow-lg overflow-y-auto 
          transition-all duration-300 z-50
          ${isCollapsed ? 'w-16' : 'w-64'}
          ${isMobile && !isCollapsed ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        <div className="w-full py-3">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-4 mb-6">
            <div className="flex items-center justify-center flex-1">
              {isCollapsed ? (
                <img className="w-10 h-10 rounded-full" src={Logo} alt="Logo" />
              ) : (
                <img className="w-20 h-20 rounded-full" src={Logo} alt="Logo" />
              )}
            </div>
            
            {/* Close Button - Only show on mobile when sidebar is open */}
            {isMobile && !isCollapsed && (
              <button
                onClick={handleCloseSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors absolute right-2"
              >
                <MdClose size={20} className="text-gray-600" />
              </button>
            )}
          </div>

          {/* Menu Items */}
          <div className="flex flex-col px-2 space-y-1">
            {sidebarMenu.map((item) => {
              const hasSubMenu = item.subMenu && item.subMenu.length > 0;
              const isItemActive = isActive(item.path) || (hasSubMenu && isSubMenuActive(item.subMenu));
              const IconComponent = item.icon;
              
              return (
                <div key={item.label}>
                  {/* Parent menu item */}
                  <div
                    onClick={() => handleItemClick(item)}
                    className={`
                      flex items-center cursor-pointer 
                      hover:bg-blue-50 rounded-lg transition-colors mx-2
                      ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-3'}
                      ${isItemActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                    `}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent 
                        className={`flex-shrink-0 ${
                          isItemActive ? 'text-blue-600' : 'text-gray-500'
                        }`} 
                        size={isCollapsed ? 20 : 18} 
                      />
                      
                      {!isCollapsed && (
                        <span className="font-medium text-sm whitespace-nowrap">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {/* Arrow for submenus */}
                    {!isCollapsed && hasSubMenu && (
                      <div>
                        {openMenu === item.label ? (
                          <MdKeyboardArrowUp size={16} className="text-gray-400" />
                        ) : (
                          <MdKeyboardArrowDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submenu */}
                  {!isCollapsed && hasSubMenu && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openMenu === item.label
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-6 mt-1 flex flex-col space-y-1">
                        {item.subMenu.map((sub) => (
                          <div
                            key={sub.path}
                            onClick={() => {
                              navigate(sub.path);
                              if (isMobile) onToggleCollapse();
                            }}
                            className={`
                              cursor-pointer py-2 px-3 rounded-lg text-sm transition-colors
                              ${isActive(sub.path) 
                                ? 'bg-blue-50 text-blue-600 font-medium' 
                                : 'text-gray-600 hover:bg-gray-100'
                              }
                            `}
                          >
                            {sub.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;