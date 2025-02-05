import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <div className="fixed w-full h-14 border-b bg-white/30 backdrop-blur-lg">
      <div className="container mx-auto h-full flex items-center px-3 justify-between">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-7" />
        </Link>

        {/* Navbar Actions */}
        <Link to="/sign-in">
          <Button>Sign In</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
