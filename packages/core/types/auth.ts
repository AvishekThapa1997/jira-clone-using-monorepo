import * as zod from "zod";
import {
  signInSchema,
  signUpSchema,
  tokenDetailSchema,
} from "../schema/auth.js";
import { type UserDto } from "./user.js";
export type SignUpSchema = zod.infer<typeof signUpSchema>;
export type SignInSchema = zod.infer<typeof signInSchema>;
export type AccessToken = zod.infer<typeof tokenDetailSchema>;
export type TokenResult = {
  accessToken: string;
  expireAt: string;
  refreshToken: string;
  user: UserDto;
};
export type AuthResult = Omit<TokenResult, "refreshToken">;

export type JwtTokenPayload = {
  userId: UserDto["id"];
};
