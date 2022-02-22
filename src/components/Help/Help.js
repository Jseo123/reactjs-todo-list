import { React, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import bookIcon from "../../assets/img/bookIcon.png";
import cancelIcon from "../../assets/img/deleteIcon.png";
import Button from "../Button";
import "./help.scss";

export default function Help() {
  const [helpModal, setToggleModal] = useState(false);
  const openModal = () => {
    setToggleModal(!helpModal);
  };
  return (
    <>
      <motion.Button
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="helpBtn btnWithIcon"
        handleClick={openModal}
      >
        <img className="bookIcon" src={bookIcon} alt="help icon" />
      </motion.Button>
      {helpModal && <ModalWindow handleModal={openModal} />}
    </>
  );
}

// modal window component
function ModalWindow({ handleModal }) {
  const modalFirstSection = () => {
    return (
      <>
        <h1>👋</h1>
        <p className="getStarted">GET STARTED</p>
        <h3>Welcome to the todo list!</h3>
        <p>Hi, we will help you to understand how the app works!</p>
      </>
    );
  };
  const modalSecondSection = () => {
    return (
      <>
        <h1>👋</h1>
        <h3>Creating the first todo!</h3>
        <p>
          you have to write down the tasks that you are going to perform in the
          future
        </p>
        <p>After that, press enter to submit the task</p>
      </>
    );
  };
  const markupInputTask = () => {
    return (
      <motion.div
        initial={{ height: 0, x: 300 }}
        animate={{ height: "6%", x: 0 }}
        className="markupInput"
      />
    );
  };
  const modalThirdSection = () => {
    return (
      <>
        <h1>👋</h1>
        <h3>Manage your task list!</h3>
        <p>
          In this section you can manage the task list as you want, the app can
          filter your task by done tasks or active tasks, You can cross out the
          tasks when you had done it!, or can uncross if you missclicked,
        </p>
        <p> The tasks can be eliminated too</p>
        <p>
          And if you want to edit the task, press the pencil icon, edit your
          task, and press Enter to submit!
        </p>
      </>
    );
  };
  const markupTaskList = () => {
    return (
      <motion.div
        initial={{ height: 0, x: 300 }}
        animate={{ height: "40%", x: 0 }}
        className="markupTaskList"
      />
    );
  };
  const [modalSection, setModalSection] = useState({
    section: [modalFirstSection, modalSecondSection, modalThirdSection],
    position: 0,
  });

  const handleContinue = () => {
    const { position } = modalSection;
    setModalSection({
      ...modalSection,
      position: position + 1,
    });
  };
  const { position, section } = modalSection;
  return (
    <>
      <div className="modalBackground">
        {position === 1 && markupInputTask()}
        {position === 2 && markupTaskList()}
      </div>
      <section className="modalWindow">
        <Button className="btnWithIcon" handleClick={handleModal}>
          <img className="deleteIcon" src={cancelIcon} alt="cancel icon" />
        </Button>
        {section[position]()}
        {position <= 1 && (
          <Button className="nextSectionBtn" handleClick={handleContinue}>
            Next page
          </Button>
        )}
      </section>
    </>
  );
}
