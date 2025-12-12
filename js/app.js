/*-------------------------------- Constants --------------------------------*/
const attemptsElements = document.querySelectorAll('.attempt')
const timerElement = document.querySelector('#timer')
const currentLevelElement = document.querySelector('#current-level')
const sqrElements = document.querySelectorAll('.sqr')
const landingPageElement = document.querySelector('#landing-page')
const startElement = document.querySelector('#start')
const theGameElement = document.querySelector('#the-game')
const highScreenMessageElement = document.querySelector('#l-Screen-message')


/*---------------------------- Variables (state) ----------------------------*/

let currentLevel = 1;
let lives = 3;
let timer = 15;
let baseTimer = 15;
let roundInterval
let moleAppear
let moleDisAppear
let minAppear = 1.2;
let maxAppear = 2;
let moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear;
const moleSqrs = [{}, {}, {}, {}, {}, {}, {}, {}, {}]

/*------------------------ Cached Element References ------------------------*/



/*-------------------------------- Functions --------------------------------*/

function startGame()
{
    landingPageElement.style.display = "none"
    startElement.style.display = "none"
    highScreenMessageElement.style.display = "none"
    if(startElement.textContent === "Next Level")
    {
        console.log("next Level")
        levelUp()
    }
    else if (startElement.textContent === "Play Again")
    {
        for(let attempt of attemptsElements)
            attempt.src = "./img/NooN1.png"

        resetGame()
    }
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
        moleSqr = Math.floor(Math.random() * 9)
        //console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        sqrElements[moleSqr].textContent = "X"
        moleSqrs[moleSqr].timeOut = setTimeout(() => {
            wrongHit()
            sqrElements[moleSqr].textContent = ""
            //console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }
    else
    {
        sqrElements[moleSqr].textContent = "X"
        //console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        sqrElements[moleSqr].textContent = "X"
        moleSqrs[moleSqr].timeOut = setTimeout(() => {
            wrongHit()
            sqrElements[moleSqr].textContent = ""
            //console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }

}   

function hit(event)
{
    if(event.target.textContent === "X")
    {
        event.target.textContent = ''
        clearTimeout(moleSqrs[event.target.id].timeOut)
        console.log("HITT")
    }
    else
    {
        wrongHit()
        console.log(lives)
    }
}

function levelUp()
{
    //update timer and choose speed range of showing the moles
    timer = baseTimer + 15;
    baseTimer = timer;
    minAppear -= 0.1;
    maxAppear -= 0.2;
    moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear
    currentLevel += 1

}

//Timer funtion
function timerDec()
{
    timerElement.textContent = `Time Left ${timer -= 1}s`
}


function wrongHit()
{
    //check if user out of lives and lose game
    lives -= 1;
    attemptsElements[lives].src = "./img/EeeE1.png"

    if(lives <= 0 )
    {
        gameLost()
    }
}

function gameLost()
{
    landingPageElement.style.display = "block"
    startElement.style.display = "block"
    highScreenMessageElement.style.display = "block"
    startElement.textContent = "Play Again"
    highScreenMessageElement.textContent = "You Lost"
    highScreenMessageElement.style.color = "Red"
    clearInterval(roundInterval)
    clearInterval(moleAppear)
}
function betweenLevels()
{
    landingPageElement.style.display = "block"
    startElement.style.display = "block"
    highScreenMessageElement.style.display = "block"
    highScreenMessageElement.textContent = "Nice"
    startElement.textContent = "Next Level"
    clearInterval(roundInterval)
    clearInterval(moleAppear)
}

function randomAppearAndHidePeriod()
{
    return 0.3 + Math.random() * (maxAppear - minAppear) + minAppear
}

function resetGame()
{
    minAppear = 1.2;
    maxAppear = 2;
    currentLevel = 0;
    lives = 3;
    timer = 15;
    baseTimer = 15
}

/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)

for(let sqr of sqrElements)
{
    sqr.addEventListener('click', hit)
}