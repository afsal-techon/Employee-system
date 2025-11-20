import React, { useState } from "react";
import Logo from "../assets/logo.jpg";
import { BsFileBarGraph } from "react-icons/bs";
import { LuShoppingCart } from "react-icons/lu";
import { CiBoxes, CiBag1, CiHome } from "react-icons/ci";
import { MdOutlineAccountBalance } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
 <div className="w-64 bg-white h-screen shadow-lg overflow-y-auto">
      <div className="w-full py-3">
        <img className="w-20 h-20 mx-auto" src={Logo} alt="Logo" />

        <div className="flex flex-col px-4 my-4 space-y-2">
          {sidebarMenu.map((item) => (
            <div key={item.label}>
              {/* Parent menu */}
              <div
                onClick={() =>
                  item.subMenu ? toggleMenu(item.label) : navigate(item.path)
                }
                className="flex gap-3 py-3 items-center cursor-pointer px-4 hover:bg-blue-50 rounded-xl"
              >
                <item.icon className="text-blue-600" size={26} />
                <p className="font-semibold text-md">{item.label}</p>

                {item.subMenu && (
                  <IoIosArrowForward
                    className={`ml-auto transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-90" : ""
                    }`}
                    size={20}
                  />
                )}
              </div>

              {/* Submenu */}
              {item.subMenu && (
                <div
                  className={`overflow-hidden transition-all duration-300 ml-10 ${
                    openMenu === item.label
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mt-1 flex flex-col space-y-1 text-gray-700">
                    {item.subMenu.map((sub) => (
                      <p
                        key={sub.label}
                        onClick={() => navigate(sub.path)}
                        className="cursor-pointer py-2 px-3 hover:bg-blue-50 rounded-lg"
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
  );
};

export default Sidebar;
