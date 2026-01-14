export type Difficulty = "easy" | "medium" | "hard";
export type QuestionType = "multiple" | "boolean";

export interface ICategory {
  id: number;
  name: string;
}

export interface IQuestion {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ILeaderboards {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  score: number;
}
