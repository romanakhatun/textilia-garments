import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/About";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import TrackOrder from "../pages/Dashboard/Buyer/TrackOrder";
import BuyerOrders from "../pages/Dashboard/Buyer/BuyerOrders";
import ManageProducts from "../pages/Dashboard/Manager/ManageProducts";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApprovedOrders";
import AllOrdersAdmin from "../pages/Dashboard/Admin/AllOrdersAdmin";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllProductsAdmin from "../pages/Dashboard/Admin/AllProductsAdmin";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../pages/Dashboard/Shared/UserProfile";
import AdminRoute from "./AdminRoute";
import Products from "../pages/Products/Products";
import ProductsDetails from "../pages/Products/ProductsDetails";
import Contact from "../pages/Contact";
import CreateOrder from "../pages/Order/CreateOrder";

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
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/all-products",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: (
          <ProtectedRoute>
            <ProductsDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <CreateOrder />
          </ProtectedRoute>
        ),
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
      { path: "profile", element: <UserProfile /> },

      // ---- MANAGER ROUTES
      { path: "add-product", element: <AddProduct /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "pending-orders", element: <PendingOrders /> },
      { path: "approved-orders", element: <ApprovedOrders /> },
      { path: "profile", element: <UserProfile /> },

      // ---- ADMIN ROUTES
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProductsAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrdersAdmin />
          </AdminRoute>
        ),
      },
      { path: "profile", element: <UserProfile /> },
    ],
  },
  // ==== 404 Not Found
  {
    path: "*",
    element: <NotFound />,
  },
]);
