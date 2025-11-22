import React from 'react'

const Pagination = ({page, totalPages, onPageChange}) => {
  return (
    <div className='flex items-center gap-3 text-sm mt-4'>

        <button
        className="px-3 py-1 border rounded-xl border-gray-400 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

       <span className="px-4 py-1 border border-gray-400 rounded-xl bg-gray-100">
        {page} / {totalPages}
      </span>

       <button
        className="px-3 py-1 border rounded-xl border-gray-400 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination