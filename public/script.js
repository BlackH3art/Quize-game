const question = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');
const tipdiv = document.querySelector('#tip');




/* ********************************************************** */
// 

function fillQuestionElement(data) {

  if(data.winner === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'You win!';
    return;
  }

  if(data.loser === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'Unfortunately you lose!';
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


const buttons = document.querySelectorAll(".answer-btn");
for (let button of buttons) {
  button.addEventListener('click', (event) => {
    const answerIndex = event.target.dataset.answer
    sendAnswer(answerIndex);
  })
}



/* ********************************************************** */
// koło ratunkowe - telefon do przyjaciela

function handleFriendAnswer(data) {
  tipdiv.innerText = data.text;
}

function callToFriend() {
  fetch(`/help/friend`, {
    method: 'GET',
  })
  .then( response => response.json() )
  .then( data => handleFriendAnswer(data) )

}


/* ********************************************************** */
// koło ratunkowe pół na pół

function handleFiftyFiftyHint(data) {
  if (typeof data.text === 'string') {
    tipdiv.innerText = data.text;
  } else {
    for (button of buttons) {
      if(data.answersToRemove.indexOf(button.innerText) > -1) {
        button.innerText = '';
      }
    }
  }
}

function fiftyfifty() {
  fetch(`/help/fiftyfifty`, {
    method: 'GET',
  })
  .then( response => response.json() )
  .then( data => handleFiftyFiftyHint(data) )

}


document.querySelector('#callToFriend').addEventListener('click', callToFriend)
document.querySelector('#fiftyFifty').addEventListener('click', fiftyfifty)