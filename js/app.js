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
let minAppear = 1.2;
let maxAppear = 2;
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
    levelInterval = setInterval(timerDec, 1000);
    setTimeout(betweenLevels, timer * 1000);
}

function levelUp()
{
    //update timer and choose speed range of showing the moles
    timer += 15;
    minAppear -= 0.1;
    maxAppear -= 0.2;
    moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear
}

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
    clearInterval(levelInterval)
}

/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)