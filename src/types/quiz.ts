import type { User } from "./user";

export type MutationBook = {
  input: {
    title: string;
    author: string;
    categoryId: number;
    isRead: boolean;
  };
};

export type Quiz = {
  id: string;
  question: string;
  startCode: string;
  answerCode: string;
  input: string[];
  output: string[];
  answerComment: string | undefined;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date | undefined;
  quizResults?: QuizResult[];
  category?: QuizCategory;
  categoryId: number;
  level: number;
  inputExample: string[];
  outputExample: string[];
};

export type QuizCategory = {
  id: number;
  name: string;
};

export type QuizResult = {
  id: number;
  isCorrect: boolean;
  userResult: string;
  createdAt: string;
  updatedAt: string | undefined;
  quiz: Quiz;
  quizId: string;
  User: User[];
  userId: string;
};

export type MutationQuiz = {
  input: {
    question: string;
    startCode: string;
    answerCode: string;
    input: string[];
    output: string[];
    answerComment: string;
    hint: string;
    isPublic: boolean;
    categoryId: number;
    level: number;
    inputExample: string[];
    outputExample: string[];
  };
};

export type QuizPayload = {
  errors: {
    message?: string;
  }[];
  quiz: Quiz | null;
};
