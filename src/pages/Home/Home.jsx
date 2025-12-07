import Banner from "./Banner";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Variants for the entire page container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the appearance of major sections (Banner, Products, etc.)
    },
  },
};

const Home = () => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Banner />
    </motion.div>
  );
};

export default Home;
