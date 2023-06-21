// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";


let gameBoard = document.getElementById("game-board");
let userInput = document.getElementById("user-input");
let betInput = document.getElementById("bet-input");
let guess = document.getElementById("guess");
let scoreOne = document.getElementById("score-one");
let scoreTwo = document.getElementById("score-two");
let turn = document.getElementById("turn")



// global variables that saved me
let playerOneScore = 0;
let playerTwoScore = 0;
let currentTurn = 1;
guess.disabled = true;
let answer = "";
let inputOne;
let betOne;
let betTwo;
let inputTwo;
let playerTurnCheck = 1;

let url = window.location.href;
let params = (new URL(url)).searchParams;

playerOneScore = parseInt(params.get('scoreOne'));
playerTwoScore = parseInt(params.get('scoreTwo'));

scoreOne.innerHTML = playerOneScore;
scoreTwo.innerHTML = playerTwoScore; 


let final = document.createElement('div');
final.innerHTML = "Final Question";
final.id = "final";
gameBoard.appendChild(final);


let FinalQuestion = placeholderQuestions[60].question;
answer = placeholderQuestions[60].answer.toLowerCase();


final.addEventListener('click', evt => {
    final.innerHTML = FinalQuestion;
    final.style = "font-size: 25px; font-weight: bold; ali";
    guess.disabled = false;
})

guess.addEventListener('click', evt => {
    evt.preventDefault();
    final.disabled = true;
    if (currentTurn === 1) {
        playerTurnCheck++;
        betOne = parseInt(betInput.value);
        inputOne = userInput.value.toLowerCase();
        userInput.value = "";
        betInput.value = "";
        currentTurn = playerChange(currentTurn);
        turnCheck();
    } else if (currentTurn === 2) {
        playerTurnCheck++;
        betTwo = parseInt(betInput.value);
        inputTwo = userInput.value.toLowerCase();
        userInput.value = "";
        betInput.value = "";
        guess.disabled = true;
        turnCheck();
    }
})

// checks the playerTurnCheck to make sure both have entered
function turnCheck() {
if (playerTurnCheck === 3) {
    finalRound(answer, betOne, inputOne, 1);
    finalRound(answer, betTwo, inputTwo, 2);
    winner();
}
}

function winner() {
if (playerOneScore > playerTwoScore) {
    final.innerHTML = "Player One Wins!";
    final.disabled = true;
} else if (playerTwoScore > playerOneScore) {
    final.innerHTML = "Player Two Wins!";
    final.disabled = true;
}
}

function finalRound(answer, bet, guess , turn) {
    console.log(answer, guess )
    if (guess === answer) {
        addPoints(bet, turn);
    } if (guess != answer) {
        removePoints(bet, turn);
    }
}


function addPoints(points, currentTurn) {
    if (currentTurn === 1) {
        playerOneScore = playerOneScore + points;
        scoreOne.innerHTML = playerOneScore;
        return;
    } else  if (currentTurn === 2) {
        playerTwoScore = playerTwoScore + points;
        scoreTwo.innerHTML = playerTwoScore;
        return;
    }
}

function removePoints(points, currentTurn) {
    if (currentTurn === 1) {
        playerOneScore = playerOneScore - points;
        scoreOne.innerHTML = playerOneScore;
        return;
    } else  if (currentTurn === 2) {
        playerTwoScore = playerTwoScore - points;
        scoreTwo.innerHTML = playerTwoScore;
        return;
    }
}

function playerChange(currentTurn) {
    if (currentTurn === 1) {
        turn.innerHTML = "two";
        return 2;
    } else if (currentTurn === 2){
        turn.innerHTML = "one";
        return 1;
    }
}




