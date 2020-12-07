import React, { useEffect, useState } from 'react';
import Podium from './Podium.js';
import Table from './Table.js';
import Logo from './Logo.js';
import Graph from './Graph.js';
import './tailwind.output.css';

const sendHTTPRequest = (setPlayers, setTop3) => {
  const http = new XMLHttpRequest();
  const url = "http://localhost:8080/"; //! Update the url
  const colors = ["red", "white", "green"];
  http.open("GET", url);
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
      try {
        const json = JSON.parse(http.responseText);
        const p = [];
        for (const member in json.members) {
          p.push(json.members[member]);
        }
        p.sort((a, b) => {
          const als = +a.local_score;
          const bls = +b.local_score;
          return als > bls ? -1 : bls === als ? 0 : 1;
        })
        const top3 = p.slice(0, 3).map((e, i) => {
          return { name: e.name, local_score: e.local_score, backgroundColor: colors[i] }
        });
        const tmp = top3[0];
        top3[0] = top3[1];
        top3[1] = tmp;
        setTop3(top3);
        setPlayers(p);
      }
      catch (error) {
        //! Ping the server, the error
        console.log(error);
      }
    }
  }
  http.send();
}
function App() {
  const maxHeight = 100;
  const [players, setPlayers] = useState(null);
  const [top3Players, setTop3] = useState(null);
  useEffect(() => {
    sendHTTPRequest(setPlayers, setTop3);
  }, []);
  return (
    players ? <div>
      <div style={{ width: "100%" }}>Link to the competion website</div>
      <span>The code to join the competion</span>

      <Podium playerData={top3Players} maxHeight={maxHeight}></Podium>
      <Table players={players}></Table>
      <Graph members={players}></Graph>
    </div> : <Logo></Logo>
  );
}

export default App;
