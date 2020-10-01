const { scrape } = require('./scraper')
const { write } = require('./writer')

;(async () => {
    const events = (await scrape().catch(err => console.error(err))) || []
    if(events.length == 0){
        process.exit(1)
    }
    //console.log('Scrape', ... events)
    write(events)
})()