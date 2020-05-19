//select all elements
const start = document.getElementById("start"),
      quiz = document.getElementById("quizContainer"),
      question = document.getElementById("question"),
      counter = document.getElementById("counter"),
      thankYouMessage = document.getElementById("thankYouMessage"),
      choiceA = document.getElementById("A"),
      choiceB = document.getElementById("B"),
      choiceC = document.getElementById("C"),
      choiceD = document.getElementById("D"),
      choices = document.querySelectorAll(".choices .choice"),
      nextBtn = document.getElementById("nextBtn"),
      progress = document.getElementById("progress"),
      prog = document.getElementsByClassName("prog"),
      scoreContainer = document.getElementById("scoreContainer");


// create variables
let count = 30; // 30 sec
const questionTime = 0;
let timer = 0;
let score = 0;


// create the questions
let questions = [
  {
    question : "What is the answer to question 1?",
    choiceA : "Wrong",
    choiceB : "Correct",
    choiceC : "Wrong",
    choiceD : "Wrong",
    correct : 'B' // this is the correct answer
  },
  {
    question : "What is the answer to question 2?",
    choiceA : "Wrong",
    choiceB : "Wrong",
    choiceC : "Correct",
    choiceD : "Wrong",
    correct : 'C' // this is the correct answer
  },
  {
    question : "What is the answer to question 3?",
    choiceA : "Wrong",
    choiceB : "Wrong",
    choiceC : "Wrong",
    choiceD : "Correct",
    correct : 'D' // this is the correct answer
  }
];


// find the appropriate question
let lastQuestion = questions.length - 1; // finds the length of the questions array but subtracts 1 to get the correct position
let runningQuestion = 0; // start the position of questions array to 0


// render a question
questionRender = () => {
  let q = questions[runningQuestion]; // q is equal to the position of the questions array equal to the value of runningQuestion. this starts at questions[0]

  question.innerHTML = "<h4>" + q.question + "</h4>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
  choiceD.innerHTML = q.choiceD;
}


// render progress cricles
progressRender = () => {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog'></div>"; // loop through how many questions there are and adds prog circle in the footer for each
  }
}


// render counter
counterRender = () => {
  if (count >= questionTime) {
    counter.innerHTML = "Time remaining: " + count + " seconds";
    count --; // subtract 1 from count every time
  } else {
    counter.innerHTML = "⏰ Time's up!";
    timer = setInterval(0);
    nextBtn.disabled = false;
    for (let i = 0; i < choices.length; i++) {  // loop through question choices
      choices[i].classList.add("disabled"); // add disabled class to each question choice
    }
    prog[runningQuestion].style.cssText = "background-color: #e63131; border: 1px solid #e63131";  // change background color of the prog circle to red
  }
}


// start quiz
startQuiz = () => {
  scoreContainer.style.display = "none"; // hide score
  start.style.display = "none"; // hide Start button after clicking
  quiz.style.display = "block";  // show quiz
  questionRender();
  progressRender();
  counterRender();
  timer = setInterval(counterRender,1000); // 1000ms = 1 second
}


// reset quiz
resetQuiz = () => {
  score = 0; // reset back to 0
  runningQuestion = 0; // reset back to 0
  scoreContainer.style.display = "none"; // hide score
  start.style.display = "none"; // hide Restart button after clicking
  quiz.style.display = "block";  // show quiz
  questionRender();
  count = 30; // reset back to 30
  counterRender();
  thankYouMessage.style.display = "none";  // hide Thank You message in header
  counter.style.display = "block"; // show timer counter
  nextBtn.disabled = true; // disable Next button
  for (let i = 0; i < choices.length; i++) {  // loop through question choices
    choices[i].classList.remove("disabled", "correct", "wrong"); // remove disabled class to each question choice
  }
  checkAnswer = (answer, event) => { // reset checkAnswer back to default value
    if (answer == questions[runningQuestion].correct) { // if answer is equal to the value of correct in the questions array for the appropriate questions
      score++; // add 1 to the score when it's correct
      answerIsCorrect(event);
    } else {
      answerIsWrong(event);
    }
  }
  for (let i = 0; i < prog.length; i++) {  // loop through prog
    prog[i].style.cssText =  "background-color: #fff; border: 1px solid #acb3bb";  // change background color of the prog circle
  }
}



// run startQuiz function
start.addEventListener("click",startQuiz); // when clicking the Start button, run the startQuiz function


// check answer
let checkAnswer = (answer, event) => {
  if (answer == questions[runningQuestion].correct) { // if answer is equal to the value of correct in the questions array for the appropriate questions
    score++; // add 1 to the score when it's correct
    answerIsCorrect(event);
  } else {
    answerIsWrong(event);
  }
}


// runs when a user clicks on an answer
handleCheckAnswer = (answer, event) => { // (answer) is stored in the HTML on the checkAnswer onClick. e.g. checkAnswer('A'), checkAnswer('B'), etc.
  nextBtn.disabled = false;
  checkAnswer(answer, event);
}


// next question button
nextQuestion = () => {
  nextBtn.disabled = true; // disable the next button
  count = 30; // set timer count back to 30
  if (runningQuestion < lastQuestion) { // if the array position is less than the number of questions in the array, then run the if statement
    runningQuestion++;
    questionRender();
    for (let i = 0; i < choices.length; i++) {
      choices[i].classList.remove("disabled", "wrong", "correct");
    }
    checkAnswer = (answer, event) => {
      if (answer == questions[runningQuestion].correct) { // if answer is equal to the value of correct in the questions array for the appropriate questions
        score++; // add 1 to the score when it's correct
        answerIsCorrect(event); // run answerIsCorrect
      } else {
        answerIsWrong(event);
      }
    }
    counterRender();
  } else {
    nextBtn.disabled = false; // disable the next button
    scoreContainer.innerHTML = "<h1 class='text-center'>🎉</h1><h2 class='text-center'>Your score is " + Math.round(score / 3 * 100) + "%</h2>"; // write the score
    scoreContainer.style.display = "block"; // show score
    quiz.style.display = "none";  // hide quiz
    counter.style.display = "none"; // hide timer counter
    thankYouMessage.style.display = "block";  // show Thank You message in header
    start.innerHTML = "Retake quiz";
    start.style.display = "inline-block"; // show Restart Quiz button after clicking
    start.removeEventListener("click",startQuiz); // when clicking the Start button, remove the startQuiz function
    start.addEventListener("click",resetQuiz); // when clicking the Restart Quiz button, run the resetQuiz function
  }
}


// answer is correct
answerIsCorrect = (evt) => {
  checkAnswer = () => console.log("Answer already selected."); // reset checkAnswer equal to a message so the user can't change the code
  prog[runningQuestion].style.cssText = "background-color: #38ce66; border: 1px solid #38ce66"; // change background color of the prog circle to green
  for (let i = 0; i < choices.length; i++) {  // loop through question choices
    choices[i].classList.add("disabled"); // add disabled class to each question choice
  }
  evt.target.classList.add('correct'); // adds "correct" class to seleted question choice
}

// answer is wrong
answerIsWrong = (evt) => {
  prog[runningQuestion].style.cssText = "background-color: #e63131; border: 1px solid #e63131";  // change background color of the prog circle to red
  for (let i = 0; i < choices.length; i++) { // loop through question choices
    choices[i].classList.add("disabled"); // add disabled class to each question choice
  }
  evt.target.classList.add('wrong'); // adds "wrong" class to seleted question choice
}