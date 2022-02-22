import { React } from "react";
import { motion } from "framer-motion/dist/framer-motion";

export default function MainHeader({ handleToogle }) {
  return (
    <div className="mainHeader">
      <motion.h1
        initial={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 3, duration: 1.5 }}
        animate={{ opacity: 1 }}
        className="title"
      >
        TODO
      </motion.h1>
      <button
        id="toogle"
        type="button"
        data-testid="toggle-theme"
        onClick={handleToogle}
      >
        <span>&#9789;</span>
      </button>
    </div>
  );
}
