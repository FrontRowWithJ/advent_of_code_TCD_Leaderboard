const https = require("follow-redirects").https;
const http = require("http");
const fs = require("fs");
const FIFTEEN_MINUTES = 900; // 15 minutes is 900 s
const options = {
    protocol: "https:",
    hostname: "www.adventofcode.com",
    path: "/2020/leaderboard/private/view/1101602.json",
    method: "GET"
};

const listener = (req, res) => {
    res.writeHead(200, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain"
    });
    fs.readFile("./request.txt", "utf-8", (err, data) => {
        try {
            const json = JSON.parse(data);
            const last_request = json.last_request;
            const currentTime = (new Date().getTime() / 1000) | 0;
            if ((currentTime - last_request) < FIFTEEN_MINUTES) {
                send_leaderboard_data(json, res);
            } else {
                cache_request(res);
            }
        } catch (error) {
            cache_request(res);
        }
    });
};

function send_leaderboard_data(json, response) {
        response.end(JSON.stringify(json));

}

function cache_request(response) {
    const aoc_req = https.request(options, (aoc_res) => {
        aoc_res.setEncoding("utf-8");
        aoc_res.on("data", (chunk) => {
            const js = JSON.parse(chunk);
            js.last_request = (new Date().getTime() / 1000) | 0;
            fs.writeFile("./request.txt", JSON.stringify(js), { encoding: "utf-8" }, () => { });
            send_leaderboard_data(js, response);
        });
    });
    aoc_req.setHeader("Cookie", "GA1.2.1960122144.1606839746; _gid=GA1.2.1456622380.1606839746; session=53616c7465645f5f8d479650393eae0caa2588ee44b8c7b8fcb612e199abf9a3a4b46a980fa4866592bb9384bd620e5a");
    aoc_req.end();
}
const server = http.createServer(listener);
server.listen(8080);