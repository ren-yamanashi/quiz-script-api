export type QuizResult = {
  id: number;
  isCorrect: boolean;
  createdAt: Date;
  quizId: string;
  userId: string;
};

export type MutationQuizResult = {
  input: {
    isCorrect: boolean;
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
