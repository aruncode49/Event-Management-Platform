import { useParams } from "react-router-dom";

const EventFormPage = () => {
  // hooks
  const { id } = useParams();

  return <div>EventFormPage: {id}</div>;
};

export default EventFormPage;
