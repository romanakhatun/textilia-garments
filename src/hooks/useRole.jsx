import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data = {},
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    enabled: !!user?.email,
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      return res.data;
    },
  });

  return {
    role: data.role || "buyer",
    data,
    roleLoading,
    refetchRole: refetch,
  };
};

export default useRole;
