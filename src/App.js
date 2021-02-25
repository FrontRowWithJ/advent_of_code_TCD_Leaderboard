import React, { useEffect, useState } from 'react';
import Podium from './Podium.js';
import Table from './Table.js';
import Logo from './Logo.js';
import Navbar from './Navbar.js'
const aocJSON = `{"event":"2020","owner_id":"1101602","members":{"1103249":{"completion_day_level":{"2":{"1":{"get_star_ts":"1606924387"},"2":{"get_star_ts":"1606925338"}},"1":{"1":{"get_star_ts":"1606916862"},"2":{"get_star_ts":"1606917108"}}},"last_star_ts":"1606925338","id":"1103249","stars":4,"name":"VitaliBorsak","global_score":0,"local_score":16},"1113313":{"local_score":0,"stars":0,"global_score":0,"name":"PavelPetrukhin","id":"1113313","last_star_ts":"0","completion_day_level":{}},"1139587":{"id":"1139587","completion_day_level":{"4":{"1":{"get_star_ts":"1607176653"}},"3":{"1":{"get_star_ts":"1607085734"},"2":{"get_star_ts":"1607086487"}},"2":{"2":{"get_star_ts":"1607030589"},"1":{"get_star_ts":"1607029837"}},"1":{"2":{"get_star_ts":"1607027380"},"1":{"get_star_ts":"1607026869"}}},"last_star_ts":"1607176653","local_score":30,"stars":7,"global_score":0,"name":"CianJinks"},"1101602":{"id":"1101602","last_star_ts":"0","completion_day_level":{},"local_score":0,"stars":0,"global_score":0,"name":"2ND-CS-TCD-2020"},"1142254":{"id":"1142254","last_star_ts":"0","completion_day_level":{},"local_score":0,"global_score":0,"stars":0,"name":"EimhinCampbellCarroll"},"1124659":{"stars":28,"global_score":0,"name":"dub","local_score":290,"last_star_ts":"1608068015","completion_day_level":{"10":{"1":{"get_star_ts":"1607592856"}},"11":{"1":{"get_star_ts":"1607689530"},"2":{"get_star_ts":"1607690820"}},"12":{"2":{"get_star_ts":"1607770550"},"1":{"get_star_ts":"1607767209"}},"9":{"2":{"get_star_ts":"1607504182"},"1":{"get_star_ts":"1607503189"}},"15":{"1":{"get_star_ts":"1608068015"}},"4":{"2":{"get_star_ts":"1607102713"},"1":{"get_star_ts":"1607099007"}},"2":{"1":{"get_star_ts":"1606954857"},"2":{"get_star_ts":"1606955284"}},"1":{"2":{"get_star_ts":"1607691292"},"1":{"get_star_ts":"1607691206"}},"7":{"1":{"get_star_ts":"1607334994"},"2":{"get_star_ts":"1607340470"}},"6":{"1":{"get_star_ts":"1607250266"},"2":{"get_star_ts":"1607250483"}},"13":{"2":{"get_star_ts":"1607901239"},"1":{"get_star_ts":"1607898145"}},"14":{"1":{"get_star_ts":"1607945727"},"2":{"get_star_ts":"1607948813"}},"8":{"1":{"get_star_ts":"1607419716"},"2":{"get_star_ts":"1607425100"}},"3":{"2":{"get_star_ts":"1606997522"},"1":{"get_star_ts":"1606996781"}},"5":{"1":{"get_star_ts":"1607161464"},"2":{"get_star_ts":"1607161615"}}},"id":"1124659"},"1030712":{"last_star_ts":"1607251153","completion_day_level":{"4":{"1":{"get_star_ts":"1607064523"},"2":{"get_star_ts":"1607066873"}},"5":{"2":{"get_star_ts":"1607164931"},"1":{"get_star_ts":"1607164540"}},"3":{"2":{"get_star_ts":"1606993426"},"1":{"get_star_ts":"1606992095"}},"2":{"1":{"get_star_ts":"1606916668"},"2":{"get_star_ts":"1606916916"}},"1":{"2":{"get_star_ts":"1606833374"},"1":{"get_star_ts":"1606833297"}},"6":{"1":{"get_star_ts":"1607250478"},"2":{"get_star_ts":"1607251153"}}},"id":"1030712","name":"ConnBreathnach","stars":12,"global_score":0,"local_score":110},"1077499":{"id":"1077499","last_star_ts":"1609220850","completion_day_level":{"23":{"1":{"get_star_ts":"1608936527"},"2":{"get_star_ts":"1608940670"}},"18":{"2":{"get_star_ts":"1608298677"},"1":{"get_star_ts":"1608298200"}},"9":{"2":{"get_star_ts":"1607534032"},"1":{"get_star_ts":"1607532086"}},"20":{"1":{"get_star_ts":"1609018630"}},"11":{"1":{"get_star_ts":"1607716309"},"2":{"get_star_ts":"1607728789"}},"22":{"2":{"get_star_ts":"1608927798"},"1":{"get_star_ts":"1608913688"}},"25":{"1":{"get_star_ts":"1608875146"}},"10":{"2":{"get_star_ts":"1607644617"},"1":{"get_star_ts":"1607577682"}},"3":{"2":{"get_star_ts":"1607011155"},"1":{"get_star_ts":"1607001632"}},"7":{"2":{"get_star_ts":"1607342324"},"1":{"get_star_ts":"1607339086"}},"2":{"1":{"get_star_ts":"1606910895"},"2":{"get_star_ts":"1606911827"}},"6":{"2":{"get_star_ts":"1607236409"},"1":{"get_star_ts":"1607234666"}},"1":{"2":{"get_star_ts":"1606870629"},"1":{"get_star_ts":"1606869474"}},"19":{"1":{"get_star_ts":"1609217483"},"2":{"get_star_ts":"1609220850"}},"4":{"1":{"get_star_ts":"1607086037"},"2":{"get_star_ts":"1607105130"}},"15":{"1":{"get_star_ts":"1608019413"},"2":{"get_star_ts":"1608019625"}},"12":{"2":{"get_star_ts":"1607784910"},"1":{"get_star_ts":"1607779967"}},"21":{"1":{"get_star_ts":"1608883402"},"2":{"get_star_ts":"1608883884"}},"17":{"2":{"get_star_ts":"1608251570"},"1":{"get_star_ts":"1608233871"}},"24":{"1":{"get_star_ts":"1608948607"},"2":{"get_star_ts":"1608957912"}},"5":{"2":{"get_star_ts":"1607193423"},"1":{"get_star_ts":"1607192066"}},"16":{"2":{"get_star_ts":"1608121271"},"1":{"get_star_ts":"1608114933"}},"8":{"2":{"get_star_ts":"1607406543"},"1":{"get_star_ts":"1607405419"}},"14":{"1":{"get_star_ts":"1607949399"},"2":{"get_star_ts":"1607953698"}},"13":{"2":{"get_star_ts":"1607840511"},"1":{"get_star_ts":"1607836860"}}},"local_score":532,"stars":48,"name":"HaroldKaribiye","global_score":0},"1048539":{"local_score":50,"name":"FrontRowWithJ","stars":6,"global_score":0,"id":"1048539","completion_day_level":{"3":{"1":{"get_star_ts":"1606975089"},"2":{"get_star_ts":"1606975666"}},"1":{"1":{"get_star_ts":"1606844544"},"2":{"get_star_ts":"1606844770"}},"2":{"1":{"get_star_ts":"1606907247"},"2":{"get_star_ts":"1606907952"}}},"last_star_ts":"1606975666"},"1148994":{"id":"1148994","completion_day_level":{"8":{"1":{"get_star_ts":"1607715217"},"2":{"get_star_ts":"1607715555"}},"5":{"2":{"get_star_ts":"1607363861"},"1":{"get_star_ts":"1607363277"}},"3":{"1":{"get_star_ts":"1607027305"},"2":{"get_star_ts":"1607033464"}},"7":{"1":{"get_star_ts":"1607375485"},"2":{"get_star_ts":"1607376465"}},"2":{"2":{"get_star_ts":"1607024869"},"1":{"get_star_ts":"1607023453"}},"6":{"2":{"get_star_ts":"1607370729"},"1":{"get_star_ts":"1607368780"}},"1":{"2":{"get_star_ts":"1607020630"},"1":{"get_star_ts":"1607020469"}},"9":{"2":{"get_star_ts":"1607718818"},"1":{"get_star_ts":"1607717669"}},"4":{"2":{"get_star_ts":"1607103210"},"1":{"get_star_ts":"1607099458"}},"10":{"1":{"get_star_ts":"1607719243"},"2":{"get_star_ts":"1607719930"}},"11":{"1":{"get_star_ts":"1607721017"}}},"last_star_ts":"1607721017","local_score":148,"stars":21,"name":"JohnWesleyK","global_score":0},"458671":{"last_star_ts":"1608315778","completion_day_level":{"10":{"2":{"get_star_ts":"1607618357"},"1":{"get_star_ts":"1607614345"}},"11":{"2":{"get_star_ts":"1607740873"},"1":{"get_star_ts":"1607696131"}},"9":{"2":{"get_star_ts":"1607613108"},"1":{"get_star_ts":"1607521078"}},"18":{"2":{"get_star_ts":"1608315778"},"1":{"get_star_ts":"1608311748"}},"1":{"2":{"get_star_ts":"1606853024"},"1":{"get_star_ts":"1606852766"}},"6":{"2":{"get_star_ts":"1607264785"},"1":{"get_star_ts":"1607263988"}},"7":{"2":{"get_star_ts":"1607351558"},"1":{"get_star_ts":"1607350703"}},"2":{"2":{"get_star_ts":"1606917857"},"1":{"get_star_ts":"1606916738"}},"3":{"1":{"get_star_ts":"1607100034"},"2":{"get_star_ts":"1607100443"}},"17":{"2":{"get_star_ts":"1608262731"},"1":{"get_star_ts":"1608262304"}},"12":{"1":{"get_star_ts":"1607782641"},"2":{"get_star_ts":"1607785222"}},"15":{"2":{"get_star_ts":"1608248061"},"1":{"get_star_ts":"1608247877"}},"4":{"1":{"get_star_ts":"1607103726"},"2":{"get_star_ts":"1607110872"}},"13":{"2":{"get_star_ts":"1608229304"},"1":{"get_star_ts":"1608225694"}},"14":{"1":{"get_star_ts":"1608237829"},"2":{"get_star_ts":"1608241428"}},"16":{"1":{"get_star_ts":"1608253215"},"2":{"get_star_ts":"1608257396"}},"8":{"1":{"get_star_ts":"1607432679"},"2":{"get_star_ts":"1607435021"}},"5":{"1":{"get_star_ts":"1607173768"},"2":{"get_star_ts":"1607175298"}}},"id":"458671","global_score":0,"stars":36,"name":"OliverFrank","local_score":329},"1019916":{"stars":45,"name":"AnH0ang","global_score":0,"local_score":534,"last_star_ts":"1608907312","completion_day_level":{"23":{"1":{"get_star_ts":"1608725778"}},"18":{"2":{"get_star_ts":"1608321688"},"1":{"get_star_ts":"1608320027"}},"9":{"2":{"get_star_ts":"1607513944"},"1":{"get_star_ts":"1607513266"}},"11":{"2":{"get_star_ts":"1607683964"},"1":{"get_star_ts":"1607682492"}},"22":{"1":{"get_star_ts":"1608639106"},"2":{"get_star_ts":"1608643145"}},"25":{"1":{"get_star_ts":"1608907312"}},"10":{"2":{"get_star_ts":"1607594679"},"1":{"get_star_ts":"1607593747"}},"3":{"1":{"get_star_ts":"1606987346"},"2":{"get_star_ts":"1606988218"}},"6":{"1":{"get_star_ts":"1607250000"},"2":{"get_star_ts":"1607250550"}},"2":{"2":{"get_star_ts":"1606901921"},"1":{"get_star_ts":"1606901162"}},"1":{"2":{"get_star_ts":"1606830535"},"1":{"get_star_ts":"1606830064"}},"7":{"2":{"get_star_ts":"1607336678"},"1":{"get_star_ts":"1607335290"}},"4":{"2":{"get_star_ts":"1607073760"},"1":{"get_star_ts":"1607072511"}},"19":{"1":{"get_star_ts":"1608593298"}},"15":{"2":{"get_star_ts":"1608027528"},"1":{"get_star_ts":"1608027488"}},"12":{"1":{"get_star_ts":"1607766184"},"2":{"get_star_ts":"1607767615"}},"21":{"2":{"get_star_ts":"1608569337"},"1":{"get_star_ts":"1608568049"}},"24":{"2":{"get_star_ts":"1608905418"},"1":{"get_star_ts":"1608904320"}},"17":{"2":{"get_star_ts":"1608205781"},"1":{"get_star_ts":"1608205481"}},"5":{"2":{"get_star_ts":"1607161442"},"1":{"get_star_ts":"1607160280"}},"8":{"2":{"get_star_ts":"1607420808"},"1":{"get_star_ts":"1607418716"}},"16":{"1":{"get_star_ts":"1608140181"},"2":{"get_star_ts":"1608159527"}},"14":{"2":{"get_star_ts":"1607941652"},"1":{"get_star_ts":"1607940602"}},"13":{"1":{"get_star_ts":"1607856582"},"2":{"get_star_ts":"1607857897"}}},"id":"1019916"},"1156873":{"local_score":127,"name":"EmmetMorrin","stars":15,"global_score":0,"id":"1156873","last_star_ts":"1607780981","completion_day_level":{"8":{"2":{"get_star_ts":"1607440508"},"1":{"get_star_ts":"1607439236"}},"5":{"2":{"get_star_ts":"1607190872"},"1":{"get_star_ts":"1607188724"}},"6":{"1":{"get_star_ts":"1607259409"},"2":{"get_star_ts":"1607259649"}},"7":{"2":{"get_star_ts":"1607350451"},"1":{"get_star_ts":"1607349896"}},"1":{"1":{"get_star_ts":"1607779572"},"2":{"get_star_ts":"1607780981"}},"9":{"2":{"get_star_ts":"1607529586"},"1":{"get_star_ts":"1607528453"}},"4":{"2":{"get_star_ts":"1607089209"},"1":{"get_star_ts":"1607084222"}},"10":{"1":{"get_star_ts":"1607602627"}}}}}}`;
const sendHTTPRequest = (setPlayers, setTop3) => {
  // const http = new XMLHttpRequest();
  // const url = "https://murmuring-river-84813.herokuapp.com/";
  // http.open("GET", url);
  // http.onreadystatechange = () => {
  const colors = ["red", "white", "green"];
  // if (http.readyState === XMLHttpRequest.DONE) {
  //   try {
  // const json = JSON.parse(http.responseText);
  const json = JSON.parse(aocJSON);
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
    background: "#0192B1",
    boxShadow: "inset 20px 20px 60px #017c96, inset -20px -20px 60px #01a8cc",
  };
  setTop3(top3);
  setPlayers(p);
}
//       catch (error) {
//   //! Ping the server, the error
//   console.log(error);
// }
//     }
//   }
// http.send();x
// }
const App = () => {
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
