
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import ItemsPerPage from "./ItemsPerPage";

const Table = ({
  title,
  columns = [],
  data = [],
  isLoading,
  page,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  search,
  onSearchChange,
}) => {



  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 mt-4 lg:mt-8 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="w-full lg:w-auto">
          <SearchBar
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Single scroll container: both x and y */}
        <div className="w-full overflow-x-auto max-h-[500px]">
          <table className="min-w-full w-full">
            <thead className="sticky top-0 bg-white z-10 ">
              <tr className="border-b border-gray-300">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="p-3 font-semibold text-left text-gray-400 text-sm whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

                <tbody>
              {/* LOADER INSIDE TABLE */}
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center">
                    <span className="loader" />
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b border-gray-200">
                    {columns.map((col) => (
                      <td key={col.key} className="p-3 text-sm">
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer - Only show if there's data */}
        {!isLoading && data.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 mt-4">
          <ItemsPerPage
            value={itemsPerPage}
            onChange={(value) => {
              onItemsPerPageChange(value);
              onPageChange(1);
            }}
          />
          <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
};

export default Table;
