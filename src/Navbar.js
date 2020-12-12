import React, { useState, useEffect } from 'react';
import './navbar.css'
import LeaderboardSVG from './LeaderboardSVG.js';
import PodiumSVG from './PodiumSVG.js';
import CopySVG from './CopySVG.js';
import './sliding-window.css';

const copy = () => {
    const textarea = document.createElement('textarea');
    // Prevent zooming on iOS
    textarea.style.fontSize = '12pt';
    // Reset box model
    textarea.style.border = '0';
    textarea.style.padding = '0';
    textarea.style.margin = '0';
    textarea.style.position = 'fixed';
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.value = "1101602-f0e2ec81";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    const copyBubble = document.getElementsByClassName("speech-bubble")[0];
    copyBubble.style.display = "flex";
    setTimeout(() => {
        copyBubble.style.display = "";
    }, 1000);
}

const slideWindow = (canAnimate, setCanAnimate, isForward, setIsForward) => {
    if (canAnimate) {
        setCanAnimate(false);
        const elem = document.getElementById("sliding-window-container");
        elem.classList.add("slide-down-anim");
        setTimeout(() => {
            document.getElementById("top").style.top = isForward ? "50%" : "";
            document.getElementById("bottom").style.top = isForward ? "0" : "";
            elem.classList.remove("slide-down-anim");
            setIsForward(!isForward);
            setCanAnimate(true);
        }, 1000);
    }
}

const Navbar = (props) => {
    const [isForward, setIsForward] = useState(true);
    const [canAnimate, setCanAnimate] = useState(true);

    useEffect(() => {
        const elems = [...document.getElementsByClassName("navbar-button")];
        elems[0].style.cursor = isForward && canAnimate ? "pointer" : "not-allowed";
        elems[1].style.cursor = !isForward && canAnimate ? "pointer" : "not-allowed";
    }, [isForward, canAnimate]);
    return (
        <>
            <div id="sliding-window-container">
                <div className="windows" id="top">
                    {props.top}
                </div>
                <div className="windows" id="bottom">
                    {props.bottom}
                    <div id="info-container">
                        <a href="https://adventofcode.com"><span>Link to Competion</span></a>
                        <span id="join-leaderboard">Code to join the leaderboard:</span>
                        <div id="code">
                            1101602-f0e2ec81
                    <button aria-label="Copy Button" onClick={copy}>
                                <CopySVG></CopySVG>
                            </button>
                            <div className="speech-bubble">Copied!</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="navbar-container">
                <div className="button-container" id="podium-button-container">
                    <div className="navbar-button"
                        onClick={() => {
                            if (isForward)
                                slideWindow(canAnimate, setCanAnimate, isForward, setIsForward);
                        }}>
                        <LeaderboardSVG className="nav-button-svg"></LeaderboardSVG>
                    </div>
                </div>
                <div className="button-container" id="leaderboard-button-container">
                    <div className="navbar-button"
                        onClick={() => {
                            if (!isForward)
                                slideWindow(canAnimate, setCanAnimate, isForward, setIsForward);
                        }}>
                        <PodiumSVG className="nav-button-svg"></PodiumSVG>
                    </div>
                </div>
            </div>
        </>);
}

export default Navbar;