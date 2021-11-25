const got = require("got")
const fetch = require("node-fetch")
var obj = []

let lol = async () => {
    const body = {a: 1};

    const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    return JSON.stringify(data["Caution"].list)
}

var txt = `${lol()}`
module.exports = txt
