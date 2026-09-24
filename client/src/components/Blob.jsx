import { motion } from "framer-motion";
import { BlobAnimation } from "../animations/animations";

const Blob = ({
  duration = 12,
  delay = 0,
  opacity = 0.6,
  xMovement = [0, 40, -30, 20, 0],
  yMovement = [0, -50, 30, -20, 0],
  className = "",
  color = "#1a0f6e",
}) => {
  const animation = BlobAnimation({
    duration,
    delay,
    opacity,
    xMovement,
    yMovement,
  });

  return (
    <motion.div
      variants={animation}
      initial="hidden"
      animate="visible"
      className={`rounded-full blur-[80px] ${className}`}
      style={{ backgroundColor: color }}
    />
  );
};

export default Blob;
