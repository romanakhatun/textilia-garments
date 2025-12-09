import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const ManagerProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      company: user?.company || "",
      department: user?.department || "",
    },
  });

  const handleManagerProfile = async (data) => {
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Manager Profile Updated",
        text: "All changes have been saved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-base-100 rounded-xl shadow-md my-10">
      <h1 className="text-3xl font-extrabold mb-4">Manager Profile</h1>
      <p className="mb-6 text-base-content/70">
        Update your management details and account information
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl w-full md:w-1/3">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <h2 className="mt-4 text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-base-content/60">{user?.email}</p>

          <div className="mt-3 badge badge-secondary badge-outline">
            Role: Manager
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit(handleManagerProfile)}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label className="label font-medium">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="label font-medium">Email</label>
              <input
                type="email"
                disabled
                {...register("email")}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            {/* Company */}
            <div>
              <label className="label font-medium">Company Name</label>
              <input
                type="text"
                {...register("company")}
                placeholder="Company Name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Department */}
            <div>
              <label className="label font-medium">Department</label>
              <input
                type="text"
                {...register("department")}
                placeholder="Department (e.g., Production)"
                className="input input-bordered w-full"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label font-medium">Profile Photo URL</label>
              <input
                type="text"
                {...register("photoURL")}
                className="input input-bordered w-full"
              />
            </div>

            {/* Save Button */}
            <button type="submit" className="btn btn-primary w-full">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagerProfile;
