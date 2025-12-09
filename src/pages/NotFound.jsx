import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-3">Page Not Found</p>
      <Link to={"/"} className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
