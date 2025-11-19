import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Alert from "./Alert";

function ProfilePopover({ openAlert }) {

  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        <RiAccountCircleFill
          size={32}
          className="text-blue-600 cursor-pointer"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2 z-50">
          <div className="flex flex-col text-gray-700 ">
            {/* Profile */}
            <button className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg hover:bg-blue-50">
              <CgProfile size={20} className="text-blue-600" />
              <span>Profile</span>
            </button>

            {/* Logout */}
            <button
              onClick={openAlert}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-blue-50"
            >
              <FiLogOut size={20} className="text-red-500" />
              <span>Logout</span>
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
export default ProfilePopover