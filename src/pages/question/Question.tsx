import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { decode } from "html-entities";
import { useNavigate } from "react-router";
import { DIFFICULTY_TIME } from "../../configs";
import { formatTimer } from "../../utils/formatTimer";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import type { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestionIndex } from "../../redux/questions.slice";
import { setScore } from "../../redux/score.slice";

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
  const { questions } = useFetchQuestions({
    amount: currentAmount,
    category: currentCategory,
    difficulty: currentDifficulty,
    type: currentType,
  });
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
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: countTime < 10 ? "red" : "black",
          }}
        >
          Timer: {formatTimer(countTime)}
        </Typography>
      </Box>
    </>
  );
}

export default Question;
