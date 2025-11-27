import React, { useState, useEffect } from 'react'
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

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 mt-6 lg:mt-8 shadow-sm border border-gray-200">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="w-full lg:w-auto">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Horizontal scroll wrapper */}
        <div className="w-full overflow-x-auto">
          {/* Table with fixed layout */}
          <table className="min-w-full w-full text-left">
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
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-200 last:border-b-0">
                    {columns.map((col) => (
                      <td 
                        key={col.key} 
                        className="p-3 text-sm whitespace-nowrap"
                        title={typeof row[col.key] === 'string' ? row[col.key] : ''}
                      >
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={columns.length} 
                    className="p-8 text-center text-gray-500 text-sm"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer - Only show if there's data */}
      {paginatedData.length > 0 && (
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 px-2 mt-4'>
          <ItemsPerPage 
            value={itemsPerPage} 
            onChange={(value) => {
              setItemsPerPage(value);
              setPage(1);
            }}
          />
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Table;