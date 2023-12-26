import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-8">Oops! Page not found</p>
        <Link
          to="/"
          className="text-white bg-blue-500 px-6 py-3 rounded-md transition duration-300 transform hover:scale-105"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
