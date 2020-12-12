import React from 'react';
import './StarGrid.css';
import './table.css';
import Star from "./Star.js";
//props: players: object array of all participants, ordered by position.
//       object = {name, local_score, completion_day_level}
//       completion_day_level will contain star data
const Table = (props) => {
    const completion_day_levels = props.players.map((player) => player.completion_day_level);
    return (
        <div id="table-container">
            <table>
                <thead>
                    <tr id="table-head">
                        <th>Position</th>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Stars</th>
                    </tr>
                </thead>
                <tbody>
                    {props.players.map((player, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.local_score}</td>
                                <td>
                                    <StarGrid csl={completion_day_levels[i]}></StarGrid>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>);
}

//props: csl
const StarGrid = (props) => {
    const colors = ["red", "white", "green"];
    const stars = [];
    for (let i = 1; i <= 25; i++)
        stars.push(props.csl[i + ""]);
    return (
        <div className="star-grid">
            {
                stars.map((star, i) => {
                    return (
                        <div key={i} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gridColumnStart: i + 1,
                            gridColumnEnd: i + 2,
                            gridRowStart: 1,
                            gridRowEnd: 2,
                        }}>
                            <Star fill={star ? (star["1"] ? colors[i % 3] : "gray") : "gray"}></Star>
                        </div>
                    );
                })}
            {
                stars.map((star, i) => {
                    return (
                        <div key={i} style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gridColumnStart: i + 1,
                            gridColumnEnd: i + 2,
                            gridRowStart: 2,
                            gridRowEnd: 3
                        }}>
                            <Star fill={star ? (star["2"] ? colors[i % 3] : "gray") : "gray"}></Star>
                        </div>
                    );
                })}
        </div>
    );
}


export default Table;