export type QuizResult = {
  id: number;
  isCorrect: boolean;
  userResult: string;
  createdAt: Date;
  quizId: string;
  userId: string;
};

export type MutationQuizResult = {
  input: {
    isCorrect: boolean;
    userResult: string;
    quizId: string;
    userId: string;
  };
};

export type QuizResultPayload = {
  errors: {
    message: string;
  }[];
  quizResult: QuizResult;
};
