import React from "react";
import { Box, Button, Typography, LinearProgress } from "@mui/material";
import { decode } from "html-entities";
import { useNavigate } from "react-router";
import { DIFFICULTY_TIME } from "../../configs";
import { formatTimer } from "../../utils/formatTimer";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestionIndex } from "../../redux/questions.slice";
import { setScore } from "../../redux/score.slice";
import { useFetch } from "../../hooks/useFetch";

function Question() {
  const navigate = useNavigate();
  const [options, setOptions] = React.useState<string[]>([]);
  const score = useSelector((state: RootState) => state.score.score);
  const [countTime, setCountTime] = React.useState(DIFFICULTY_TIME["easy"]);
  const questionIndex = useSelector(
    (state: RootState) => state.questions.current_question_index
  );
  const currentCategory = useSelector(
    (state: RootState) => state.questions.current_category
  );
  const currentDifficulty = useSelector(
    (state: RootState) => state.questions.current_difficulty
  );
  const currentType = useSelector(
    (state: RootState) => state.questions.current_type
  );
  const currentAmount = useSelector(
    (state: RootState) => state.questions.current_amount
  );
 
  const params = new URLSearchParams({
    amount: currentAmount.toString(),
    category: currentCategory.toString(),
    currentDifficulty,
    currentType,
  });
  const { dataSource } = useFetch({
    apiUrl:  `https://opentdb.com/api.php?${params.toString()}`
  })
  const questions = dataSource.results || [];
  const dispatch = useDispatch();

  function generateOptions() {
    const question = questions[questionIndex];
    const answers = [...question.incorrect_answers];
    answers.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);
    setOptions(answers);
  }

  React.useEffect(() => {
    if (!questions.length) return;

    generateOptions();
  }, [questions]);

  // next question
  React.useEffect(() => {
    if (questionIndex === 0) return;

    generateOptions();
  }, [questions, questionIndex]);

  function handleAnwser(content: string) {
    const question = questions[questionIndex];

    if (content === question.correct_answer) {
      dispatch(setScore(score + 1));
    }

    if (questionIndex + 1 === questions.length) {
      navigate("/final-score");
      return;
    }
    dispatch(setCurrentQuestionIndex(questionIndex + 1));
    setCountTime(DIFFICULTY_TIME["easy"]);
  }

  // count timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountTime((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        }
        const random = Math.floor(Math.random() * 4);
        const content = options[random];
        handleAnwser(content);
        return DIFFICULTY_TIME["easy"];
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [options]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Time Remaining</Typography>
          <Typography 
            variant="body2"
            sx={{
              color: countTime < 10 ? "red" : "inherit",
              fontWeight: countTime < 10 ? "bold" : "normal",
            }}
          >
            {formatTimer(countTime)}
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(countTime / DIFFICULTY_TIME["easy"]) * 100}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              backgroundColor: countTime < 10 ? "#f44336" : "#4caf50",
              transition: "all 0.3s ease",
            },
          }}
        />
      </Box>

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Question {questionIndex + 1}
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        {decode(questions[questionIndex]?.question || "")}
      </Typography>
      <br />

      <div>
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleAnwser(option)}
            >
              {decode(option)}
            </Button>
            <br />
            <br />
          </React.Fragment>
        ))}
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" gutterBottom>
          Score: {score}/{questions.length}
        </Typography>
      </Box>
    </>
  );
}

export default Question;
