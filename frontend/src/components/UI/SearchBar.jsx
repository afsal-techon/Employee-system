import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="border rounded-lg px-3 py-2 flex items-center gap-2 w-full max-w-xs bg-white">
      <IoSearch size={20} className="text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none"
      />
    </div>
  );
};

export default SearchBar;
