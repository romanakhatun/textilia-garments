// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProcessStepCard = ({ number, title, description, index }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  console.log(index);

  return (
    <motion.div
      variants={itemVariants}
      className={`p-6 ${
        index === 0 && "bg-base-200"
      } hover:bg-base-200 flex flex-col justify-between transition duration-300`}
    >
      <div className="flex flex-col">
        <h4 className="text-lg font-arsenal text-primary mb-1">{number}</h4>
        <h3 className="font-arsenal text-xl font-medium text-base-content mb-2">
          {title}
        </h3>
        <p className="text-sm text-base-content/80 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
export default ProcessStepCard;
