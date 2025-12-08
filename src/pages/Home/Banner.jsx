import { FaArrowRight } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import banner1 from "../../assets/banner-1.jpg";
import { Link } from "react-router";

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const Banner = () => {
  return (
    <section className="pb-20 pt-10 lg:pt-0 bg-base-100 flex items-center lg:min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 lg:gap-8  w-full">
        <div className="flex flex-col justify-center lg:py-10">
          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium uppercase tracking-widest text-secondary mb-2 "
          >
            <span className="highlight-title">TRACK YOUR SUCCESS.</span>
          </motion.p>

          {/* Main Heading*/}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-arsenal font-medium leading-tight text-base-content"
          >
            Streamline Production.
            <br className="hidden md:inline" />
            Deliver On Time.
          </motion.h1>

          {/* Descriptive Text*/}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-base-content/80 leading-relaxed max-w-lg"
          >
            The Garments Order & Production Tracker simplifies managing orders,
            monitoring every stage from cutting to finishing, and ensuring
            seamless inventory control for small and medium-sized factories.
          </motion.p>

          {/* Call to Action Button*/}
          <motion.div
            variants={itemVariants}
            className="flex flex-row items-center gap-6 mt-8"
          >
            {" "}
            <Link to="/all-products">
              <button className="btn-primary font-arsenal px-[29px] h-[50px]">
                Get Started
                <FaArrowRight />
              </button>{" "}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative h-96 md:h-[500px] hidden md:block lg:h-full overflow-hidden"
        >
          <img
            src={banner1}
            alt="Garments Production Workflow"
            className="w-full lg:h-full object-cover rounded-xl shadow-xl relative z-10"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
