

import React from "react"
import { Box, Button, Typography } from "@mui/material"
import { decode } from 'html-entities';
import type { IQuestion } from "../../types"
import { useNavigate } from "react-router";
import { DIFFICULTY_TIME } from "../../configs";
import { formatTimer } from "../../utils/formatTimer";

const mockQuestions = [
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Entertainment: Film",
        "question": "In the &quot;Jurassic Park&quot; universe, what is the name of the island that contains InGen&#039;s Site B?",
        "correct_answer": "Isla Sorna",
        "incorrect_answers": [
            "Isla Nublar",
            "Isla Pena",
            "Isla Muerta"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Entertainment: Film",
        "question": "In the 1999 movie Fight Club, which of these is not a rule of the &quot;fight club&quot;?",
        "correct_answer": "Always wear a shirt",
        "incorrect_answers": [
            "You do not talk about FIGHT CLUB",
            "Only two guys to a fight",
            "Fights will go on as long as they have to"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Entertainment: Film",
        "question": "Who directed the 1973 film &quot;American Graffiti&quot;?",
        "correct_answer": "George Lucas",
        "incorrect_answers": [
            "Ron Howard",
            "Francis Ford Coppola",
            "Steven Spielberg"
        ]
    }
]

/*
api: 
https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple
*/

function Question() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = React.useState<IQuestion[]>([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [options, setOptions] = React.useState<string[]>([]);
  const [score, setScore] = React.useState(0);
  const [countTime, setCountTime] = React.useState(DIFFICULTY_TIME['easy'])

  React.useEffect(() => {
    async function fetchQuestion() {
      // code call api
      const data = mockQuestions;
      const question = data[questionIndex];
      const answers = [...question.incorrect_answers];
      answers.splice(
        Math.floor(Math.random() * 4),
        0,
        question.correct_answer
      )

      setDataSource(mockQuestions);
      setOptions(answers);
    }
    fetchQuestion();
  }, []);

  // next question
  React.useEffect(() => {
    if(questionIndex === 0) return;

    const question = dataSource[questionIndex];
    const answers = [...question.incorrect_answers];
    answers.splice(
      Math.floor(Math.random() * 4),
      0,
      question.correct_answer
    );
    setOptions(answers);
  }, [dataSource, questionIndex])

  // count timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountTime(prevState => {
        if(prevState > 0) {
          return prevState - 1; 
        }
        const random = Math.floor(Math.random() * 4);
        const content = options[random];
        handleAnwser(content);
        return DIFFICULTY_TIME['easy'];
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [options])

  function handleAnwser(content: string) {
    const question = dataSource[questionIndex];

    if(content === question.correct_answer) {
      setScore(prevState => prevState + 1)
    }

    if(questionIndex + 1 === dataSource.length) {
      navigate('/final-score');
      return;
    }
    setQuestionIndex(prevState => prevState + 1);
    setCountTime(DIFFICULTY_TIME['easy'])
  }

  return (
    <>
      <Typography 
        variant="h3" 
        gutterBottom 
        sx={{
          textAlign: 'center'
        }}
      >
        Question {questionIndex + 1}
      </Typography>

      <Typography 
        variant="body1" 
        gutterBottom 
        sx={{
          textAlign: 'center'
        }}
      >
        {decode(dataSource[questionIndex]?.question || '')}
      </Typography>
      <br />

      <div>
        {options.map(option => (
          <>
            <Button variant="contained" fullWidth onClick={() => handleAnwser(option)}>{option}</Button>
            <br /><br />
          </>
        ))}
      </div>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography 
          variant="body1" 
          gutterBottom 
        >
          Score: {score}/{dataSource.length}
        </Typography>
        <Typography 
          variant="body1" 
          gutterBottom 
          sx={{
            color: countTime < 10 ? 'red' :'black'
          }}
        >
          Timer: {formatTimer(countTime)}
        </Typography>
      </Box>
    </>
  )
}

export default Question