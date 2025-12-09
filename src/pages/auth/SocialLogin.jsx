import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogleUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("location in social", location);

  const handleGoogleSignIn = () => {
    signInGoogleUser()
      .then((result) => {
        // create user in the database
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user data has been stored", res.data);
          navigate(location.state || "/");
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn text-gray-600 w-full flex items-center justify-center bg-[#E9ECF1]"
      >
        <span className="text-xl">
          <FcGoogle />
        </span>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
