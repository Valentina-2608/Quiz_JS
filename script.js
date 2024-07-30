const questions = [
    {
        question:"The Great Wall of China is located in which country?",
        answers:[
            { text: "Japan", correct: false },
            { text: "China", correct: true },
            { text: "India", correct: false },
            { text: "New Zealand", correct: false },
        ]
    },
    {
        question:"Petra, an ancient city known for its rock-cut architecture, is found in which country?",
        answers:[
            { text: "Egypt", correct: false },
            { text: "Greece", correct: false },
            { text: "Jordan", correct: true },
            { text: "Turkey", correct: false },
        ]
    },
    {
        question:"Christ the Redeemer is a famous statue located in which city?",
        answers:[
            { text: "Buenos Aires", correct: false },
            { text: "Mexico City", correct: false },
            { text: "Santiago", correct: false },
            { text: "Rio de Janeiro", correct: true },
        ]
    },
    {
        question:"Machu Picchu is an ancient Incan city located in which country?",
        answers:[
            { text: "Colombia", correct: false },
            { text: "Peru", correct: true },
            { text: "Chile", correct: false },
            { text: "Bolivia", correct: false },
        ]
    },
    {
        question:"The Colosseum, an ancient amphitheater, is found in which city?",
        answers:[
            { text: "Rome", correct: true },
            { text: "Paris", correct: false },
            { text: "Madrid", correct: false },
            { text: "Athens", correct: false },
        ]
    },
    {
        question:"The Taj Mahal, a white marble mausoleum, is located in which country?",
        answers:[
            { text: "Pakistan", correct: false },
            { text: "Bangladesh", correct: false },
            { text: "India", correct: true },
            { text: "Sri Lanka", correct: false },
        ]
    },
    {
        question:"Chichen Itza, a large Mayan archaeological site, is located in which country?",
        answers:[
            { text: "Guatemala", correct: false },
            { text: "Honduras", correct: false },
            { text: "Belize", correct: false },
            { text: "Mexico", correct: true },
        ]
    }


]


let questionElement = document.getElementById('question');
let answerButton = document.querySelector('.answers');
let nextButton = document.getElementById('next_btn'); 


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next question';
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true'){
            button.classList.add('correct');
        } 
        button.disabled = true;
    });
    
    nextButton.style.display = 'block'

}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}



function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion(); 
    } else {
        showScore();
    }

}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
})



startQuiz();