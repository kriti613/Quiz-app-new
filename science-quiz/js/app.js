const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 5;
let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;


function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion;i++){
        availableQuestion.push(quiz[i])
    }
}

function getNewQuestion(){
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit; 
    const questionIndex = availableQuestion[Math.floor(Math.random() * availableQuestion.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    const index1= availableQuestion.indexOf(questionIndex);
    availableQuestion.splice(index1,1);//removing 'questionindex from availablequestion so that questions dont repeat
    // console.log(questionIndex)
    // console.log(availableQuestion)
    // console.log(currentQuestion.option)
    const optionLen = currentQuestion.option.length
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay = 0.2;
    //creating options in html
    for(let i=0; i<optionLen; i++){
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        //removing optioindex from avaialbloption to avoid repetation
        availableOptions.splice(index2,1);
        // console.log(optionIndex)
        // console.log(availableOptions)
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.option[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
    questionCounter++
}

function getResult(element){
    const id = parseInt(element.id);    //Because element at id is string
    if(id === currentQuestion.answer){
        element.classList.add("answer"); 
        updateAnswerIndicator("answer");
        correctAnswers++;
        //console.log("correct:" + correctAnswers)
    }
    else{
        element.classList.add("answer");
        updateAnswerIndicator("answer");
        // const optionLen = optionContainer.children.length;
        // for(let i=0;i<optionLen; i++){
        //     if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
        //         optionContainer.children[i].classList.add("correct");
        //     }
        // }
    }
   attempt++; 
   unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i< optionLen; i++)
    {
        optionContainer.children[i].classList.add("already-answered");
    }
}
function answerIndicator(){
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for(let i=0;i<totalQuestion;i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);    
    }
}
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}
function next(){
    //console.log(questionCounter, quiz.length)
    if(questionCounter === questionLimit){

        //console.log("quiz over");
        quizOver();
    }
    else{
        getNewQuestion();
    }
}
function skip(){
    next();
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide"); 
    quizResult();
}

function quizResult(){
    resultBox.querySelector(".total-question").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const totalPercentage = (correctAnswers/questionLimit)*100;
    resultBox.querySelector(".percentage").innerHTML = totalPercentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
    localStorage.setItem('previous-score', correctAnswers);
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestion = [];
}

function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.add("hide");
    resetQuiz();
    startQuiz();
}
function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}
// START FUNCTION
function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
    answerIndicator();
}
window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}


