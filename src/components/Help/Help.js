import { React, useState } from "react";
import bookIcon from "../../assets/img/bookIcon.png"
import cancelIcon from "../../assets/img/deleteIcon.png";
import Button from "../Button"
import "./help.scss";

function modalFirstSection() {
    const handleContinue = () => {
        console.log("hi")
    }
    return (
        <>
            <div className="modalBackground" />
            <section className="modalWindow">
                <Button className="btnWithIcon"><img className="deleteIcon" src={cancelIcon} alt="cancel icon" /></Button>

                <h1>👋</h1>
                <p className="getStarted">GET STARTED</p>
                <h3>Welcome to the todo list!</h3>
                <p>Hi, we will help you to understand how the app works!</p>

                <Button handleClick={handleContinue}>Next page</Button>

            </section>
        </>
    )
}
function modalSecondSection() {

}
export default function Help() {
    const [helpModal, setToggleModal] = useState(false)
    const openModal = () => {
        setToggleModal(true);
    }
    return (
        <>
            <Button className="helpBtn btnWithIcon" handleClick={openModal}>
                <img className="bookIcon" src={bookIcon} alt="help icon" />

            </Button>
            {helpModal && modalFirstSection()}
        </>

    );
}