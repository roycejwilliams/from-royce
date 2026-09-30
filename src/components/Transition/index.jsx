import { motion, useReducedMotion } from "motion/react";

const variants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function Transition({ children }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className="route-transition">{children}</div>;
  return (
    <motion.div className="route-transition" variants={variants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
}
