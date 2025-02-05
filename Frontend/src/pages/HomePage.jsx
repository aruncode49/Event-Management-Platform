import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="mt-20 text-center sm:max-w-screen-md md:mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-neutral-800">
        Event Management Platform
      </h1>
      <p className="mt-5 text-lg text-neutral-600">
        Revolutionize event planning with our all-in-one event management
        platform, designed to streamline organization, enhance attendee
        engagement, and simplify logistics. From seamless registration to
        real-time analytics, we empower you to create unforgettable experiences
        with ease.
      </p>
      <Link to="/dashboard">
        <Button className="mt-5">Get Started</Button>
      </Link>
    </div>
  );
};

export default HomePage;
