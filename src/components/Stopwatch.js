import React, { useState } from "react";
import '../App.css';
import icon from '../img/restart-icon.svg';

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showResetButton, setShowResetButton] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    function formatTime(time) {
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const ms = Math.floor((time % 1000) / 10); 

        return `${minutes < 10 ? '0' + minutes : minutes}
        :${seconds < 10 ? '0' + seconds : seconds}
        :${ms < 10 ? '0' + ms : ms}`;
    }

    function toggleTimer() {
        if(!isRunning) {
            const id = setInterval(() => setTime((prevTime) => prevTime + 10), 10);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
            setIntervalId(null);
            setShowResetButton(true);
        }
        setIsRunning(!isRunning);
    }

    function resetTimer() {
        clearInterval(intervalId);
        setTime(0);
        setIsRunning(false);
        setShowResetButton(false);
    }

    return (
        <div className="clock">
        <div className="container">
            <div onClick={toggleTimer} className="stopwatch">
                <h1>{formatTime(time)}</h1>
            </div>
        </div>

        {!isRunning && showResetButton && (
                <button onClick={resetTimer} className="reset-button">
                    <img className="reset-img random-btn" src={icon} alt="restart" />
                </button>
            )}
    </div>
    );
};

export default Stopwatch;