import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router";
import { useFetchCategories } from "../../hooks/useFetchCategories";
import { useForm } from "react-hook-form";
import type { Difficulty, QuestionType } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAmount,
  setCurrentCategory,
  setCurrentDifficulty,
  setCurrentType,
} from "../../redux/questions.slice";
import type { RootState } from "../../store";

type FormValues = {
  category: number;
  difficulty: Difficulty;
  type: QuestionType;
  amount: number;
};

export default function Dashboard() {
  const navigate = useNavigate();
  useFetchCategories();
  const categories = useSelector(
    (state: RootState) => state.questions.categories
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  function onSubmit(data: FormValues) {
    dispatch(setCurrentCategory(data.category));
    dispatch(setCurrentDifficulty(data.difficulty));
    dispatch(setCurrentType(data.type));
    dispatch(setCurrentAmount(data.amount));
    navigate("/question", { state: data });
  }

  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Quiz App
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth error={!!errors.category}>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            label="Category"
            defaultValue=""
            value={watch("category")?.toString() || ""}
            {...register("category", {
              required: "Please select a category",
            })}
          >
            {categories.map((cat) => (
              <MenuItem value={cat.id}>{cat.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>{errors.category?.message}</FormHelperText>
        </FormControl>
        <br />
        <br />

        <FormControl fullWidth error={!!errors.difficulty}>
          <InputLabel id="difficulty">Difficulty</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty"
            label="Difficulty"
            value={watch("difficulty")?.toString() || ""}
            {...register("difficulty", {
              required: "Please select difficulty",
            })}
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
          <FormHelperText>{errors.difficulty?.message}</FormHelperText>
        </FormControl>
        <br />
        <br />

        <FormControl fullWidth error={!!errors.type}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="type"
            value={watch("type")?.toString() || ""}
            {...register("type", {
              required: "Please select question type",
            })}
          >
            <MenuItem value="multiple">Multiple Choice</MenuItem>
            <MenuItem value="boolean">True/False</MenuItem>
          </Select>
          <FormHelperText>{errors.type?.message}</FormHelperText>
        </FormControl>
        <br />
        <br />

        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          fullWidth
          error={!!errors.amount}
          helperText={errors.amount?.message}
          {...register("amount", {
            required: "Amount is required",
            min: {
              value: 1,
              message: "Amount must be greater than 0",
            },
            max: {
              value: 50,
              message: "Max 50 questions",
            },
          })}
        />

        <Box
          sx={{
            textAlign: "center",
            mt: 3,
          }}
        >
          <Button variant="contained" type="submit">
            GET STARTED
          </Button>
        </Box>
      </form>
    </>
  );
}
