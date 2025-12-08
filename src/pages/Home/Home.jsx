import Banner from "./Banner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Process from "./Process";
import process1Img from "../../assets/process-1.jpg";

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
        <Process />
      </motion.div>
    </div>
  );
};

export default Home;
