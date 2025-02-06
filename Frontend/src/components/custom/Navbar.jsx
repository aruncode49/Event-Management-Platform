import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const Navbar = () => {
  // hooks
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // vars
  const isAuthPage =
    pathname.includes("sign-in") || pathname.includes("sign-up");
  const isUserPresent = localStorage.getItem("user");

  // actions
  const onLogout = () => {
    localStorage.removeItem("user");
    toast.success("User logout successfully");
    navigate("/");
  };

  return (
    <div className="fixed w-full h-14 border-b bg-white/30 backdrop-blur-lg">
      <div className="container mx-auto h-full flex items-center px-3 justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-8 sm:h-9" />
        </Link>

        {/* Sign In */}
        {!isAuthPage && !isUserPresent && (
          <Link to="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}

        {/* Sign Out */}
        {!isAuthPage && isUserPresent && (
          <div className="flex items-center gap-2 md:gap-3">
            <Button onClick={() => navigate("/create-event")}>
              Create Event
            </Button>
            <Button title="Logout" onClick={onLogout} variant="secondary">
              <LogOut />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
