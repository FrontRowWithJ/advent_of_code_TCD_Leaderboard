import React, { useState, useEffect, useRef } from 'react';
import drawGraph, { colorArray } from './graphGenerator.js';
import './graph.css'
// const data = { "members": { "1048539": { "completion_day_level": { "1": { "1": { "get_star_ts": "1606844544" }, "2": { "get_star_ts": "1606844770" } }, "3": { "2": { "get_star_ts": "1606975666" }, "1": { "get_star_ts": "1606975089" } }, "2": { "2": { "get_star_ts": "1606907952" }, "1": { "get_star_ts": "1606907247" } } }, "name": "FrontRowWithJ", "last_star_ts": "1606975666", "stars": 6, "id": "1048539", "local_score": 42, "global_score": 0 }, "1101602": { "name": "2ND-CS-TCD-2020", "completion_day_level": {}, "last_star_ts": 0, "stars": 0, "global_score": 0, "local_score": 0, "id": "1101602" }, "1156873": { "name": "Emmet Morrin", "completion_day_level": { "4": { "2": { "get_star_ts": "1607089209" }, "1": { "get_star_ts": "1607084222" } } }, "last_star_ts": "1607089209", "global_score": 0, "local_score": 18, "id": "1156873", "stars": 2 }, "1124659": { "completion_day_level": { "4": { "2": { "get_star_ts": "1607102713" }, "1": { "get_star_ts": "1607099007" } }, "2": { "2": { "get_star_ts": "1606955284" }, "1": { "get_star_ts": "1606954857" } }, "5": { "2": { "get_star_ts": "1607161615" }, "1": { "get_star_ts": "1607161464" } }, "3": { "1": { "get_star_ts": "1606996781" }, "2": { "get_star_ts": "1606997522" } } }, "last_star_ts": "1607161615", "name": "dub", "stars": 8, "local_score": 66, "global_score": 0, "id": "1124659" }, "1139587": { "name": "Cian Jinks", "completion_day_level": { "2": { "2": { "get_star_ts": "1607030589" }, "1": { "get_star_ts": "1607029837" } }, "4": { "1": { "get_star_ts": "1607176653" } }, "1": { "2": { "get_star_ts": "1607027380" }, "1": { "get_star_ts": "1607026869" } }, "3": { "2": { "get_star_ts": "1607086487" }, "1": { "get_star_ts": "1607085734" } } }, "last_star_ts": "1607176653", "stars": 7, "global_score": 0, "local_score": 28, "id": "1139587" }, "1103249": { "stars": 4, "id": "1103249", "local_score": 16, "global_score": 0, "completion_day_level": { "2": { "1": { "get_star_ts": "1606924387" }, "2": { "get_star_ts": "1606925338" } }, "1": { "1": { "get_star_ts": "1606916862" }, "2": { "get_star_ts": "1606917108" } } }, "name": "Vitali Borsak", "last_star_ts": "1606925338" }, "1019916": { "name": "AnH0ang", "completion_day_level": { "5": { "2": { "get_star_ts": "1607161442" }, "1": { "get_star_ts": "1607160280" } }, "1": { "1": { "get_star_ts": "1606830064" }, "2": { "get_star_ts": "1606830535" } }, "3": { "1": { "get_star_ts": "1606987346" }, "2": { "get_star_ts": "1606988218" } }, "4": { "2": { "get_star_ts": "1607073760" }, "1": { "get_star_ts": "1607072511" } }, "2": { "2": { "get_star_ts": "1606901921" }, "1": { "get_star_ts": "1606901162" } } }, "last_star_ts": "1607161442", "id": "1019916", "local_score": 84, "global_score": 0, "stars": 10 }, "1030712": { "stars": 10, "id": "1030712", "local_score": 76, "global_score": 0, "name": "Conn Breathnach", "completion_day_level": { "1": { "1": { "get_star_ts": "1606833297" }, "2": { "get_star_ts": "1606833374" } }, "3": { "2": { "get_star_ts": "1606993426" }, "1": { "get_star_ts": "1606992095" } }, "5": { "2": { "get_star_ts": "1607164931" }, "1": { "get_star_ts": "1607164540" } }, "4": { "2": { "get_star_ts": "1607066873" }, "1": { "get_star_ts": "1607064523" } }, "2": { "1": { "get_star_ts": "1606916668" }, "2": { "get_star_ts": "1606916916" } } }, "last_star_ts": "1607164931" }, "1148994": { "completion_day_level": { "4": { "2": { "get_star_ts": "1607103210" }, "1": { "get_star_ts": "1607099458" } }, "2": { "1": { "get_star_ts": "1607023453" }, "2": { "get_star_ts": "1607024869" } }, "1": { "2": { "get_star_ts": "1607020630" }, "1": { "get_star_ts": "1607020469" } }, "3": { "2": { "get_star_ts": "1607033464" }, "1": { "get_star_ts": "1607027305" } } }, "name": "JohnWesleyK", "last_star_ts": "1607103210", "stars": 8, "id": "1148994", "global_score": 0, "local_score": 40 }, "1113313": { "completion_day_level": {}, "name": "Pavel Petrukhin", "last_star_ts": 0, "global_score": 0, "local_score": 0, "id": "1113313", "stars": 0 }, "1142254": { "completion_day_level": {}, "last_star_ts": 0, "name": "Eimhin Campbell Carroll", "local_score": 0, "global_score": 0, "id": "1142254", "stars": 0 } }, "event": "2020", "owner_id": "1101602" };

const FIVE_HR_AHEAD = 60 * 60 * 5;
const START_DATE = Date.parse("01 Dec 2020") / 1000 + FIVE_HR_AHEAD;
const DAY_IN_SECONDS = 86400;

const enableDrag = (event, setMouseDown, setStartPos) => {
    setMouseDown(true);
    setStartPos({ x: event.pageX, y: event.pageY });
}

const drag = (e, isMouseDown, json, startPos, translate) => {
    if (isMouseDown) {
        const t = { x: translate.x + e.pageX - startPos.x, y: translate.y + e.pageY - startPos.y };
        drawGraph(json, e.target, t);
    }
}

const disableDrag = (e, isMouseDown, setMouseDown, translate, setTranslate, startPos) => {

    if (isMouseDown) {
        setMouseDown(false);
        const t = { x: translate.x + e.pageX - startPos.x, y: translate.y + e.pageY - startPos.y };
        setTranslate(t);
    }
}
//props: members
function Graph(props) {
    const [isMouseDown, setMouseDown] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const canvas = useRef(null);
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
    result.maxPoints = result[0].pointsSoFar[result[0].pointsSoFar.length - 1] + 1;
    result.maxDay = result[0].pointsSoFar.length + 1;
    useEffect(() => {
        const canvas = document.getElementById("graph-canvas");
        drawGraph(result, canvas, translate);
        window.onresize = () => drawGraph(result, canvas);
        [...document.getElementsByClassName("label-text")].forEach((e) => window.fitText(e, 0.75));
        return () => window.onresize = null;
    }, [result, translate]);
    return (
        <div id="graph-container">
            <div id="graph-visual">
                <canvas ref={canvas} style={{ backgroundColor: "red", width: "100%", height: "100%" }}
                    id="graph-canvas"
                    // Mouse events
                    onMouseDown={(e) => {
                        enableDrag(e, setMouseDown, setStartPos);
                    }}

                    onMouseMove={(e) => {
                        drag(e, isMouseDown, result, startPos, translate);
                    }}
                    onMouseUp={(e) => {
                        disableDrag(e, isMouseDown, setMouseDown, translate, setTranslate, startPos);
                    }}
                    // Touch events
                    onTouchStart={(e) => {
                        enableDrag(e, setMouseDown, setStartPos);
                    }}

                    onTouchMove={(e) => {
                        drag(e, isMouseDown, result, startPos, translate);
                    }}

                    onTouchEnd={(e) => {
                        disableDrag(e, isMouseDown, setMouseDown, translate, setTranslate, startPos);
                    }}
                    onWheel={(e) => {
                        const rect = canvas.current.getBoundingClientRect();
                        const x = e.clientX - rect.left
                        const y = e.clientY - rect.top
                        let scale = canvas.current.scale;
                        let left = (x - canvas.current._translate.x);
                        let top = (y - canvas.current._translate.y);
                        const factor = 1.05;
                        if (e.deltaY < 0) {
                            scale *= factor;
                            left = x - left * factor;
                            top = y - top * factor;
                        }
                        else if (scale / factor >= 0.1) {
                            scale /= factor;
                            left = x - left / factor;
                            top = y - top / factor;
                        }
                        setTranslate({ x: left, y: top });
                        drawGraph(result, canvas.current, { x: left, y: top }, scale);
                    }}>
                </canvas>
            </div>
            <div id="graph-text">
                {
                    result.map((player, i) => {
                        return (
                            <div className="graph-label-text-container" key={i}>
                                <div className="graph-label" style={{ backgroundColor: colorArray[i] }}></div>
                                <span className="label-text">{player.name}</span>
                            </div>)
                    })
                }
            </div>
        </div>
    );
}

export default Graph;