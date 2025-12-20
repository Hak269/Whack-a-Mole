/*-------------------------------- Constants --------------------------------*/
const attemptsElements = document.querySelectorAll('.attempt')
const timerElement = document.querySelector('#timer')
const currentLevelElement = document.querySelector('#current-level')
const sqrElements = document.querySelectorAll('.sqr')
const landingPageElement = document.querySelector('#landing-page')
const startElement = document.querySelector('#start')
const theGameElement = document.querySelector('#the-game')
const highScreenMessageElement = document.querySelector('#l-Screen-message')
const mole = document.querySelectorAll('.mole');


/*---------------------------- Variables (state) ----------------------------*/

let currentLevel = 1;
let lives = 3;
let timer = 7;
let baseTimer = 7;
let roundInterval
let roundTimeout
let moleAppear
let moleDisAppear
let minAppear = 1.2;
let maxAppear = 2;
let moleSpeedRange = 0.3 + Math.random() * (maxAppear - minAppear) + minAppear

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

    currentLevelElement.textContent = `Level ${currentLevel}/5`
    levelRunTime()
}

function levelRunTime()
{
    console.log("round started")
    roundInterval = setInterval(timerDec, 1000);
    roundTimeout = setTimeout(betweenLevels, timer * 1000);
    moleAppear = setInterval(showMole, moleSpeedRange * 1000)
}

function showMole()
{
    let moleSqr = Math.floor(Math.random() * 9)
    if(!mole[moleSqr].classList.contains("pop"))
    {
        moleSqr = Math.floor(Math.random() * 9)
        //console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        mole[moleSqr].classList.add('pop');
        moleSqrs[moleSqr].timeOut = setTimeout(() => {
            wrongHit()
            mole[moleSqr].classList.remove('pop');
            //console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }
    else
    {
        
        //console.log(`inserted  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        mole[moleSqr].classList.add('pop');
        moleSqrs[moleSqr].timeOut = setTimeout(() => {
            wrongHit()
            mole[moleSqr].classList.remove('pop');
            //console.log(`removed  ${moleSqr} time ${randomAppearAndHidePeriod()}`)
        }, randomAppearAndHidePeriod() * 1000);
    }

}   

function hit(event)
{
    if(mole[event.target.id].classList.contains("pop"))
    {
        mole[event.target.id].classList.remove('pop');
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
    timer = baseTimer + 3;
    baseTimer = timer;
    minAppear -= 0.1;
    maxAppear -= 0.2;
    moleSpeedRange = Math.random() * (maxAppear - minAppear) + minAppear
    currentLevel += 1
    console.log("values updated")
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
    clearTimeout(roundTimeout)

    for(let moleSqr of moleSqrs)
    {
        clearTimeout(moleSqr.timeOut)
    }

    for(oneMole of mole)
    {
        oneMole.classList.remove('pop');
    }

}
function betweenLevels()
{

    landingPageElement.style.display = "block"
    startElement.style.display = "block"
    highScreenMessageElement.style.display = "block"

    if(currentLevel === 5)
    {
        highScreenMessageElement.textContent = "Good Job!!"
        startElement.textContent = "Play Again"
    }
    else
    {
        highScreenMessageElement.textContent = "Nice"
        startElement.textContent = "Next Level"
    }

    clearInterval(roundInterval)
    clearInterval(moleAppear)
    clearTimeout(roundTimeout)

    for(let moleSqr of moleSqrs)
    {
        clearTimeout(moleSqr.timeOut)
    }

    for(oneMole of mole)
    {
        oneMole.classList.remove('pop');
    }
}

function randomAppearAndHidePeriod()
{
    return 0.3 + Math.random() * (maxAppear - minAppear) + minAppear
}

function resetGame()
{
    minAppear = 1.2;
    maxAppear = 2;
    currentLevel = 1;
    lives = 3;
    timer = 7;
    baseTimer = 7
    console.log("values reset")
}

/*----------------------------- Event Listeners -----------------------------*/

startElement.addEventListener('click', startGame)

for(let sqr of sqrElements)
{
    sqr.addEventListener('click', hit)
}