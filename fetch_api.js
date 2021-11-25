const fetch = require("node-fetch")
var obj = []

let lol = async () => {
    const body = {a: 1};
    const response2 = await fetch('https://gdlrrlistcf-4.gdhpsk.repl.co/JS/mainlist.json', {
	    method: 'post',
	    body: JSON.stringify(body),
	    headers: {'Content-Type': 'application/json'}
    });
    const data2 = await response2.json();
    
    for(const key in data2) {
        var objectval = data2[key]
        var txt = [`${objectval.minimumPercent}`, undefined]
        obj.push({
            name: "Aronia",
            ytcode: objectval.ytcode,
            minimumPercent: objectval.minimumPercent,
            publisher: objectval.publisher,
            list: objectval.list,
            progresses: objectval.progresses
        })
    }
    return obj

}

module.exports = lol()
