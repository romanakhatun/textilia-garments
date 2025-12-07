import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("signin data", data);

    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-2 mt-4 text-black">
        Welcome Back
      </h2>
      <p className="text-base text-black mb-5">Login with TexTila</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Email
              </span>
            </div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input input-bordered w-full bg-white"
              required
            />
            {errors.email?.type === "required" && (
              <span className="text-red-700">Email field is required</span>
            )}
          </label>
        </div>

        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Password
              </span>
            </div>
            <input
              type="text"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered w-full bg-white"
              required
            />
            {errors.password?.type === "required" && (
              <span className="text-red-700">Password field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-700">Password Must be 6 character</span>
            )}
          </label>
        </div>

        <div className="text-sm pt-1">
          <Link
            to="/forget-password"
            className="underline text-sm text-[#71717a]"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>

      <div className="divider text-gray-400 my-6">Or</div>

      <div className="flex justify-center mb-4">
        <p className="text-sm text-gray-600">
          Don't have any account?{" "}
          <Link
            to="/register"
            state={location?.state}
            className="link link-hover text-sm text-[#8FA748] hover:text-lime-600 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
