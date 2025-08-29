import { AdminDropdown } from "./AdminDropdown";
import { LogoutButton } from "./LogoutButton";

export const Navbar = () => {
  return (
    <nav className="bg-slate-900 border-gray-200 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-white bg-gray-800 px-3 py-1 rounded">
            Typer
          </span>
        </div>

        <div className="flex items-center gap-6">
          <AdminDropdown />
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
};
