import { buildJsonSchemas } from "fastify-zod";
import { types } from "node:util";
import { z } from "zod";
const signUpSchema = z.object({
  name: z.string().min(2, "Имя должно содержать хотя бы 2 символа").max(255),
  email: z.string().email("Некорректный формат электронной почты"),
  password: z
    .string()
    .min(8, "Пароль должен содержать хотя бы 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
    .regex(/[\W_]/, "Пароль должен содержать хотя бы один специальный символ"),
});

const singInUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type SignInUserInput = z.infer<typeof singInUserSchema>;
export type SignUpUserInput = z.infer<typeof signUpSchema>;

const signInUserResponse = z.object({
  message: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

const signUpUserResponse = z.object({
  message: z.string(),
  data: signUpSchema.omit({ password: true }).extend({
    id: z.number(),
  }),
});

const getUserResonse = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  role:z.string(),
});

const refreshTockenRequest = z.object({
  refreshToken: z.string(),
});
const refreshTockenResponse = z.object({
  accessToken: z.string(),
});

//ressetPasword
const forgotPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string(),
  newPassword: z.string(),
});

const forgotPasswordRequest = forgotPasswordSchema.omit({
  code: true,
  newPassword: true,
});
const forgotPasswordResponse = z.object({
  message: z.string(),
});
//verifyResetCode
const verifyResetCodeRequest = forgotPasswordSchema.omit({
  email: true,
  newPassword: true,
});
//resetPassword
const resetPasswordRequest = forgotPasswordSchema.omit({
  code: true,
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordRequest>;
export type VerifyResetCodeInput = z.infer<typeof verifyResetCodeRequest>;
export type ResetPasswordInput = z.infer<typeof resetPasswordRequest>;

export const { schemas: authSchema, $ref } = buildJsonSchemas(
  {
    getUserResonse,
    singInUserSchema,
    signInUserResponse,
    signUpSchema,
    signUpUserResponse,
    refreshTockenResponse,
    refreshTockenRequest,
    forgotPasswordRequest,
    forgotPasswordResponse,
    verifyResetCodeRequest,
    resetPasswordRequest,
  },
  { $id: "Auth" }
);
