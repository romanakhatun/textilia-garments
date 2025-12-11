import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { MdLogout } from "react-icons/md";

const UserProfile = () => {
  const { user, updateUserProfile, signOutUser } = useAuth();
  const { data: userData, roleLoading } = useRole();
  console.log("user data", userData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });
      reset({
        name: data.name,
        email: user?.email,
        photoURL: data.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information was successfully saved.",
        confirmButtonColor: "#5f5e5d",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
        confirmButtonColor: "#ff5724",
      });
    }
  };

  if (roleLoading) {
    return <LoadingSpinner message={"Loading Role..."} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-base-100 rounded-xl shadow-xl my-10">
      <h1 className="text-3xl font-arsenal font-extrabold mb-4 capitalize">
        {userData?.role || "My"} Profile
      </h1>
      <p className="mb-6 text-base-content/70">
        Manage your account details and status.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl w-full lg:w-1/3 border border-base-300">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
          />

          <h2 className="mt-4 text-xl font-arsenal font-semibold">
            {user?.displayName}
          </h2>
          <p className="text-sm text-base-content/60">{user?.email}</p>

          {/* Role Badge */}
          <div className="mt-3 badge badge-primary badge-outline text-lg font-bold capitalize">
            Role: {userData?.role}
          </div>

          {/* Status & Suspend Feedback */}

          <div className="mt-4 w-full text-center">
            {userData?.role !== "buyer" && (
              <span
                className={`badge ${
                  userData.status === "approved"
                    ? "badge-success"
                    : userData.status === "suspended"
                    ? "badge-error"
                    : "badge-warning"
                } text-white font-bold capitalize`}
              >
                Status: {userData.status || "pending"}
              </span>
            )}
            {userData.suspendReason && (
              <div className="mt-3 p-3 bg-error/10 text-error text-sm rounded-lg border border-error">
                <p className="font-bold">Suspension Reason:</p>
                <p className="capitalize">{userData.suspendReason}</p>
              </div>
            )}
            <button onClick={() => signOutUser()} className="btn-primary mt-4">
              <MdLogout size={22} />
              <>Logout</>
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full lg:w-2/3 p-4">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="label font-medium mb-1 p-0">Full Name</label>
              <input
                type="text"
                {...register("name", { required: "Name field is required" })}
                className="input input-bordered w-full bg-base-100"
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="label font-medium mb-1 p-0">
                Email Address
              </label>
              <input
                type="email"
                disabled
                {...register("email")}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label font-medium mb-1 p-0">Photo URL</label>
              <input
                type="text"
                {...register("photoURL")}
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="btn btn-primary w-full text-white mt-8"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
