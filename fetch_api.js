const fetch = require("node-fetch")
var obj = []
var object = new Object()

let lol = async (type) => {
    const body = {a: 1};
    if(type == "list") {
    const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/mainlist.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    const response2 = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data2 = await response2.json();
    const response3 = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/legacy.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data3 = await response3.json();
    
    for(const key in data) {
        var objectval = data[key]
        object[key] = {
            name: objectval.name,
            ytcode: objectval.ytcode,
            minimumPercent: objectval.minimumPercent,
            publisher: objectval.publisher,
            list: objectval.list,
            progresses: objectval.progresses
        } 
        continue;
    }
    for(const key in data2) {
        var objectval = data2[key]
        object[key] = {
            name: objectval.name,
            ytcode: objectval.ytcode,
            minimumPercent: 100,
            publisher: objectval.publisher,
            list: objectval.list
        }
        continue;
    }
    for(const key in data3) {
        var objectval = data3[key]
        object[key] = {
            name: objectval.name,
            ytcode: objectval.ytcode,
            minimumPercent: 100,
            publisher: objectval.publisher,
            list: objectval.list
        }
    }
    return object

} else if(type == "61plus") {
    const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/61plus.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    return data
} else if(type == "leaderboard") {
    const response = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/leaderboard.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    return data
}

}

module.exports = lol
