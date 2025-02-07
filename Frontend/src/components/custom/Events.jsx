import { FilePenLine, Loader, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "@/config/socket";
import { baseUrl } from "@/lib/baseUrl";

const Events = ({ allEvents }) => {
  // hooks
  const navigate = useNavigate();

  // vars
  const user = JSON.parse(localStorage.getItem("user"));

  // state
  const [events, setEvents] = useState(allEvents);
  const [joinEventLoading, setJoinEventLoading] = useState(false);

  // actions
  const _onDeleteEvent = async (id, userId) => {
    if (user.role == "guest") {
      return toast.error("Guest user can not delete any event.");
    }
    if (userId !== user.id) {
      return toast.error("Only admin can delete this event.");
    }

    const isConfirm = confirm("Are you absolutely sure?");
    if (!isConfirm) return;
    try {
      const response = await axios.delete(`${baseUrl}/event/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success(response.data.message);
      const _events = events.filter((event) => event._id !== id);
      setEvents(_events);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const onEditEvent = (id, userId) => {
    if (user.role == "guest") {
      return toast.error("Guest user can not edit any event.");
    }
    if (userId !== user.id) {
      return toast.error("Only admin can edit this event.");
    }
    navigate(`/create-event/${id}`);
  };

  const onJoinEvent = async (eventId) => {
    try {
      setJoinEventLoading(true);
      const response = await axios.post(
        `${baseUrl}/event/join-event/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      if (response.data) {
        toast.success(response.data);
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setJoinEventLoading(false);
    }
  };

  // Listen for real-time attendee updates
  useEffect(() => {
    // Join all event rooms on load
    events?.forEach((event) => {
      socket.emit("joinEventRoom", event._id);
    });

    socket.on("attendeesUpdated", ({ eventId, attendees }) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, attendees } : event
        )
      );
    });

    return () => {
      socket.off("attendeesUpdated");
    };
  }, [events]);
  return (
    <div className="mt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 md:max-w-screen-lg mx-auto">
      {events?.map((event) => (
        <div
          className="p-3 border rounded-lg relative bg-neutral-50"
          key={event._id}
        >
          <div className="w-full h-40 aspect-w-4 aspect-h-3 rounded-lg   overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={event.imageUrl}
              alt={event.name}
            />
            {/* Badge for attendee count */}
            <div className="absolute top-2 right-2 bg-white border px-2 py-1 rounded-full text-sm font-medium">
              {event.attendees.length} Attendees
            </div>
          </div>
          <h1 className="text-lg font-medium text-neutral-900 mt-2">
            {event.name}
          </h1>
          <p
            title={event.description}
            className="line-clamp-2 text-neutral-500 mt-1"
          >
            {event.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                title="Delete Event"
                onClick={() => _onDeleteEvent(event._id, event.createdBy)}
                className="shadow-none px-3 border-red-500 text-red-500 hover:text-red-600"
              >
                <Trash2 />
              </Button>
              <Button
                variant="outline"
                title="Edit Event"
                onClick={() => onEditEvent(event._id, event.createdBy)}
                className="shadow-none px-3 border-cyan-600 text-cyan-600 hover:text-cyan-700"
              >
                <FilePenLine />
              </Button>
            </div>

            <Button onClick={() => onJoinEvent(event._id)}>
              {joinEventLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Join Event"
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
