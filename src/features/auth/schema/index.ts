import { z } from 'zod';
import { ERROR_MESSAGES, PASSWORD_LENGTH } from '../constants';

const signInSchema = z.object({
  email: z
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .nonempty(ERROR_MESSAGES.EMAIL_REQUIRED),
  password: z.string().nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED),
});

const signUpSchema = z.object({
  email: z
    .string()
    .email(ERROR_MESSAGES.INVALID_EMAIL)
    .nonempty(ERROR_MESSAGES.EMAIL_REQUIRED),
  name: z.string().nonempty(ERROR_MESSAGES.NAME_REQUIRED),
  password: z
    .string()
    .min(PASSWORD_LENGTH.MIN, ERROR_MESSAGES.PASSWORD_MIN_LENGTH)
    .max(PASSWORD_LENGTH.MAX, ERROR_MESSAGES.PASSWORD_MAX_LENGTH)
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED),
});

export { signInSchema, signUpSchema };
