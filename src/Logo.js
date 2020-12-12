import React, { useEffect, useState } from 'react';
import red_tree from './christmas_tree_red.png';
import white_tree from './christmas_tree_white.png';
import green_tree from './christmas_tree_green.png';
import './logo.css';

const Logo = () => {
    const [zIndices, setZIndices] = useState([0, 1, 2]);
    const trees = [red_tree, white_tree, green_tree];
    useEffect(() => {
        const iid = setInterval(() => {
            const n = zIndices.map((zIndex) => { return (zIndex + 1) % zIndices.length });
            setZIndices(n);
        }, 1000);
        return () => clearInterval(iid);
    }, [zIndices]);
    return (
        <div id="logo-container">
            <div id="logo-inner-circle">
                <svg width="100%" height="100%">
                    <circle id="circle" cx="50%" cy="50%" r="64" fill="yellowgreen" />
                    <text fill="white">
                        <textPath id="text-path" xlinkHref="#circle">
                            TCD Advent of Code
                        </textPath>
                    </text>
                </svg>
            </div>
            {
                trees.map((tree, i) => {
                    return (
                        <img key={i} alt="christmas tree" className="logo-image" src={tree}
                            style={{ zIndex: zIndices[i] }}>
                        </img>
                    );
                })
            }
        </div>
    );
}

export default Logo;