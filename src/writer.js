const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')

function write(events) {
    const eventsByYear = {}
    Array.from(events).map(event => {
        const dates = event.date.split('-')
        const year = dates[0]
        const month = dates[1]
        if (!eventsByYear[year]){
            eventsByYear[year] = []
        }
        if(!eventsByYear[year][month]){
            eventsByYear[year][month] = []
        }
        const date = event.date
        const saleName = event.saleName
        eventsByYear[year][month].push({date, saleName})
       
    })
    for (const y of Object.keys(eventsByYear)){
        for (const m of Object.keys(eventsByYear[y])){
            appendEvent(y, m, eventsByYear[y][m])
        }
    }

}

function appendEvent(year, month, events){
    const filepath = path.join(__dirname, '..', 'event', `${year}-${month}.json`)
    const data = new Set(readDate(filepath))
    for (const event of events){
        const date = event.date
        const saleName = event.saleName
        flag = true
        Array.from(data).map(e => {
            if (e.date == date && e.saleName == saleName){
                flag = false
            }
        })
        if (flag) {
            data.add({date, saleName})
        }
    }
    writeData(filepath, Array.from(data).sort())
}

function readDate(filepath){
    if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'))
    }
    return []
}

function writeData(filepath, data){
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
    if(process.env.NODE_ENV != 'test'){
        console.log('Write', filepath)
    }
}

module.exports = { write }