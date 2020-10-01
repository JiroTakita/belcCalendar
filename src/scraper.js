const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

const URL = 'https://www.belc.jp/product/calendar/'

async function scrape(now  = new Date()){
    /** @type {response} */
    const response = await fetch(URL)
    const text = await response.text()
    const { document } = new JSDOM(text).window
    const lists = document.querySelectorAll('ul.calendar__list')
    // date, saleName
    const events =  []
    Array.from(lists).map((list, index) => {
        const year = Number.parseInt(document.querySelector('.calendar__information:nth-of-type('+ (index + 1) +') .year').textContent, 10)
        const month = Number.parseInt(document.querySelector('.calendar__information:nth-of-type('+ (index + 1) +') .month').textContent, 10)
        const items = list.querySelectorAll('.calendar__item')
        Array.from(items).map(item => {
            const eventInfos = item.querySelectorAll('.calendar__eventinfo')
            if (eventInfos.length > 0){
                day = Number.parseInt(item.querySelector('.calendar__date .number').textContent, 10)
                Array.from(eventInfos).map(eventInfo => {
                    const saleName = eventInfo.textContent
                    const date = year + '-' + ('00' + month).slice(-2) + '-' + ('00' + day).slice(-2)
                    events.push({date, saleName})
                })
            }
        })

    })

    return events
}

module.exports = { scrape }