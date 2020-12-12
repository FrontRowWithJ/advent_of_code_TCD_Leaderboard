import React from 'react'

const PodiumSVG = (props) => {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M32 224h128v192H32zM192 128h128v288H192zM352 288h128v128H352z" />
        </svg>
    );
}

export default PodiumSVG;