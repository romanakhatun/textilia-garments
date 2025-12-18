import Banner from "./Banner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Process from "./Process";
import CustomerFeedback from "./CustomerFeedback";
import HomeProducts from "./HomeProducts";
import Brands from "./Brands";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Banner />
        <HomeProducts />
        <Brands />
        <Process />
        <hr className="border-t border-base-300" />
        <CustomerFeedback />
      </motion.div>
    </div>
  );
};

export default Home;
