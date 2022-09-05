import validator from "validator";
import bcrypt from "bcryptjs";
// types
import type { Context } from "../types/prisma";
import type { MutationQuiz, QuizPayload } from "../types/quiz";
import type { MutationCategory } from "../types/quiz/category";
import type { MutationUser, UserPayload } from "../types/user";
import type { QuizCategoryPayload } from "../types/quiz/category";
import type {
  MutationQuizResult,
  QuizResultPayload,
} from "../types/quiz/result";

export const resolvers = {
  Query: {
    users: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.user.findMany();
    },
    user: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return await prisma.user.findUnique({
        where: {
          id,
        },
      });
    },
    quizzes: async (
      _: any,
      { isPublic }: { isPublic: boolean },
      { prisma }: Context
    ) => {
      return await prisma.quiz.findMany({
        where: {
          isPublic,
        },
      });
    },
    quiz: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      const quiz = await prisma.quiz.findUnique({
        where: {
          id,
        },
      });
      if (!quiz) return "クイズが見つかりませんでした";
      return quiz;
    },
    quizCategories: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.quizCategory.findMany();
    },
    quizCategory: async (
      _: any,
      { id }: { id: number },
      { prisma }: Context
    ) => {
      const quizCategory = await prisma.quizCategory.findUnique({
        where: {
          id,
        },
      });
      if (!quizCategory) return "カテゴリが見つかりませんでした";
      return quizCategory;
    },
    quizResults: async (_: any, __: any, { prisma }: Context) => {
      return await prisma.quizResult.findMany();
    },
    quizResult: async (_: any, { id }: { id: number }, { prisma }: Context) => {
      const quizResult = await prisma.quizResult.findUnique({
        where: {
          id,
        },
      });
      if (!quizResult) return "クイズ結果が見つかりませんでした";
      return quizResult;
    },
  },

  Mutation: {
    addQuiz: async (
      _: any,
      { input }: MutationQuiz,
      { prisma }: Context
    ): Promise<QuizPayload> => {
      const {
        title,
        question,
        startCode,
        answerCode,
        answers,
        answerComment,
        hint,
        isPublic,
        categoryId,
      } = input;
      const newQuiz = await prisma.quiz.create({
        data: {
          title,
          question,
          startCode,
          answerCode,
          answers,
          answerComment,
          hint,
          isPublic,
          categoryId,
        },
      });
      return {
        errors: [],
        quiz: newQuiz,
      };
    },
    addQuizCategory: async (
      _: any,
      { input }: MutationCategory,
      { prisma }: Context
    ): Promise<QuizCategoryPayload> => {
      const { name } = input;
      if (!name) {
        return {
          errors: [
            {
              message: "カテゴリーの名前を入力してください",
            },
          ],
          quizCategory: null,
        };
      } else {
        const newCategory = await prisma.quizCategory.create({
          data: {
            name,
          },
        });
        return {
          errors: [],
          quizCategory: newCategory,
        };
      }
    },
    addQuizResult: async (
      _: any,
      { input }: MutationQuizResult,
      { prisma }: Context
    ): Promise<QuizResultPayload> => {
      const { isCorrect, quizId, userId } = input;
      if (!(isCorrect && quizId && userId))
        return {
          errors: [
            {
              message: "結果内容を入力してください",
            },
          ],
          quizResult: null,
        };
      const newResult = await prisma.quizResult.create({
        data: {
          isCorrect,
          quizId,
          userId,
        },
      });
      return {
        errors: [],
        quizResult: newResult,
      };
    },
    signup: async (
      _: any,
      { input }: MutationUser,
      { prisma }: Context
    ): Promise<UserPayload> => {
      const { name, email, password, role } = input;
      const hashedPassword = await bcrypt.hash(password, 10);
      const isEmail = validator.isEmail(email);
      const isPassword = validator.isLength(password, {
        min: 6,
      });

      // emailValidation
      if (!isEmail)
        return {
          errors: [
            {
              message: "有効なメールアドレスではありません",
            },
          ],
          user: null,
        };
      // passwordValidation
      if (!isPassword) {
        return {
          errors: [
            {
              message: "パスワードは6文字以上で入力してください",
            },
          ],
          user: null,
        };
      }
      // 必要情報の入力がないとき
      if (!(name && email && password))
        return {
          errors: [
            {
              message: "ユーザー情報を入力してください",
            },
          ],
          user: null,
        };
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
        },
      });
      return {
        errors: [],
        user: newUser,
      };
    },
    signIn: async (
      _: any,
      { email, password }: { email: string; password: string },
      { prisma }: Context
    ): Promise<UserPayload> => {
      const user = await prisma.user.findMany({
        // findUniqueだとid検索の型指定になるので、findMany
        where: {
          email,
        },
      });
      if (!user)
        return {
          errors: [
            {
              message: "メールアドレスに誤りがあります",
            },
          ],
          user: null,
        };
      const findUser = user[0];
      const comparePassword = await bcrypt.compare(password, findUser.password);
      if (!comparePassword)
        return {
          errors: [
            {
              message: "パスワードに誤りがあります",
            },
          ],
          user: null,
        };
      return {
        errors: [],
        user: findUser,
      };
    },
    deleteUser: async (
      _: any,
      { id }: { id: string },
      { prisma }: Context
    ): Promise<UserPayload> => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return {
          errors: [
            {
              message: "ユーザーが見つかりませんでした",
            },
          ],
          user: null,
        };
      } else {
        await prisma.user.delete({
          where: {
            id,
          },
        });
        return {
          errors: [],
          user,
        };
      }
    },
    deleteQuiz: async (
      _: any,
      { id }: { id: string },
      { prisma }: Context
    ): Promise<QuizPayload> => {
      const quiz = await prisma.quiz.findUnique({
        where: {
          id,
        },
      });
      if (!quiz) {
        return {
          errors: [
            {
              message: "クイズが見つかりませんでした",
            },
          ],
          quiz: null,
        };
      } else {
        await prisma.quiz.delete({
          where: {
            id,
          },
        });
        return {
          errors: [],
          quiz,
        };
      }
    },
    deleteQuizCategory: async (
      _: any,
      { id }: { id: number },
      { prisma }: Context
    ): Promise<QuizCategoryPayload> => {
      const quizCategory = await prisma.quizCategory.findUnique({
        where: {
          id,
        },
      });
      if (!quizCategory) {
        return {
          errors: [
            {
              message: "カテゴリが見つかりませんでした",
            },
          ],
          quizCategory: null,
        };
      } else {
        await prisma.quizCategory.delete({
          where: {
            id,
          },
        });
        return {
          errors: [],
          quizCategory,
        };
      }
    },
    deleteQuizResult: async (
      _: any,
      { id }: { id: number },
      { prisma }: Context
    ) => {
      const quizResult = await prisma.quizResult.findUnique({
        where: {
          id,
        },
      });
      if (!quizResult) {
        return {
          errors: [
            {
              message: "クイズ結果が見つかりませんでした",
            },
          ],
          quizResult: null,
        };
      } else {
        await prisma.quizResult.delete({
          where: {
            id,
          },
        });
        return {
          errors: [],
          quizResult,
        };
      }
    },
    updateQuizResult: async (
      _: any,
      { id, input }: { id: number; input: MutationQuizResult["input"] },
      { prisma }: Context
    ) => {
      const quizResult = await prisma.quizResult.findUnique({
        where: {
          id,
        },
      });
      if (!quizResult)
        return {
          errors: [
            {
              message: "クイズ結果が見つかりませんでした",
            },
          ],
          quizResult: null,
        };
      const newResult = await prisma.quizResult.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
      return {
        errors: [],
        quizResult: newResult,
      };
    },
    updateUser: async (
      _: any,
      { id, input }: { id: string; input: { name: string; email: string } },
      { prisma }: Context
    ) => {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user)
        return {
          errors: [
            {
              message: "ユーザーが見つかりませんでした",
            },
          ],
          user: null,
        };
      const newUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
      return {
        errors: [],
        user: newUser,
      };
    },
    updateQuiz: async (
      _: any,
      { id, input }: { id: string; input: MutationQuiz["input"] },
      { prisma }: Context
    ) => {
      const quiz = await prisma.quiz.findUnique({
        where: {
          id,
        },
      });
      if (!quiz)
        return {
          errors: [
            {
              message: "クイズが見つかりませんでした",
            },
          ],
          quiz: null,
        };
      const newQuiz = await prisma.quiz.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
      return {
        errors: [],
        quiz: newQuiz,
      };
    },
    updateQuizCategory: async (
      _: any,
      { id, input }: { id: number; input: MutationCategory },
      { prisma }: Context
    ) => {
      const quizCategory = await prisma.quizCategory.findUnique({
        where: {
          id,
        },
      });
      if (!quizCategory)
        return {
          errors: [
            {
              message: "カテゴリが見つかりませんでした",
            },
          ],
          quizCategory: null,
        };
      const newCategory = await prisma.quizCategory.update({
        where: {
          id,
        },
        data: {
          ...input,
        },
      });
      return {
        errors: [],
        quizCategory: newCategory,
      };
    },
  },

  User: {
    quizResults: ({ id }: { id: string }, __: any, { prisma }: Context) => {
      return prisma.quizResult.findMany({
        where: {
          userId: id,
        },
      });
    },
  },
  Quiz: {
    category: (
      { categoryId }: { categoryId: number },
      __: any,
      { prisma }: Context
    ) => {
      return prisma.quizCategory.findUnique({
        where: {
          id: categoryId,
        },
      });
    },
    quizResults: ({ id }: { id: string }, __: any, { prisma }: Context) => {
      return prisma.quizResult.findMany({
        where: {
          quizId: id,
        },
      });
    },
  },
  QuizResult: {
    quiz: ({ quizId }: { quizId: string }, __: any, { prisma }: Context) => {
      console.log(quizId);
      return prisma.quiz.findUnique({
        where: {
          id: quizId,
        },
      });
    },
    user: ({ userId }: { userId: string }, __: any, { prisma }: Context) => {
      console.log(userId);
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
  },
  QuizCategory: {
    quizzes: ({ id }: { id: number }, __: any, { prisma }: Context) => {
      return prisma.quiz.findMany({
        where: {
          categoryId: id,
        },
      });
    },
  },
};
