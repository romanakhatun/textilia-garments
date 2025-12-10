import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import BuyerProfile from "../pages/Dashboard/Buyer/BuyerProfile";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
import BuyerOrders from "../pages/Dashboard/Buyer/BuyerOrders";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import ManagerProfile from "../pages/Dashboard/Manager/ManagerProfile";
import AllOrdersAdmin from "../pages/Dashboard/Admin/AllOrdersAdmin";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllProductsAdmin from "../pages/Dashboard/Admin/AllProductsAdmin";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";

export const router = createBrowserRouter([
  // == PUBLIC WEBSITE ROUTES
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  // == AUTH ROUTES
  {
    path: "/",
    element: <AuthLayouts />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  // == DASHBOARD ROUTES
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout></DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      // ---- BUYER ROUTES
      { path: "my-orders", element: <BuyerOrders /> },
      { path: "track-order/:orderId", element: <TrackOrder /> },
      { path: "profile", element: <BuyerProfile /> },

      // ---- MANAGER ROUTES
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "pending-orders", element: <PendingOrders /> },
      { path: "approved-orders", element: <ApprovedOrders /> },
      { path: "profile", element: <ManagerProfile /> },

      // ---- ADMIN ROUTES
      { path: "manage-users", element: <ManageUsers /> },
      { path: "all-products", element: <AllProductsAdmin /> },
      { path: "all-orders", element: <AllOrdersAdmin /> },
      { path: "profile", element: <AdminProfile /> },
    ],
  },
  // ==== 404 Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);
