import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "sonner";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-14 px-3 h-[calc(100vh-56px)] container mx-auto">
        <Outlet />
      </div>
      <Toaster richColors />
    </>
  );
};

export default Layout;
