import React from 'react';
import Bar from './Bar.js';
import './podium.css'
//props: top3
//       array of playerData of length 3
//       playerData = {name: "", local_score: ""}
//props: max_height

function Podium(props) {
    const heights = props.playerData.map((e) => {
        return `${50 * e.local_score / props.playerData[1].local_score}%`
    });
    const lefts = ["2.5%", "35%", "67.5%"];
    return (<div id="podium">
        {
            props.playerData.map((p, i) => {
                return <Bar name={p.name}
                    key={i}
                    left={lefts[i]}
                    style={p.style}
                    height={heights[i]}
                    backgroundColor={p.backgroundColor}
                    score={p.local_score}>
                </Bar>
            })
        }
    </div>);
}

export default Podium;