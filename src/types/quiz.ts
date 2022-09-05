import type { User } from "./user";

export type Quiz = {
  id: string;
  title: string;
  question: string;
  startCode: string;
  answerCode: string;
  answers: string[];
  answerComment: string | undefined;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date | undefined;
  quizResults?: QuizResult[];
  category?: QuizCategory;
  categoryId: number;
};

export type QuizCategory = {
  id: number;
  name: string;
};

export type QuizResult = {
  id: number;
  isCorrect: boolean;
  createdAt: string;
  updatedAt: string | undefined;
  quiz: Quiz;
  quizId: string;
  User: User[];
  userId: string;
};

export type MutationQuiz = {
  input: {
    title: string;
    question: string;
    startCode: string;
    answerCode: string;
    answers: string[];
    answerComment: string;
    hint: string;
    isPublic: boolean;
    categoryId: number;
  };
};

export type QuizPayload = {
  errors: {
    message?: string;
  }[];
  quiz: Quiz | null;
};
