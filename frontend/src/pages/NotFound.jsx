import { FaCompass } from "react-icons/fa";
import EmptyState from "../components/EmptyState";

const NotFound = () => {
  return (
    <EmptyState
      message="Page not found"
      hint="The page you're looking for doesn't exist."
      icon={FaCompass}
    />
  );
};

export default NotFound;
