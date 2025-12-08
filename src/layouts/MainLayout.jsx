import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BackToTopButton from "../components/BackToTopButton";

const MainLayout = () => {
  return (
    <div>
      <div className="pb-28">
        <Navbar />
      </div>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />

      <BackToTopButton />
    </div>
  );
};

export default MainLayout;
