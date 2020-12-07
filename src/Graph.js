import React, { useEffect } from 'react';
import drawGraph from './drawGraphToCanvas.js';
import './graph.css'
// const data = { "members": { "1048539": { "completion_day_level": { "1": { "1": { "get_star_ts": "1606844544" }, "2": { "get_star_ts": "1606844770" } }, "3": { "2": { "get_star_ts": "1606975666" }, "1": { "get_star_ts": "1606975089" } }, "2": { "2": { "get_star_ts": "1606907952" }, "1": { "get_star_ts": "1606907247" } } }, "name": "FrontRowWithJ", "last_star_ts": "1606975666", "stars": 6, "id": "1048539", "local_score": 42, "global_score": 0 }, "1101602": { "name": "2ND-CS-TCD-2020", "completion_day_level": {}, "last_star_ts": 0, "stars": 0, "global_score": 0, "local_score": 0, "id": "1101602" }, "1156873": { "name": "Emmet Morrin", "completion_day_level": { "4": { "2": { "get_star_ts": "1607089209" }, "1": { "get_star_ts": "1607084222" } } }, "last_star_ts": "1607089209", "global_score": 0, "local_score": 18, "id": "1156873", "stars": 2 }, "1124659": { "completion_day_level": { "4": { "2": { "get_star_ts": "1607102713" }, "1": { "get_star_ts": "1607099007" } }, "2": { "2": { "get_star_ts": "1606955284" }, "1": { "get_star_ts": "1606954857" } }, "5": { "2": { "get_star_ts": "1607161615" }, "1": { "get_star_ts": "1607161464" } }, "3": { "1": { "get_star_ts": "1606996781" }, "2": { "get_star_ts": "1606997522" } } }, "last_star_ts": "1607161615", "name": "dub", "stars": 8, "local_score": 66, "global_score": 0, "id": "1124659" }, "1139587": { "name": "Cian Jinks", "completion_day_level": { "2": { "2": { "get_star_ts": "1607030589" }, "1": { "get_star_ts": "1607029837" } }, "4": { "1": { "get_star_ts": "1607176653" } }, "1": { "2": { "get_star_ts": "1607027380" }, "1": { "get_star_ts": "1607026869" } }, "3": { "2": { "get_star_ts": "1607086487" }, "1": { "get_star_ts": "1607085734" } } }, "last_star_ts": "1607176653", "stars": 7, "global_score": 0, "local_score": 28, "id": "1139587" }, "1103249": { "stars": 4, "id": "1103249", "local_score": 16, "global_score": 0, "completion_day_level": { "2": { "1": { "get_star_ts": "1606924387" }, "2": { "get_star_ts": "1606925338" } }, "1": { "1": { "get_star_ts": "1606916862" }, "2": { "get_star_ts": "1606917108" } } }, "name": "Vitali Borsak", "last_star_ts": "1606925338" }, "1019916": { "name": "AnH0ang", "completion_day_level": { "5": { "2": { "get_star_ts": "1607161442" }, "1": { "get_star_ts": "1607160280" } }, "1": { "1": { "get_star_ts": "1606830064" }, "2": { "get_star_ts": "1606830535" } }, "3": { "1": { "get_star_ts": "1606987346" }, "2": { "get_star_ts": "1606988218" } }, "4": { "2": { "get_star_ts": "1607073760" }, "1": { "get_star_ts": "1607072511" } }, "2": { "2": { "get_star_ts": "1606901921" }, "1": { "get_star_ts": "1606901162" } } }, "last_star_ts": "1607161442", "id": "1019916", "local_score": 84, "global_score": 0, "stars": 10 }, "1030712": { "stars": 10, "id": "1030712", "local_score": 76, "global_score": 0, "name": "Conn Breathnach", "completion_day_level": { "1": { "1": { "get_star_ts": "1606833297" }, "2": { "get_star_ts": "1606833374" } }, "3": { "2": { "get_star_ts": "1606993426" }, "1": { "get_star_ts": "1606992095" } }, "5": { "2": { "get_star_ts": "1607164931" }, "1": { "get_star_ts": "1607164540" } }, "4": { "2": { "get_star_ts": "1607066873" }, "1": { "get_star_ts": "1607064523" } }, "2": { "1": { "get_star_ts": "1606916668" }, "2": { "get_star_ts": "1606916916" } } }, "last_star_ts": "1607164931" }, "1148994": { "completion_day_level": { "4": { "2": { "get_star_ts": "1607103210" }, "1": { "get_star_ts": "1607099458" } }, "2": { "1": { "get_star_ts": "1607023453" }, "2": { "get_star_ts": "1607024869" } }, "1": { "2": { "get_star_ts": "1607020630" }, "1": { "get_star_ts": "1607020469" } }, "3": { "2": { "get_star_ts": "1607033464" }, "1": { "get_star_ts": "1607027305" } } }, "name": "JohnWesleyK", "last_star_ts": "1607103210", "stars": 8, "id": "1148994", "global_score": 0, "local_score": 40 }, "1113313": { "completion_day_level": {}, "name": "Pavel Petrukhin", "last_star_ts": 0, "global_score": 0, "local_score": 0, "id": "1113313", "stars": 0 }, "1142254": { "completion_day_level": {}, "last_star_ts": 0, "name": "Eimhin Campbell Carroll", "local_score": 0, "global_score": 0, "id": "1142254", "stars": 0 } }, "event": "2020", "owner_id": "1101602" };

const START_DATE = 1606780800;
const DAY_IN_SECONDS = 86400;

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
//props: members
function Graph(props) {

    const starTimes = Object.keys(props.members).map((member) => {
        const cdls = props.members[member].completion_day_level;
        return {
            name: props.members[member].name, starTimes: Object.keys(cdls).flatMap((cdl) => {
                return Object.keys(cdls[cdl]).map((starIndex) => {
                    return +cdls[cdl][starIndex].get_star_ts;
                })
            })
        }
    });
    const numOfDays = ((Date.now() / 1000 | 0) - START_DATE) / DAY_IN_SECONDS;
    const result = starTimes.map((t) => {
        const psf = [];
        for (let i = 0; i < numOfDays; i++) {
            psf.push(t.starTimes.filter((time) => (time - START_DATE) <= DAY_IN_SECONDS * (i + 1)).length);
        }
        return {
            name: t.name,
            pointsSoFar: psf
        }
    });

    useEffect(() => {
        const canvas = document.getElementById("graph-canvas");
        drawGraph(result, canvas);
        window.onresize = () => drawGraph(result, canvas);
        return () => window.onresize = null;
    }, [result]);


    return (
        <div>
            <div>
                <canvas id="graph-canvas"></canvas>
            </div>
            <div className="graph-label-contaienr">
                {
                    result.map((player, i) => {
                        return <div key={i}>
                            <div className="graph-label" style={{ backgroundColor: colorArray[i] }}></div>
                            <div className="label-text" style={{ color: "white", backgroundColor: colorArray[i] }}>{player.name}</div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default Graph;