import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";

export const AdminDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-white hover:text-gray-200 font-medium transition-colors"
      >
        Admin
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
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
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">
            <Link
              to="/teams"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Teams
            </Link>
            <Link
              to="/stages"
              className="block px-4 py-2 text-sm text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Stages
            </Link>
            <div
              className="px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Users
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
