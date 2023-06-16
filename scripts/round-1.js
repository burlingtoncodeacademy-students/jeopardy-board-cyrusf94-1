// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";

// seperating categorys out into arrays for easier access
let categorys = {
    nature: [],
    animals: [],
    computers: [],
    mythology: [],
    history: [],
    general: []
}

placeholderQuestions.forEach(i => {
    switch(true) {
        case i.category == "Nature" :
            categorys.nature.push(i);
            break;
        case i.category == "Animals" :
            categorys.animals.push(i);
            break;
        case i.category == "Computers" :
            categorys.computers.push(i);
            break;
        case i.category == "Mythology" :
            categorys.mythology.push(i);
            break;
        case i.category == "History" :
            categorys.history.push(i);
            break;
        case i.category == "General" :
            categorys.general.push(i);
            break;    
    }
});

let categoryBtn = document.querySelectorAll(".questions")
let categoryContainer = document.getElementsByClassName(".question-table");
let category = document.querySelectorAll(".category")
let playerTurn = document.getElementsByClassName(".player-turn");
let answerInput = document.getElementById("answer");
let guess = document.getElementsByClassName(".guess");
let pass = document.getElementsByClassName(".pass");

/*  
? To do
    1. Need to make async funtion to call once question is clicked 
    that waits for user to either answer or pass
    2. Make player turn change. also disable the next round button
    3. add score
*/


categoryBtn.forEach(el => {
    el.addEventListener("click", evt => {
        evt.preventDefault();
        switch(true) {
            case el.parentElement.id == "nature" :
                el.textContent = categorys.nature[qPoints(el.textContent)].question;
                break;
            case el.parentElement.id == "animals" :
                el.textContent = categorys.animals[qPoints(el.textContent)].question;
                break;
            case el.parentElement.id == "computers" :
                el.textContent = categorys.computers[qPoints(el.textContent)].question;
                break;
            case el.parentElement.id == "mythology" :
                el.textContent = categorys.mythology[qPoints(el.textContent)].question;
                break;
            case el.parentElement.id == "history" :
                el.textContent = categorys.history[qPoints(el.textContent)].question;
                break;
            case el.parentElement.id == "general" :
                el.textContent = categorys.general[qPoints(el.textContent)].question;
                break;    
        }
    })
})

let qPoints = points => {
    let question;
    switch (true) {
        case points == "100" :
            question = 0;
            break;
        case points == "200" :
            question = 1;
            break;
        case points == "300" :
            question = 2;
            break;
        case points == "400" :
            question = 3;
            break;
        case points == "500" :
            question = 4;
            break;    
    }
    return question;
}
