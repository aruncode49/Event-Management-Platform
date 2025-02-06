import { FilePenLine, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Events = ({ allEvents, onDeleteEvent }) => {
  // hooks
  const navigate = useNavigate();

  // vars
  const user = JSON.parse(localStorage.getItem("user"));

  // actions
  const _onDeleteEvent = async (id) => {
    const isConfirm = confirm("Are you absolutely sure?");
    if (!isConfirm) return;
    try {
      const response = await axios.delete(`/api/event/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast.success(response.data.message);
      onDeleteEvent(id);
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

  return (
    <div className="mt-4 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 md:max-w-screen-lg mx-auto">
      {allEvents?.map((event) => (
        <div className="p-3 border rounded-lg space-y-2" key={event._id}>
          <div className="w-full h-40 aspect-w-4 aspect-h-3 rounded-lg   overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={event.imageUrl}
              alt={event.name}
            />
          </div>
          <h1 className="text-lg font-medium text-neutral-900">{event.name}</h1>
          <p
            title={event.description}
            className="line-clamp-2 text-neutral-500"
          >
            {event.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                title="Delete Event"
                onClick={() => _onDeleteEvent(event._id)}
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

            <Button>Join Event</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;
