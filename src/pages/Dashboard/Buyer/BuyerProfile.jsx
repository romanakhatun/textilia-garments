import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const BuyerProfile = () => {
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
    },
  });

  const handleUpdateProfile = async (data) => {
    try {
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile information was successfully saved.",
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
      <h1 className="text-3xl font-extrabold mb-4">My Profile</h1>
      <p className="mb-6 text-base-content/70">
        Manage your profile information
      </p>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Photo Section */}
        <div className="flex flex-col items-center bg-base-200 p-6 rounded-xl w-full md:w-1/3">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
          <h2 className="mt-4 text-xl font-semibold">{user?.displayName}</h2>
          <p className="text-sm text-base-content/60">{user?.email}</p>

          <div className="mt-3 badge badge-primary badge-outline">
            Role: Buyer
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full">
          <form
            onSubmit={handleSubmit(handleUpdateProfile)}
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
                <p className="text-red-500 text-sm mt-1">
                  Name field is required
                </p>
              )}
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="label font-medium">Email Address</label>
              <input
                type="email"
                disabled
                {...register("email")}
                className="input input-bordered w-full bg-base-200 cursor-not-allowed"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label font-medium">Photo URL</label>
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

export default BuyerProfile;
