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
  title: string;
  question: string;
  startCode: string;
  answerCode: string;
  inputFormat: string;
  outputFormat: string;
  inputExample: string[];
  outputExample: string[];
  inputDescription?: string[];
  outputDescription?: string[];
  conditions?: string;
  answerComment?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt?: Date;
  quizResults?: QuizResult[];
  category?: QuizCategory;
  categoryId: number;
  level: number;
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
    title: string;
    question: string;
    startCode: string;
    answerCode: string;
    inputFormat: string;
    outputFormat: string;
    inputExample: string[];
    outputExample: string[];
    inputDescription?: string[];
    outputDescription?: string[];
    conditions?: string;
    answerComment?: string;
    isPublic: boolean;
    categoryId: number;
    level: number;
  };
};

export type QuizPayload = {
  errors: {
    message?: string;
  }[];
  quiz: Quiz | null;
};
