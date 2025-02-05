import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SigninPage = () => {
  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  // actions
  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setUserLoading(true);
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      if (response?.data) {
        toast.success(response.data.message);
        // save user details in local storage
        const user = {
          token: response?.data?.data?.access_token,
          role: response?.data?.data?.role,
        };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setUsername("");
      setPassword("");
      setUserLoading(false);
    }
  };

  const onGuestLogin = async () => {
    try {
      setGuestLoading(true);
      const response = await axios.get("/api/auth/guest-login");
      if (response?.data) {
        toast.success(response.data.message);
        // save guest details in local storage
        const guest = {
          token: response?.data?.data?.access_token,
          role: response?.data?.data?.role,
        };
        localStorage.setItem("user", JSON.stringify(guest));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setGuestLoading(false);
    }
  };

  useEffect(() => {
    const isUserPresent = localStorage.getItem("user");
    if (isUserPresent) {
      navigate("/");
    }
  }, []);

  return (
    <div className="mt-20 md:mt-16 px-1 md:px-0 md:max-w-[350px] mx-auto">
      <h1 className="text-3xl text-neutral-800 font-medium">Login</h1>
      <form onSubmit={onLogin} className="space-y-4 mt-5">
        <Input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={userLoading || guestLoading}
          type="submit"
          className="w-full"
        >
          {userLoading ? <Loader className="animate-spin" /> : "Sign In"}
        </Button>
      </form>

      <Button
        onClick={onGuestLogin}
        disabled={userLoading || guestLoading}
        variant="secondary"
        className="w-full mt-4"
      >
        {guestLoading ? <Loader className="animate-spin" /> : "Login as Guest"}
      </Button>
      <p className="text-sm mt-3">
        Don't have an account?{" "}
        <Link to="/sign-up" className="text-blue-500 hover:underline">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default SigninPage;
