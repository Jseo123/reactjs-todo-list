import { React } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import Button from "../Button";
import "./Clear.scss";

export default function Clear({ handleClear, highlightClear }) {
  // condition if some items are completed, mark CLEAR COMPLETED
  if (highlightClear().length > 0) {
    return (
      <motion.button initial={{ scale: 1 }} animate={{ scale: 1.25 }} className="clearBtn highlighted" onClick={handleClear}>
        Clear completed
      </motion.button>
    )

  }
  return (
    <Button isDisabled className="clearBtn" handleClick={handleClear}>
      Clear completed
    </Button>
  );
}
