import { Outlet } from "@tanstack/react-router";
import { Navbar } from "~/widgets/navbar";

export const MainLayout = () => (
  <>
    <Navbar />
    <div className="flex flex-col items-center justify-center p-4">
      <Outlet />
    </div>
  </>
);
