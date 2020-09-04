function gameRoutes(app) {


  let goodAnswers = 0;
  let gameOver = false;
  let callToFriend = false;
  let audienceQuestion = false;
  let fiftyFifty = false;

  const questions =[
    {
      question: "How many programming languages you know?",
      answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
      correctAnswer: 2
    }, 
    {
      question: "Is this a real life?",
      answers: ['Is this just a fantasy?', 'Covid19 is fake', 'pandemic of stupidity', 'good communist, is dead communist'],
      correctAnswer: 0
    }, 
    {
      question: "How far can you go with out legs?",
      answers: ['5km', '10km', '25km', 'not so far'],
      correctAnswer: 3
    }, 
  ]

  app.get('/question', (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true
      })
    } else if (gameOver) {
      res.json({
        loser: true
      })
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion
  
      res.json({
        question, 
        answers
      })
    }
  })


    app.post('/answer/:index', (req, res) => {
      const { index } = req.params;
      const question = questions[goodAnswers]
      const isCorrectAnswer = question.correctAnswer == index

      if (gameOver) { 
        res.json({
          loser: true
        })
      }


      if (isCorrectAnswer) {
        goodAnswers++;
      } else {
        gameOver = true
      }


      res.json({
        correct: isCorrectAnswer,
        goodAnswers
      })

    })


}


module.exports = gameRoutes;