const spans = document.querySelectorAll('h1 span')

spans.forEach(index => index.addEventListener('mouseover', function(e){

    index.classList.add('animated', 'rubberBand')
} ))

spans.forEach(index => index.addEventListener('mouseout', function(e){

    index.classList.remove('animated', 'rubberBand')
} ))

const htmlBar = document.querySelector('.bar-html')
const cssBar = document.querySelector('.bar-css')
const jsBar = document.querySelector('.bar-javascript')
const reactBar = document.querySelector('.bar-react')
const mongoBar = document.querySelector('.bar-mongo')
const mysqlBar = document.querySelector('.bar-mysql')
const postgreBar = document.querySelector('.bar-postgre')
const djangoBar = document.querySelector('.bar-django')
const nodeBar = document.querySelector('.bar-node')
const sql1Bar = document.querySelector('.bar-sql1')
const sql2Bar = document.querySelector('.bar-sql2')
const sql3Bar = document.querySelector('.bar-sql3')
const ml1Bar = document.querySelector('.bar-ml1')
const ml2Bar = document.querySelector('.bar-ml2')
const ml3Bar = document.querySelector('.bar-ml3')
const ml4Bar = document.querySelector('.bar-ml4')
const rnBar = document.querySelector('.bar-rn')






//For the Skill Bars
var t1 = new TimelineLite()

t1.fromTo(htmlBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(95% - 6px)`, ease: Power4.easeout})
    .fromTo(cssBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(75% - 6px)`, ease: Power4.easeout})
    .fromTo(jsBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(90% - 6px)`, ease: Power4.easeout})
    .fromTo(reactBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(55% - 6px)`, ease: Power4.easeout})
    .fromTo(mongoBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(70% - 6px)`, ease: Power4.easeout})

    .fromTo(mysqlBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(65% - 6px)`, ease: Power4.easeout})
    .fromTo(postgreBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(70% - 6px)`, ease: Power4.easeout})
    .fromTo(djangoBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(60% - 6px)`, ease: Power4.easeout})
    .fromTo(nodeBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(40% - 6px)`, ease: Power4.easeout})

    .fromTo(sql1Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(85% - 6px)`, ease: Power4.easeout})
    .fromTo(sql2Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(95% - 6px)`, ease: Power4.easeout})
    .fromTo(sql3Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(78% - 6px)`, ease: Power4.easeout})

    .fromTo(ml1Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(45% - 6px)`, ease: Power4.easeout})
    .fromTo(ml2Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(45% - 6px)`, ease: Power4.easeout})
    .fromTo(ml3Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(45% - 6px)`, ease: Power4.easeout})
    .fromTo(ml4Bar, .75, {width: `calc(0% - 6px)`}, {width: `calc(45% - 6px)`, ease: Power4.easeout})
    .fromTo(rnBar, .75, {width: `calc(0% - 6px)`}, {width: `calc(45% - 6px)`, ease: Power4.easeout})
    
   


const controller = new ScrollMagic.Controller()
const scene = new ScrollMagic.Scene({
    triggerElement: '.skills',
    triggerHook: 0
}).setTween(t1).addTo(controller)


function showRequiredCategory(event) {

    const getId = event.id
    const links = document.querySelectorAll('.work-category button')
    for(i=0; i<links.length; i++){
        if(links[i].hasAttribute('class')){
            links[i].classList.remove('active')
        }
    }

    event.classList.add('active')
    const getCategory = document.querySelector(`.category-${getId}`)
    const categories = document.querySelectorAll('div[class^= "category-"]')

    for(i=0;i<categories.length; i++) {
        if(categories[i].hasAttribute('class')){
            categories[i].classList.remove('showCategory')
            categories[i].classList.add('hideCategory')
        }
    }

    getCategory.classList.remove('hideCategory')
    getCategory.classList.add('showCategory')

}