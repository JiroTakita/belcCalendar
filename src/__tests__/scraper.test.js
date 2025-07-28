const fetch = require('node-fetch')

const scraper = require('../scraper')

function html(year, ...months) {
    return `
    <div class="m-wdg-carouselCal__content swiper-wrapper" id="swiper-wrapper-23657312ea6a6e46" aria-live="polite">
    ${months
        .map(
            (month, i) =>`
            <div class="m-wdg-carouselCal__itm swiper-slide" role="group" aria-label="12 / 14">
                <div class="m-wdg-carouselCal__date">
                    <div class="m-wdg-carouselCal__dateInner" data-week="Fri">
                        <span class="m-wdg-carouselCal__dateDay">${String(month).padStart(2,'0')}/${String(i + 1).padStart(2,'0')}</span>
                        <span class="m-wdg-carouselCal__dateWeek">金</span>
                    </div>
                </div>
                <ul class="m-wdg-carouselCal__lst">
                    <li class="m-wdg-carouselCal__lstItm">
                        <span class="m-wdg-carouselCal__bullet" style="background-color: #ff0000"></span>
                        酒ポイント3倍
                    </li>
                </ul>
            </div>
            <div class="m-wdg-carouselCal__itm swiper-slide" role="group" aria-label="12 / 14">
                <div class="m-wdg-carouselCal__date">
                    <div class="m-wdg-carouselCal__dateInner" data-week="Fri">
                        <span class="m-wdg-carouselCal__dateDay">${String(month).padStart(2,'0')}/${String(i + 8).padStart(2,'0')}</span>
                        <span class="m-wdg-carouselCal__dateWeek">金</span>
                    </div>
                </div>
                <ul class="m-wdg-carouselCal__lst">
                    <li class="m-wdg-carouselCal__lstItm">
                        <span class="m-wdg-carouselCal__bullet" style="background-color: #ff0000"></span>
                        酒ポイント3倍
                    </li>
                </ul>
            </div>
            `
        ).join('')
    }
    </div>`.trim()
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
            expect(test).toEqual([year + "-" + String(month).padStart(2, '0') + "-01", year + "-" + String(month).padStart(2,'0') + "-08"])
        }
    })
})