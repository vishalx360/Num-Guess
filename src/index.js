//GETTING ELEMENTS FROM DOM
let a = document.getElementById('a');
let b = document.getElementById('b');
let c = document.getElementById('c');
let d = document.getElementById('d');
let e = document.getElementById('e');
let f = document.getElementById('f');
let g = document.getElementById('g');
let h = document.getElementById('h');
let i = document.getElementById('i');
//ENDS
let correctNumui = document.getElementById('correctNumui');

let correctCard = document.getElementById('correctCard');




var correctSound = new Audio()
correctSound.src = "/correct.mp3";

var errorSound = new Audio()
errorSound.src = "/error.mp3";



function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//MAKING ARRAY FROM ELEMENTS
let array = [a, b, c, d, e, f, g, h, i]
//LOOP
array.forEach(element => {
    element.textContent = getRandomNum(1, 50)
});

//Logics

var randomIndex = getRandomNum(1, 9)
var unique = array[randomIndex]
if (unique == undefined) {
    reload()
} else {
    var NumWinner = unique.textContent
}
//Logics Ends


//MAIN FUNCTION
let container = document.querySelectorAll('.circle')

container.forEach(element => {

    element.addEventListener('click', clicked)
})


function clicked(e) {

    if (e.target.textContent === NumWinner & e.target.className == 'text') {
        youWon()
        correctSound.play()
    }
    if (e.target.textContent != NumWinner & e.target.className == 'text') {

        youLoose()

    }
}
//MAIN FUNCTION ENDS






function reload() {
    location.reload()
}

var UiScore = document.getElementById('score')


// Results Function
// Adding to Scoreboard
function youWon() {
    let bonus = 1;
    let currentScore = parseInt(localStorage.getItem('score'));
    localStorage.setItem('score', `${currentScore + bonus}`);
    UiScore = parseInt(localStorage.getItem('score'));
    showCorrect()

    setTimeout(reload, 1500)

}

function youLoose() {
    let bonus = 1;


    chances = chances - bonus
    tip()

}

function tipColor() {
    document.getElementById('tip').style.backgroundColor = "rgba(47, 165, 63, 0.788)"
}

let chances = 3

var tipText = document.getElementById('tipText')

function tip() {
    if (chances == 2) {
        showWrong(1000)
        tipText.textContent = "2 chances left";
    }

    if (chances == 1) {
        if (NumWinner < 10 & NumWinner > 0) {
            tipText.textContent = "1 chance left   Hint: its less than 10";
        }
        if (NumWinner < 20 & NumWinner > 10) {
            tipText.textContent = "1 chance left   Hint: its less than 20";
        }
        if (NumWinner < 30 & NumWinner > 20) {
            tipText.textContent = "1 chance left   Hint: its between 30 & 20";
        }
        if (NumWinner < 40 & NumWinner > 30) {
            tipText.textContent = "1 chance left   Hint: its between 30 & 40";
        }
        if (NumWinner < 50 & NumWinner > 40) {
            tipText.textContent = "1 chance left   Hint: its between 40 & 50";
        }
        if (NumWinner == 10 || NumWinner == 30 || NumWinner == 20 || NumWinner == 40 || NumWinner == 50) {
            tipText.textContent = "1 chances left    Hint: its a multiple of 10";
        }
        showWrong(1000)
        tipColor()
    }
    if (chances == 0) {
        let bonus = 1;
        let currentScore = parseInt(localStorage.getItem('score'));
        if (currentScore == 0) {} else {
            localStorage.setItem('score', `${currentScore - bonus}`);
        }
        score.textContent = parseInt(localStorage.getItem('score'));
        correctNumui.textContent = NumWinner
        correctCard.style.display = "flex"
        showWrong(1500)

        errorSound.play()
        setTimeout(reload, 2000)

    }

}


var resultBanner = document.getElementById('resultBanner')
var resultWrong = document.getElementById('resultWrong')

function showCorrect() {
    resultBanner.style.display = "flex"
    document.getElementById('resultCorrect').style.display = "block"
}

function showWrong(time) {
    resultBanner.style.display = "flex"
    resultWrong.style.display = "block"

    function removeBanner(time) {
        resultBanner.style.display = "none"
        resultWrong.style.display = "none"
    }
    setTimeout(removeBanner, time)
}




if (localStorage.getItem('score') === null) {
    localStorage.setItem('score', 0)


} else {
    UiScore.textContent = localStorage.getItem('score')
}


document.getElementById('menu').addEventListener('click', function () {
    document.getElementById('x').click()
})

document.getElementById('cut').addEventListener('click', function () {
    resultBanner.style.display = "none";
    document.getElementById('card').style.display = "none"
})




//Game Info

document.getElementById("navButton-how").addEventListener("click", function () {
    document.getElementById('card').style.display = "block"
    resultBanner.style.display = "flex"
    resultBanner.addEventListener('click', function (e) {
        if (e.target.className === "test") {
            resultBanner.style.display = "none"
            document.getElementById('card').style.display = "none"
        }
    })
})







document.getElementById("navButton-reset").addEventListener("click", function () {
    localStorage.setItem('score', 0)
    setTimeout(reload, 200)
})

document.getElementById("resultBanner").style.height = `${screen.height - 60}px`


// //DEVELOPMENT CODES
// console.log("Winning Number: " + NumWinner)