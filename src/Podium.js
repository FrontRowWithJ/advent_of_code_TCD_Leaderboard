import React from 'react';
import Bar from './Bar.js';
//props: top3
//       array of playerData of length 3
//       playerData = {name: "", local_score: ""}
//props: max_height

function Podium(props) {
    const maxHeight = props.maxHeight;
    const heights = props.playerData.map((e) => `${maxHeight * e.local_score / props.playerData[1].local_score}%`);
    
    return (<div id="podium" className="w-64 h-64 flex flex-row relative">
        {
            props.playerData.map((p, i) => {
                return <Bar name={p.name}
                    key={i}
                    left={`${35 * i}%`}
                    height={heights[i]}
                    backgroundColor={p.backgroundColor}
                    score={p.local_score}>
                </Bar>
            })
        }
    </div>);
}

export default Podium;