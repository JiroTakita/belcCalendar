const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

const URL = 'https://new.belc.jp/shop/0070' //流山おおたかの森店

async function scrape(now = new Date()) {
    /** @type {response} */
    const response = await fetch(URL)
    const text = await response.text()
    const { document } = new JSDOM(text).window
    const lists = document.querySelectorAll('.m-wdg-carouselCal__itm')
console.log(lists.length)
    // date, saleName
    const events = []
    flag = false; // 年マタギフラグ
    Array.from(lists).map(item => {
        year = new Date();
        year = year.getFullYear();
        const eventInfo = item.querySelector('.m-wdg-carouselCal__lstItm')
        if (eventInfo != null) {
            month = item.querySelector('.m-wdg-carouselCal__dateDay').textContent.substring(0, 2)
            day = item.querySelector('.m-wdg-carouselCal__dateDay').textContent.substring(3, 5)
            if (month == "12") {
                flag = true;
            }
            if (month == "01" && flag == true) {
                year = year + 1
                flag = false;
            }

            const saleName = eventInfo.textContent.trim()
            const date = year + '-' + month + '-' + day
            console.log(saleName + " " + date);
            events.push({ date, saleName })

        }
    })


    return events
}

module.exports = { scrape }