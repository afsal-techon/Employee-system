
const ItemsPerPage = ({ value, onChange }) => {
  console.log(value,'value')
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="border border-gray-400 rounded-md px-3 py-1.5 text-sm bg-white shadow-sm"
    >
      {[5, 10, 20, 50].map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  );
};

export default ItemsPerPage;

