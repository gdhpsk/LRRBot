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
        if(objectval.minimumPercent) {
            txt[0] = undefined
        }
        var list = []
        if(objectval.progresses) {
            var progs = []
            for(let i = 0; i < objectval.progresses.length; i++) {
                progs.push({
                   name: objectval.list[i].name,
                   percent: objectval.list[i].percent,
                   link: objectval.list[i].link,
                   hertz: objectval.list[i].hertz 
                })  
          }
            txt[1] = progs
        }
        for(let i = 0; i < objectval.list.length; i++) {
              list.push({
                 name: objectval.list[i].name,
                 link: objectval.list[i].link,
                 hertz: objectval.list[i].hertz 
              })  
        }
        obj.push({
            name: "Aronia",
            ytcode: objectval.ytcode,
            minimumPercent: txt[0],
            publisher: objectval.publisher,
            list: list,
            progresses: txt[1]
        })
    }
    return obj

}

module.exports = lol()
