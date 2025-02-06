import Event from "@/components/custom/Events";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardPage = () => {
  // hooks
  const navigate = useNavigate();

  // states
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // actions
  const fetchAllEvents = async (user) => {
    try {
      setLoading(true);
      const response = await axios.get("/api/event/all-events", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.data) {
        setAllEvents(response.data.allEvents);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const onDeleteEvent = (id) => {
    const events = allEvents.filter((event) => event._id !== id);
    setAllEvents(events);
  };

  // effects
  useEffect(() => {
    const isUserPresent = localStorage.getItem("user");
    if (!isUserPresent) {
      return navigate("/sign-in");
    }
    fetchAllEvents(JSON.parse(isUserPresent));
  }, []);

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader className="animate-spin mr-2 " />
          <p>Loading Events...</p>
        </div>
      ) : allEvents && allEvents.length === 0 ? (
        <p className="mt-10 text-neutral-700 text-center">No Event Found</p>
      ) : (
        <div>
          <h1 className="mt-7 text-xl font-semibold text-center">All Events</h1>
          <Event allEvents={allEvents} onDeleteEvent={onDeleteEvent} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
