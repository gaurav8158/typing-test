import React from "react";
import { useTestMode } from "../Context/TestModeContext";

const UpperMenu = ({ CountDown }) => {

    const { setTestTime } = useTestMode();

    const updateTime = (e) => {
        setTestTime(Number(e.target.id));
    }
    return (
        <div className="Upper-menu">
            <div className="counter">{CountDown}</div>

            <div className="modes">
                <div className="time-mode" id={15} onClick={updateTime}>15s</div>
                <div className="time-mode" id={30} onClick={updateTime}>30s</div>
                <div className="time-mode" id={60} onClick={updateTime}>60s</div>
            </div>
        </div>

    )
}

export default UpperMenu;