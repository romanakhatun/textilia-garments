// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import process1Img from "../../assets/process-1.jpg";
import process2Img from "../../assets/process-2.jpg";
import process3Img from "../../assets/process-3.jpg";
import process4Img from "../../assets/process-4.jpg";
import ProcessStepCard from "./ProcessStepCard";

const processSteps = [
  {
    number: "01.",
    title: "Identify Your Needs",
    description:
      "Initial consultation to confirm garment style, materials, minimum order quantities (MOQ), and production capacity.",
  },
  {
    number: "02.",
    title: "Discuss Order Details",
    description:
      "Review samples, finalize pricing, confirm payment options, and digitally issue the official order via the system.",
  },
  {
    number: "03.",
    title: "Clarify Timelines",
    description:
      "Establish strict schedules for cutting, sewing, and finishing. Your dashboard automatically updates production progress throughout.",
  },
  {
    number: "04.",
    title: "Finalize Agreement",
    description:
      "Secure the booking and initiate the workflow. The order moves to the 'Approved' status, and tracking begins immediately.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Process = () => {
  return (
    <motion.section
      className="py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-x-4 h-full relative p-6">
          <motion.div variants={itemVariants} className="self-end">
            <img
              src={process1Img}
              alt="Designing"
              className="w-full h-80 object-cover"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="self-center">
            <img
              src={process2Img}
              alt="Cutting"
              className="w-[260px] h-[260px] object-cover rounded-full"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="self-center">
            <img
              src={process3Img}
              alt="Sewing"
              className="w-[260px] h-[260px] object-cover rounded-full"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="h-80">
            <img
              src={process4Img}
              alt="Quality Check"
              className="w-full h-80 object-cover"
            />
          </motion.div>
        </div>

        <div className="lg:py-10">
          <motion.p
            variants={itemVariants}
            className="text-sm font-medium uppercase tracking-widest text-primary mb-2 highlight-title inline-block"
          >
            OUR PROCESS
          </motion.p>

          <motion.h2
            variants={itemVariants}
            className="text-4xl font-medium text-base-content leading-snug mb-4"
          >
            Easy Steps To Get Our Services
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-base text-base-content/80 font-nunito leading-relaxed mb-10"
          >
            From initial consultation, our process ensures seamless integration,
            efficiency, and full transparency at every key production stage.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {processSteps.map((step, index) => (
              <ProcessStepCard key={index} {...step} index={index} />
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10">
            <a
              href="/all-products"
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all duration-300"
            >
              See All Products & Pricing
              <FaLongArrowAltRight />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
