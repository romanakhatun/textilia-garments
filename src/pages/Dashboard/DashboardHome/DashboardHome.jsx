import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role } = useRole();

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "manager") {
    return <ManagerDashboard></ManagerDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashboardHome;
