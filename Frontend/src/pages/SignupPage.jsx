import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignupPage = () => {
  // state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // hooks
  const navigate = useNavigate();

  // actions
  const onRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password and confirm password is not same!");
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/register", {
        username,
        password,
      });
      if (response?.data) {
        toast.success(response.data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
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
      <h1 className="text-3xl text-neutral-800 font-medium">Create Account</h1>
      <form onSubmit={onRegister} className="space-y-4 mt-5">
        <Input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <Input
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          type="password"
        />
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? <Loader className="animate-spin" /> : "Sign Up"}
        </Button>
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
