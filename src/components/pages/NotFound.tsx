import clsx from "clsx";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        <Link to="/" className={clsx(buttonVariants({ variant: "default" }))}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
