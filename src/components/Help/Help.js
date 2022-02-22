import { React, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import bookIcon from "../../assets/img/bookIcon.png";
import cancelIcon from "../../assets/img/deleteIcon.png";
import Button from "../Button";
import "./help.scss";

export default function Help({ handleLocalStorage }) {
    const [isHelped, setIsHelped] = useState(handleLocalStorage())
    const [helpModal, setToggleModal] = useState(!isHelped)
    const openModal = () => {
        setToggleModal(!helpModal);
        localStorage.setItem("helped", JSON.stringify(true))
        setIsHelped(true)
    }
    return (
        <>
            <motion.button
                animate={{ y: [-30, 0, -30] }}
                transition={{ duration: 2.5, repeat: Infinity, type: "tween" }}
                className="helpBtn btnWithIcon" onClick={openModal}>
                <img className="bookIcon" src={bookIcon} alt="help icon" />

            </motion.button>
            {helpModal && <ModalWindow handleModal={openModal} />}
        </>
    );
}
// modal window component
function ModalWindow({ handleModal }) {
    const modalFirstSection = () => (
        <>
            <h1>👋</h1>
            <p className="getStarted">GET STARTED</p>
            <h3>Welcome to the todo list!</h3>
            <p>Hi, we will help you to understand how the app works!</p>
        </>
    );
    const modalSecondSection = () => (
        <>
            <h1>📝</h1>
            <h3>Creating the first todo!</h3>
            <p>
                In this field, you have to write the tasks that you are going to
                perform in the future
            </p>
            <p>After that, press enter to submit the task</p>
        </>
    );
    const markupInputTask = () => (
        <motion.div
            initial={{ height: 0, x: 300 }}
            animate={{ height: "6%", x: 0 }}
            className="markupInput"
        />
    );
    const modalThirdSection = () => (
        <>
            <h1>📖</h1>
            <h3>Manage your task list!</h3>
            <p>You can <strong>cross out the
                tasks</strong> when you had done it!, or can uncross if you missclicked</p>
            <p> <strong>The tasks can be eliminated</strong></p>
            <p>
                And if you want to <strong>edit the task</strong>, press the pencil icon, edit your
                task, and press Enter to submit!
            </p>
        </>
    );
    const markupTaskList = () => (
        <motion.div
            initial={{ height: 0, x: 300 }}
            animate={{ height: "20%", x: 0 }}
            className="markupTaskList"
        />
    );
    const modalFourthSection = () => (
        <>
            <h1>🔍</h1>
            <h3>Use the filters!</h3>
            <p>
                In this section you can manage the task list as you want, the app can
                filter your task by <strong>done</strong> tasks or <strong>active</strong> tasks
            </p>
        </>
    )
    const markupFilters = () => (
        <motion.div
            initial={{ height: 0, x: 300 }}
            animate={{ height: "5%", x: 0 }}
            className="markupFilters"
        />
    )

    const modalLastSection = () => (
        <>
            <h1>📒</h1>
            <p className="getStarted">Enjoy the app!</p>
            <h3>Time to use the app!</h3>
            <p>
                I Hope you liked the tutorial, it&apos;s time to do some task!
            </p>
            <p className="credits">This project was created by Jose Rodriguez and Luis Molina</p>
        </>
    )
    const [modalSection, setModalSection] = useState({
        section: [modalFirstSection, modalSecondSection, modalThirdSection, modalFourthSection, modalLastSection],
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
                {position === 3 && markupFilters()}
            </div>
            <section className={`modalWindow pos-${position}`}>
                <Button className="btnWithIcon" handleClick={handleModal}>
                    <img className="deleteIcon" src={cancelIcon} alt="cancel icon" />
                </Button>
                {/* Executes next step of tutorial */}
                {section[position]()}
                {position < (section.length - 1) && (
                    <Button className="nextSectionBtn" handleClick={handleContinue}>
                        Next page
                    </Button>
                )}
                {position === section.length - 1 && (
                    <Button className="nextSectionBtn" handleClick={handleModal}>
                        Exit tutorial
                    </Button>
                )}
            </section>
        </>
    );
}
