import { Link } from "react-router-dom";
import { ClayButton } from "../components/ui/ClayButton";

const NotFound = () => {
  return (
    <div className="px-6 md:px-10 py-24 max-w-xl mx-auto text-center">
      <p className="text-caption text-accent font-medium">404</p>
      <h1 className="text-headline mt-4">Page not found</h1>
      <p className="text-body text-muted mt-4">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="inline-block mt-8">
        <ClayButton>Back to Homepage</ClayButton>
      </Link>
    </div>
  );
};

export { NotFound };
