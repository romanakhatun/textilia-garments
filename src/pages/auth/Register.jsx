import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useMessage from "../../hooks/useMessage";
import AlertMessage from "../../components/AlertMessage";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const { error, success, showError, showSuccess } = useMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegister = (data) => {
    // console.log(data);
    // console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // console.log(result.user);
        // 1. store the image in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          // console.log("after image upload", res.data.data.url);

          const photoURL = res.data.data.url;

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoURL,
            role: data.role,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              showSuccess("Login Successful");
              navigate(location?.state || "/");
            })
            .catch((err) => showError(err.message || "Registration Failed"));
        });
      })
      .catch((err) => {
        showError(err.message || "Registration Failed");
      });
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-2 mt-4 text-black">
        Create an Account
      </h2>
      <p className="text-base text-black mb-5">Register with Textilia</p>

      {/* Login Form */}
      <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
        <AlertMessage type="error" message={error} />
        <AlertMessage type="success" message={success} />

        {/* Name Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Name <span className="text-red-700">*</span>
              </span>
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full bg-white"
            />
            {errors.name && (
              <span className="text-red-700">Name is required</span>
            )}
          </label>
        </div>

        {/* Photo Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Photo <span className="text-red-700">*</span>
              </span>
            </div>
            <input
              type="file"
              {...register("photo", { required: true })}
              placeholder="Name"
              className="file-input input-bordered w-full bg-white"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-700">Photo is required</span>
            )}
          </label>
        </div>

        {/* Email Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Email <span className="text-red-700">*</span>
              </span>
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full bg-white"
            />
            {errors.email?.type === "required" && (
              <span className="text-red-700">Email is required</span>
            )}
          </label>
        </div>

        {/* Password Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Password <span className="text-red-700">*</span>
              </span>
            </div>
            <input
              type="text"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Password"
              className="input input-bordered w-full bg-white"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-700">Password field is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-700">Password Must be 6 character</span>
            )}
          </label>
        </div>

        {/* Role Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Select Role <span className="text-red-700">*</span>
              </span>
            </div>

            <select
              {...register("role", { required: true })}
              className="select select-bordered w-full bg-white"
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>

            {errors.role && (
              <span className="text-red-700">Role selection is required</span>
            )}
          </label>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn-primary w-full mt-5">
          Register
        </button>
      </form>

      <div className="divider text-gray-400 my-6">Or</div>

      <div className="flex justify-center mb-3">
        <p className="text-sm text-gray-600">
          Don't have any account?{" "}
          <Link
            to="/login"
            state={location?.state}
            className="link link-hover text-sm text-[#8FA748] hover:text-lime-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
