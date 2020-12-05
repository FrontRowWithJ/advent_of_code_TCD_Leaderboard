import React, { useEffect, useState, useRef } from 'react';
import Podium from './Podium.js';
import Table from './Table.js';
import Logo from './Logo.js';
import './tailwind.output.css';



const sendHTTPRequest = (setStatus, players, playerData) => {
  const http = new XMLHttpRequest();
  const url = "http://localhost:8080/";
  const colors = ["red", "white", "green"];
  http.open("GET", url);
  http.onreadystatechange = () => {
    if (http.readyState === XMLHttpRequest.DONE) {
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
      playerData.current = p.slice(0, 3).map((e, i) => {
        return { name: e.name, local_score: e.local_score, backgroundColor: colors[i] }
      });
      players.current = p;
      const tmp = playerData.current[0];
      playerData.current[0] = playerData.current[1];
      playerData.current[1] = tmp;
      setStatus(true);
    }
  }
  http.send();
}
function App() {
  const maxHeight = 100;
  const players = useRef();
  const [status, setStatus] = useState(false);
  const playerData = useRef();
  useEffect(() => {
    sendHTTPRequest(setStatus, players, playerData);
  }, []);
  return (
    status ? <div>
      <div style={{ width: "100%" }}>Link to the competion website</div>
      <span>The code to join the competion</span>
      <Logo></Logo>
      <Podium playerData={playerData.current} maxHeight={maxHeight}></Podium>
      <Table players={players.current}></Table>

    </div> : <div>...loading</div>
  );
}

export default App;
