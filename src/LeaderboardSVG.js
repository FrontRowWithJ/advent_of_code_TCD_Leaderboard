import React from 'react';

const LeaderboardSVG = (props) => {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 17">
            <rect x="0.5" y="0.5" width="16" height="16" rx="2" fill="none" stroke="black"></rect>
            <line x1="5.5" y1="0" x2="5.5" y2="16" stroke="black"></line>
            <line x1="0" y1="6" x2="16" y2="6" stroke="black"></line>
            <line x1="0" y1="11.5" x2="16" y2="11.5" stroke="black"></line>
        </svg>
    );
}

export default LeaderboardSVG;