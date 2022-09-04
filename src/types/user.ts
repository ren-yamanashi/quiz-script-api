export type User = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date | undefined;
};

export type MutationUser = {
  input: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
  };
};

export type UserPayload = {
  errors: {
    message: string;
  }[];
  user: User;
};

const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
