import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import type { RootState } from "../../store";
import { setScore, updateLeaderboards } from "../../redux/score.slice";
import { setCurrentQuestionIndex } from "../../redux/questions.slice";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
};

const FinalScore = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.score);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    dispatch(
      updateLeaderboards({
        ...data,
        score,
      }),
    );

    dispatch(setCurrentQuestionIndex(0));
    dispatch(setScore(0));
    navigate("/leader-board");
  }

  return (
    <Container maxWidth="md">
      <Box mb={4}>
        <Typography variant="h3" textAlign="center">
          Final Score: {score}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* FIRST NAME */}
        <TextField
          label="First Name"
          fullWidth
          margin="normal"
          error={!!errors.first_name}
          helperText={errors.first_name?.message}
          {...register("first_name", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
        />

        {/* LAST NAME */}
        <TextField
          label="Last Name"
          fullWidth
          margin="normal"
          error={!!errors.last_name}
          helperText={errors.last_name?.message}
          {...register("last_name", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters",
            },
          })}
        />

        {/* EMAIL */}
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
        />

        <Box mt={4} textAlign="right">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default FinalScore;
