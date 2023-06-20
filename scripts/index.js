// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

let play = document.getElementById("play");

play.addEventListener("click", evt => {
    document.location = "./round-1.html";
})