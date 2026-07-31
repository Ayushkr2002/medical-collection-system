export const pageVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    y: -20,

    transition: {
      duration: 0.4,
    },
  },
};