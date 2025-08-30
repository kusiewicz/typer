export const AdminDropdown = () => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-white hover:text-gray-200 font-medium transition-colors">
        Admin
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <div className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer transition-colors">
            Users
          </div>
        </div>
      </div>
    </div>
  );
};
