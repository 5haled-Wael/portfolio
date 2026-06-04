export const fadeUp = ({ delay = 0 } = {}) => ({
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
});

export const fadeDown = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const fadeIn = ({ delay = 0 } = {}) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.5,
      ease: "easeOut",
    },
  },
});

export const BlobAnimation = ({
  duration = 12,
  delay = 0,
  opacity = 0.6,
  xMovement = [0, 60, -40, 30, -20, 0],
  yMovement = [0, -70, 50, -30, 40, 0],
  scaleRange = [0.7, 1.2, 0.9, 1.1, 1],
  fadeInDuration = 1,
} = {}) => ({
  hidden: { opacity: 0, scale: scaleRange[0] },
  visible: {
    opacity: opacity,
    scale: scaleRange,
    x: xMovement,
    y: yMovement,
    transition: {
      duration: duration,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay,
      opacity: { duration: fadeInDuration },
      scale: { duration: fadeInDuration },
    },
  },
});
