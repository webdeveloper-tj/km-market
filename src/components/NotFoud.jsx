import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-200">404</h1>
        <p className="text-3xl text-gray-400">Page Not Found!</p>
        <Link to="/" className=" text-gray-400">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
