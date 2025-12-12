/*-------------------------------- Constants --------------------------------*/
const attemptsElements = document.querySelectorAll('.attempt')
const timerElement = document.querySelector('#timer')
const currentLevelElement = document.querySelector('#current-level')
const sqrElements = document.querySelectorAll('.sqr')
const landingPageElement = document.querySelector('#landing-page')
const startElement = document.querySelector('#start')
const theGameElement = document.querySelector('#the-game')


/*---------------------------- Variables (state) ----------------------------*/

let currentLevel = 0;
let lives = 3;
let timer = 15;
let roundInterval
let moleAppear
let moleDisAppear
let minAppear = 5.2;
let maxAppear = 9;
let moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear;


/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function startGame()
{
    landingPageElement.style.display = "none"
    startElement.style.display = "none"
    levelRunTime()
}

function levelRunTime()
{
    roundInterval = setInterval(timerDec, 1000);
    setTimeout(betweenLevels, timer * 1000);
    moleAppear = setInterval(showMole, moleSpeedRange * 1000)
}

function showMole()
{
    let moleSqr = Math.floor(Math.random() * 9)
    if(sqrElements[moleSqr].textContent === "X")
    {
        console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        sqrElements[moleSqr].textContent = "X"
        setTimeout(() => {
            sqrElements[moleSqr].textContent = ""
            console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }
    else
    {
        moleSqr = Math.floor(Math.random() * 9)
        sqrElements[moleSqr].textContent = "X"
        console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        sqrElements[moleSqr].textContent = "X"
        setTimeout(() => {
            sqrElements[moleSqr].textContent = ""
            console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }
    //moleDisAppear? = setTimeout(() => {
        
    //}, moleSpeedRange);
}   

function hit(event)
{
    event.textContent = 'x'
    if(event.textContent === "X")
    {
        event.textContent = ''
        console.log("HITT")
    }
    else
    {
        lives -= 1        
        console.log(lives)
    }
}

function levelUp()
{
    //update timer and choose speed range of showing the moles
    timer += 15;
    minAppear -= 0.1;
    maxAppear -= 0.2;
    moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear

}

//Timer funtion
function timerDec()
{
    timerElement.textContent = `Time Left ${timer -= 1}`
}

function nextLevel()
{
    //trigger levelUp => trigger round runtime => 
}

function wrongHit()
{
    //check if user out of lives and lose game
}

function betweenLevels()
{
    landingPageElement.style.display = "block"
    startElement.style.display = "block"
    clearInterval(roundInterval)
    clearInterval(moleAppear)
}

function randomAppearAndHidePeriod()
{
    return 0.3 + Math.random() * (maxAppear - minAppear) + minAppear
}

/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)

for(let sqr of sqrElements)
{
    sqr.addEventListener('click', hit)
}