import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  console.log("in register location", location);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    console.log(data);
    console.log("after register", data.photo[0]);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // 1. store the image in form data
        const formData = new FormData();
        const formDataAppend = formData.append("image", profileImg);
        console.log(formDataAppend);

        // 2. send the photo to store and get the ul
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };

          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");
              navigate(location?.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold mb-2 mt-4 text-black">
        Create an Account
      </h2>
      <p className="text-base text-black mb-5">Register with ZapShift</p>

      {/* Login Form */}
      <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
        {/* Name Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Name
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
                Photo
              </span>
            </div>
            <input
              type="file"
              {...register("photo")}
              placeholder="Name"
              className="file-input input-bordered w-full bg-white"
            />
          </label>
        </div>

        {/* Email Input */}
        <div>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text-base font-medium text-gray-700">
                Email
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
                Password
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

        {/* Login Button */}
        <button type="submit" className="btn-primary w-full mt-3">
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
