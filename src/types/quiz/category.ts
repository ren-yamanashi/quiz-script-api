export type QuizCategory = {
  id: number;
  name: string;
};

export type MutationCategory = {
  input: {
    name: string;
  };
};

export type QuizCategoryPayload = {
  errors: {
    message?: string;
  }[];
  quizCategory: QuizCategory;
};
