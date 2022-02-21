import { React, useState } from "react";
import bookIcon from "../../assets/img/bookIcon.png"
import cancelIcon from "../../assets/img/deleteIcon.png";
import Button from "../Button"
import "./help.scss";

export default function Help() {
    const [helpModal, setToggleModal] = useState(false)
    const openModal = () => {
        setToggleModal(!helpModal);
    }
    return (
        <>
            <Button className="helpBtn btnWithIcon" handleClick={openModal}>
                <img className="bookIcon" src={bookIcon} alt="help icon" />

            </Button>
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
        )
    }
    const modalSecondSection = () => {
        return (
            <>
                <h1>👋</h1>
                <p className="getStarted">GET STARTED2</p>
                <h3>Welcome to the todo list!</h3>
                <p>Hi, we will help you to understand how the app works!</p>
            </>
        )
    }
    const modalThirdSection = () => {
        return (
            <>
                <h1>👋</h1>
                <p className="getStarted">GET STARTED3</p>
                <h3>Welcome to the todo list!</h3>
                <p>Hi, we will help you to understand how the app works!</p>
            </>
        )

    }
    const [modalSection, setModalSection] = useState({
        section: [modalFirstSection, modalSecondSection, modalThirdSection],
        position: 0
    });
    const handleContinue = () => {
        const { position } = modalSection
        setModalSection({
            ...modalSection,
            position: position + 1
        })
    }
    const { position, section } = modalSection
    return (
        <>
            <div className="modalBackground" />
            <section className="modalWindow">
                <Button className="btnWithIcon" handleClick={handleModal}><img className="deleteIcon" src={cancelIcon} alt="cancel icon" /></Button>
                {section[position]()}
                {position <= 1 && <Button handleClick={handleContinue}>Next page</Button>}
            </section>
        </>
    )
}