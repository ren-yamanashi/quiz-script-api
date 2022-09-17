import { gql } from "apollo-server";

// gqlでschemaを定義
export const typeDefs = gql`
  # type
  type Query {
    quizzes(isPublic: Boolean): [Quiz]!
    quiz(id: String!): Quiz
    quizCategories: [QuizCategory!]!
    quizCategory(id: Int!): QuizCategory
    quizResults: [QuizResult!]!
    quizResult(id: Int!): QuizResult
    users: [User!]!
    user(id: String!): User
  }

  type Mutation {
    # signIn(email: String!, password: String!): AuthPayload
    ## add
    signup(input: SignupInput!): AuthPayload!
    signIn(email: String!, password: String!): AuthPayload!
    addQuiz(input: AddQuizInput!): QuizPayload!
    addQuizCategory(input: AddQuizCategoryInput!): QuizCategoryPayload!
    addQuizResult(input: AddQuizResultInput!): QuizResultPayload!
    ## update
    updateUser(id: String!, input: UpdateUserInput!): AuthPayload!
    updateQuiz(id: String!, input: UpdateQuizInput!): QuizPayload!
    updateQuizCategory(
      id: Int!
      input: UpdateQuizCategoryInput!
    ): QuizCategoryPayload!
    updateQuizResult(
      id: Int!
      input: UpdateQuizResultInput!
    ): QuizResultPayload!
    deleteQuiz(id: String!): QuizPayload!
    deleteQuizCategory(id: Int!): QuizCategoryPayload!
    deleteQuizResult(id: Int!): QuizResultPayload!
    deleteUser(id: String!): AuthPayload!
  }

  enum UserRole {
    ADMIN
    USER
  }

  type User {
    id: String!
    name: String!
    email: String!
    password: String!
    role: UserRole
    createdAt: String!
    quizResults: [QuizResult]
  }

  type Quiz {
    id: String!
    title: String!
    question: String!
    startCode: String!
    answerCode: String!
    inputFormat: String!
    outputFormat: String!
    inputExample: [String!]!
    outputExample: [String!]!
    inputDescription: [String]
    outputDescription: [String]
    conditions: String
    answerComment: String
    isPublic: Boolean!
    createdAt: String!
    updatedAt: String
    quizResults: [QuizResult]
    category: QuizCategory
    categoryId: Int!
    level: Int!
  }
  type QuizCategory {
    id: Int!
    name: String!
    quizzes: [Quiz]
  }
  type QuizResult {
    id: Int!
    isCorrect: Boolean!
    userResult: String!
    createdAt: String!
    quiz: Quiz!
    quizId: String!
    user: User!
    userId: String!
  }
  type Error {
    message: String!
  }

  # payloadTypes
  type AuthPayload {
    errors: [Error!]!
    user: User
  }
  type QuizPayload {
    errors: [Error!]!
    quiz: Quiz
  }
  type QuizCategoryPayload {
    errors: [Error!]!
    quizCategory: QuizCategory!
  }
  type QuizResultPayload {
    errors: [Error!]!
    quizResult: QuizResult!
  }

  # inputTypes
  ## add
  input SignupInput {
    name: String!
    email: String!
    password: String!
    role: UserRole!
  }
  input SignInInput {
    email: String!
    password: String!
  }
  input AddQuizInput {
    title: String!
    question: String!
    startCode: String!
    answerCode: String!
    inputFormat: String!
    outputFormat: String!
    inputExample: [String!]!
    outputExample: [String!]!
    inputDescription: [String]
    outputDescription: [String]
    conditions: String
    answerComment: String
    isPublic: Boolean!
    categoryId: Int!
    level: Int!
  }
  input AddQuizCategoryInput {
    name: String!
  }
  input AddQuizResultInput {
    isCorrect: Boolean!
    userResult: String!
    quizId: String!
    userId: String!
  }
  ## update
  input UpdateUserInput {
    name: String
    email: String
  }
  input UpdateQuizResultInput {
    isCorrect: Boolean
    userResult: String
    quizId: String
    userId: String
  }
  input UpdateQuizInput {
    title: String
    question: String
    startCode: String
    answerCode: String
    inputFormat: String
    outputFormat: String
    inputExample: [String]
    outputExample: [String]
    inputDescription: [String]
    outputDescription: [String]
    conditions: String
    answerComment: String
    isPublic: Boolean
    categoryId: Int
    level: Int
  }
  input UpdateQuizCategoryInput {
    name: String
  }
`;
