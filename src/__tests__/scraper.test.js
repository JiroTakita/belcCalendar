const fetch = require('node-fetch')

const scraper = require('../scraper')

function html(year, ...months) {
    return `
    <section class="calendar">
	<header class="heading">
		<h1 class="heading--design1">お得カレンダー</h1>
    </header>
    ${months
        .map(
            (month, i) =>`
	        <div class="calendar__information"><span class="year">${year}</span>年<span class="month">${month}</span>月<span class="info">毎日夕市開催中！</span></div>
	        <ul class="calendar__list">
		        <li class="calendar__item">
			        <div class="calendar__date">
				        <span class="number">${i + 1}</span><br><span class="dow">日曜日</span>
			        </div>
			        <ul class="calendar__eventlist">
				        <li class="calendar__eventitem"><span class="calendar__eventicon" style="background-color:#ffd900;"></span><span class="calendar__eventinfo">たまごの日</span></li>
			        </ul>
		        </li>
	        </ul>
	        <div class="calendar__information"><span class="year">${year}</span>年<span class="month">${month}</span>月<span class="info">毎日夕市開催中！</span></div>
	        <ul class="calendar__list">
		        <li class="calendar__item">
			        <div class="calendar__date">
				        <span class="number">${i + 8}</span><br><span class="dow">日曜日</span>
			        </div>
			        <ul class="calendar__eventlist">
				        <li class="calendar__eventitem"><span class="calendar__eventicon" style="background-color:#ffd900;"></span><span class="calendar__eventinfo">ポイント２倍デー</span></li>
			        </ul>
		        </li>
            </ul>`
        ).join('')
    }
</selction>`.trim()
}

const year = new Date().getFullYear()

describe('.scrape()', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })
    it('extracts sale dates in a month', async() => {
        const months = [1, 2, 11, 12]
        for(const month of months){
            fetch.once(html(year, month))
            const events = await scraper.scrape(new Date(year, month -1))
            const test = new Array()
            events.forEach(event =>{
                test.push(event.date)
            })
            expect(test).toEqual([year + "-"+ ('00' + month).slice(-2) + "-01", year + "-" + ('00' + month).slice(-2) + "-08"])
        }
    })
})