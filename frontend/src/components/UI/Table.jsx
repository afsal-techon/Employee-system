import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Pagination from './Pagination'
import ItemsPerPage from './ItemsPerPage';

const Table = ({ title, columns = [], data = [] }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="w-full bg-white rounded-xl p-4 mt-8 shadow-sm overflow-x-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
 {/* Scrollable Table Wrapper */}
<div className="w-full overflow-x-auto">

  {/* Vertical scroll */}
  <div className="max-h-[500px] overflow-y-auto">
    <table className="min-w-max w-full text-left">
      <thead className="sticky top-0 bg-white z-10">
        <tr className="border-b border-gray-300">
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-3 font-semibold text-gray-400 text-sm whitespace-nowrap"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {paginatedData.map((row, index) => (
          <tr key={index} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="p-3 text-sm whitespace-nowrap">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>


      <div className='flex justify-between items-center px-2 mt-4'>
        <ItemsPerPage value={itemsPerPage} onChange={setItemsPerPage}/>
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage}/>
      </div>

 
    </div>
  );
};

export default Table;