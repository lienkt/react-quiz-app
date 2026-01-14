import React from "react";
import type { Difficulty, IQuestion, QuestionType } from "../types";

type FetchQuestionsParams = {
  amount: number;
  category: number;
  difficulty: Difficulty;
  type: QuestionType;
};

export const useFetchQuestions = ({
  amount,
  category,
  difficulty,
  type,
}: FetchQuestionsParams) => {
  const [questions, setQuestions] = React.useState<IQuestion[]>([])
  
    React.useEffect(() => {
      async function fetchQuestions() {
        try {
        const params = new URLSearchParams({
          amount: amount.toString(),
          category: category.toString(),
          difficulty,
          type,
        });
          const resp = await fetch(
          `https://opentdb.com/api.php?${params.toString()}`
        );

        const data = await resp.json();
        setQuestions(data.results ?? []);
        } catch (err) {
        console.error("Cannot fetch questions", err);
        }
      }
      fetchQuestions();
    }, [])

  return {
    questions
  }
}