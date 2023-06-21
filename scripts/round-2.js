// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";


let gameBoard = document.getElementById("game-board");
let userInput = document.getElementById("user-input");
let guess = document.getElementById("guess");
let pass = document.getElementById("pass");
let scoreOne = document.getElementById("score-one");
let scoreTwo = document.getElementById("score-two");
let turn = document.getElementById("turn")
let next = document.getElementById("nextBtn");

// a look up for the qustion index to easily navigate data
const qIndex = {
    "Nature": 0,
    "Animals": 1,
    "Computers": 2,
    "Mythology": 3,
    "History": 4,
    "General": 5
}

const pointAmount = [200, 400, 600, 800, 1000, 400, 800, 1200, 1600, 2000];
const categorys = [
    {
        category: "Nature",
        questions: [],
        answers: []
    },
    {
        category: "Animals",
        questions: [],
        answers: []
    },
    {
        category: "Computers",
        questions: [],
        answers: []
    },
    {
        category: "Mythology",
        questions: [],
        answers: []
    },
    {
        category: "History",
        questions: [],
        answers: []
    },
    {
        category: "General",
        questions: [],
        answers: []
    },
]

// global variables that saved me
let playerOneScore = 0;
let playerTwoScore = 0;
let currentTurn = 1;
guess.disabled = true;
pass.disabled = true;
let answer = "";
let index;
let questionIndex;
let currentBtn;
let input;
let playerPass = false;
let playerTurnCheck = 1;
let boardCheck = 0;

let url = window.location.href;
let params = (new URL(url)).searchParams;

playerOneScore = parseInt(params.get('scoreOne'));
playerTwoScore = parseInt(params.get('scoreTwo'));

scoreOne.innerHTML = playerOneScore;
scoreTwo.innerHTML = playerTwoScore; 


// organizing data for myself 
placeholderQuestions.forEach(i => {
        switch(true) {
            case i.category === "Nature" :
                categorys[0].questions.push(i.question);
                categorys[0].answers.push(i.answer);
                break;
            case i.category === "Animals" :
                categorys[1].questions.push(i.question);
                categorys[1].answers.push(i.answer);
                break;
            case i.category === "Computers" :
                categorys[2].questions.push(i.question);
                categorys[2].answers.push(i.answer);
                break;
            case i.category === "Mythology" :
                categorys[3].questions.push(i.question);
                categorys[3].answers.push(i.answer);
                break;
            case i.category === "History" :
                categorys[4].questions.push(i.question);
                categorys[4].answers.push(i.answer);
                break;
            case i.category === "General" :
                categorys[5].questions.push(i.question);
                categorys[5].answers.push(i.answer);
                break;
        
        }
    });

let renderBoard = categorys => {
    let catColumn = document.createElement("div");
    catColumn.classList.add("category-column");

    let catTitle = document.createElement("div");
    catTitle.classList.add("category-title");
    catTitle.innerText = categorys.category;
    catColumn.setAttribute("category-name", categorys.category)
    catColumn.appendChild(catTitle);
    gameBoard.appendChild(catColumn);
    
    let points = 400;
    let i = 5;
    while (i < 10) {
            let qBtn = document.createElement("button");
            qBtn.classList.add("qbtn");
            qBtn.innerText = points;
            qBtn.setAttribute('index-id', i);
            catColumn.appendChild(qBtn);
            points = points + 400;
            i++;
            qBtn.addEventListener('click', displayQuestion);
        }  
    }
    
function  displayQuestion() {
    guess.disabled = false;
    pass.disabled = false;
    playerPass = false;
    playerTurnCheck = 1;
    questionIndex = Number(this.getAttribute("index-id"));
    index = qIndex[this.parentElement.getAttribute("category-name")];
    this.style = "font-size: 14px; font-weight: bold;";
    this.innerText = categorys[index].questions[questionIndex];
    const allBoard = Array.from(document.querySelectorAll('.qbtn'));
    allBoard.forEach(btn => btn.removeEventListener('click', displayQuestion));
    console.log(categorys[index].answers[questionIndex])
    currentBtn = this;
}

guess.addEventListener('click', evt => {
    evt.preventDefault();
    nextRound();
    getResult(index, questionIndex, currentBtn)
})

pass.addEventListener('click', evt => {
    evt.preventDefault();
    pass.disabled = true;
    if (playerPass === false) {
        currentTurn = playerChange(currentTurn);
        playerPass = true;
    } else {
        return;
    }

})

// takes in input and answer to check for right or wrong. also takes btn and disables
function getResult(index, questionIndex, btn) {
    answer = (categorys[index].answers[questionIndex]).toLowerCase()
    input = userInput.value.toLowerCase();
    const allBoard = Array.from(document.querySelectorAll('.qbtn'));
    
    if (input === answer) {
        addPoints(pointAmount[questionIndex], currentTurn);
        allBoard.forEach(btn => btn.addEventListener('click', displayQuestion));
        userInput.value = "";
        btn.disabled = true;
        btn.innerHTML = "";
        guess.disabled = true;
        pass.disabled = true;
        return;
    } else if (input != answer) {
        if (playerTurnCheck < 2) {
            playerTurnCheck++;
            userInput.value = "";
            pass.disabled = true;
            removePoints(pointAmount[questionIndex], currentTurn);
            currentTurn = playerChange(currentTurn);
            return;
        } else {
            removePoints(pointAmount[questionIndex], currentTurn);
            allBoard.forEach(btn => btn.addEventListener('click', displayQuestion));
            userInput.value = "";
            btn.disabled = true;
            btn.innerHTML = "";
            guess.disabled = true;
            pass.disabled = true;
            currentTurn = playerChange(currentTurn);
            return;
        }
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


categorys.forEach(category => renderBoard(category));

// will wait for the score to reach a certain point and then enable next round
function nextRound() {
    if (playerOneScore >= 30000 || playerTwoScore >= 30000 || boardCheck === 29) {
        next.disabled = false;
            next.addEventListener('click', evt => {
                evt.preventDefault();
                document.location = `./final-jeopardy.html?scoreOne=${playerOneScore}&scoreTwo=${playerTwoScore}`;
            })
    }
    }
    