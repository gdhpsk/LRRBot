const got = require("got")
var obj = []
var lol = () => {
    got("https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json").then(response => {
        for(let i = 0; i < 8; i++) {
            obj.push({number: i})
        }
    })
    return "KK"
}   

/*for(const key in levels) {
                var objectval = levels[key]
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
            }*/
/*got("https://gdlrrlistcf-4.gdhpsk.repl.co/JS/extended.json").then(response => {
    var levels = JSON.parse(response.body)
    for(const key in levels) {
        var objectval = levels[key]
        var txt = [`${objectval.minimumPercent}`, undefined]
        if(objectval.minimumPercent) {
            txt[0] = undefined
        }
        var list = []
        for(let i = 0; i < objectval.list.length; i++) {
              list.push({
                 name: objectval.list[i].name,
                 link: objectval.list[i].link,
                 hertz: objectval.list[i].hertz 
              })  
        }
        obj.push({
            name: objectval.name,
            ytcode: objectval.ytcode,
            minimumPercent: txt[0],
            publisher: objectval.publisher,
            list: objectval.list
        })
    }
})

got("https://gdlrrlistcf-4.gdhpsk.repl.co/JS/legacy.json").then(response => {
    var levels = JSON.parse(response.body)
    for(const key in levels) {
        var objectval = levels[key]
        var txt = [`${objectval.minimumPercent}`, undefined]
        if(objectval.minimumPercent) {
            txt[0] = undefined
        }
        var list = []
        for(let i = 0; i < objectval.list.length; i++) {
              list.push({
                 name: objectval.list[i].name,
                 link: objectval.list[i].link,
                 hertz: objectval.list[i].hertz 
              })  
        }
        obj.push({
            name: objectval.name,
            ytcode: objectval.ytcode,
            minimumPercent: txt[0],
            publisher: objectval.publisher,
            list: objectval.list
        })
    }
})*/
module.exports = lol()
