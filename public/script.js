const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');


function fillQuestionElement(data) {

  if(data.winner === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'You win!';
    return;
  }
  question.innerText = data.question;

  for (let i in data.answers) {
    i = Number(i)
    const answerElement = document.querySelector(`#answer${i+1}`);
    answerElement.innerText = data.answers[i]
  }

}

function showNextQuestion() {
  fetch('/question', {
    method: 'GET',
  })
  .then( response => response.json() )
  .then( data => fillQuestionElement(data) )
}

showNextQuestion()

const goodAnswerSpan = document.querySelector("#good-answers")


function handleAnswerFeedback(data) {
  goodAnswerSpan.innerText = data.goodAnswers;
  showNextQuestion();
}


function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: 'POST',
  })
  .then( response => response.json() )
  .then( data => handleAnswerFeedback(data) )
}


const buttons = document.querySelectorAll("button");
for (let button of buttons) {
  button.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.answer
    sendAnswer(answerIndex);
  })
}