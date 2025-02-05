import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  // hooks
  const navigate = useNavigate();

  // effects
  useEffect(() => {
    const isUserPresent = localStorage.getItem("user");
    if (!isUserPresent) {
      navigate("/sign-in");
    }
  }, []);

  return <div>Dashboard Page</div>;
};

export default DashboardPage;
