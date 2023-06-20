// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log(placeholderQuestions)

let gameBoard = document.getElementById("game-board");
let userInput = document.getElementById("user-input");
let guess = document.getElementById("guess");
let pass = document.getElementById("pass");
let scoreOne = document.getElementById("score-one");
let scoreTwo = document.getElementById("score-two");
let turn = document.getElementById("turn")
// a look up for the qustion index to easily navigate data
const qIndex = {
    "Nature": 0,
    "Animals": 1,
    "Computers": 2,
    "Mythology": 3,
    "History": 4,
    "General": 5
}

const pointAmount = [200, 400, 600, 800, 1000];
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
    
    let points = 200;
    let i = 0;
    while (i < 5) {
            let qBtn = document.createElement("button");
            qBtn.classList.add("qbtn");
            qBtn.innerText = points;
            qBtn.setAttribute('index-id', i);
            catColumn.appendChild(qBtn);
            points = points + 200;
            i++;
            qBtn.addEventListener('click', displayQuestion);
        }  
    }
    
function  displayQuestion() {
    let questionIndex = Number(this.getAttribute("index-id"));
    let index = qIndex[this.parentElement.getAttribute("category-name")];
    this.style = "font-size: 14px; font-weight: bold;";
    this.innerText = categorys[index].questions[questionIndex];
    const allBoard = Array.from(document.querySelectorAll('.qbtn'));
    allBoard.forEach(btn => btn.removeEventListener('click', displayQuestion));
    console.log(categorys[index].answers[questionIndex])
    guess.addEventListener('click', evt => {
        evt.preventDefault();
        if (getAnswer(index,questionIndex)) {
            addPoints(pointAmount[questionIndex], scoreOne);
            allBoard.forEach(btn => btn.addEventListener('click', displayQuestion));
            userInput.value = "";
            this.innerText = '';
            this.disabled = true;
        } else {
            removePoints(pointAmount[questionIndex], scoreOne);
        }
    }); 
}

function getAnswer(index, questionIndex) {
    let answer = (categorys[index].answers[questionIndex]).toLowerCase()
    let input = userInput.value;

    if (answer.toLowerCase() === input.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}

function addPoints(points, whatScore) {
    let score = Number(whatScore.innerText);
    score = score += points;
    whatScore.innerHTML = score;
}

function removePoints(points, whatScore) {
    whatScore.innerText = (Number(whatScore.innerText) - points);
}


categorys.forEach(category => renderBoard(category));

// will wait for the score to reach a certain point and then enable next round
if (Number(scoreOne.innerHTML) >= 15000 || Number(scoreTwo) >= 15000) {
        console.log('next round')
}