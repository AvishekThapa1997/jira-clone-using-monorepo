import * as zod from 'zod';
import { signInSchema, signUpSchema } from '../schema/auth';
export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type SignInSchema = zod.infer<typeof signInSchema>;
