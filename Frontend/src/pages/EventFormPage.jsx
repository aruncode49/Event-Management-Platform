import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Loader, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EventFormPage = () => {
  // hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // state
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // actions
  const onImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "event_management_platform");
    formData.append("cloud_name", cloudName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
      e.target.value = null; // Reset the input for re-selection
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!eventDate || !eventDesc || !eventName || !imageUrl) {
      return toast.error("All fields are required!");
    }

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (id) {
        // update event
        console.log("Update Event");
      } else {
        // create event
        const response = await axios.post(
          "/api/event/create",
          {
            name: eventName,
            description: eventDesc,
            imageUrl,
            date: eventDate,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response?.data) {
          toast.success(response.data?.message);
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto my-10 pb-10">
      <h1 className="text-2xl font-semibold text-neutral-700 text-center">
        Create Event
      </h1>

      <form className="space-y-4 mt-5" onSubmit={onSubmit}>
        <div className="space-y-1">
          <label htmlFor="event-name" className="text-neutral-700">
            Name
          </label>
          <Input
            id="event-name"
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="event-desc" className="text-neutral-700">
            Description
          </label>
          <Input
            id="event-desc"
            type="text"
            placeholder="Enter event description"
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="event-date" className="text-neutral-700">
            Date
          </label>
          <Input
            id="event-date"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="event-image" className="text-neutral-700">
            Choose Image
          </label>
          {imageUploading && (
            <div>
              <Loader className="my-4 ml-12 animate-spin" />
            </div>
          )}
          {imageUrl && (
            <div className="py-3">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-28 h-28 object-cover rounded-sm overflow-hidden"
              />
              <Button
                onClick={() => setImageUrl("")}
                className="mt-2"
                type="button"
                size="sm"
                variant="destructive"
              >
                <X />
                Remove Image
              </Button>
            </div>
          )}
          <Input
            type="file"
            id="event-image"
            accept="image/png, image/jpeg"
            onChange={onImageUpload}
            disabled={imageUploading || imageUrl}
          />
        </div>
        <Button type="submit" className="w-full p-3 mt-5">
          {loading ? (
            <Loader className="animate-spin" />
          ) : id ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </div>
  );
};

export default EventFormPage;
