import React, { useEffect, useState } from 'react';
import Podium from './Podium.js';
import Table from './Table.js';
import Logo from './Logo.js';
// import Graph from './Graph.js';
import Navbar from './Navbar.js'
import './tailwind.output.css';
import "./fittext.js"
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

        top3[1].style = {
          background: "#e41d67",
          boxShadow: "inset 20px 20px 60px #c21958, inset -20px -20px 60px #ff2176",
        };
        top3[0].style = {
          background: "#ff7c32",
          boxShadow: "inset 20px 20px 60px #d9692b, inset -20px -20px 60px #ff8f3a",
        };
        top3[2].style = {
          background: "#017d97",
          boxShadow: "inset 20px 20px 60px #016a80, inset -20px -20px 60px #0190ae",
        };
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
  const [players, setPlayers] = useState(null);
  const [top3Players, setTop3] = useState(null);
  useEffect(() => {
    sendHTTPRequest(setPlayers, setTop3);
  }, []);
  return (
    players ? <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      <Navbar
        top={<Table players={players}></Table>}
        bottom={<Podium playerData={top3Players}></Podium>}
      >
      </Navbar>

    </div> : <Logo></Logo>
  );
}

export default App;
