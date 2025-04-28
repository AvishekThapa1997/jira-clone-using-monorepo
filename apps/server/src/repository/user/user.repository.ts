import { CreateUserDto, type UserDto } from "@jira-clone/core/types";

import { query } from "@/lib/db.js";
import {
  userCommonProps,
  userPropsWithPassword,
  type User,
} from "@/model/user.js";
import { userDtoMapper } from "./userdto.mapper.js";

export function getUserByEmail(
  email: string,
  includePassword?: true
): Promise<User | null>;
export function getUserByEmail(
  email: string,
  includePassword?: false
): Promise<Omit<User, "password" | "passwordSalt"> | null>;
export async function getUserByEmail(email: string, includePassword = false) {
  const result = await query<User>({
    text: `SELECT ${includePassword ? userPropsWithPassword : userCommonProps} FROM users WHERE email = $1`,
    values: [email],
  });
  const user = result.rows?.[0];
  if (!user) {
    return null;
  }
  return user as any;
}

export async function getUserById(id: string) {
  const result = await query<User>({
    text: `SELECT ${userCommonProps} FROM users WHERE id = $1`,
    values: [id],
  });
  const user = result.rows?.[0];
  if (!user) {
    return null;
  }

  return userDtoMapper.mapToDto(user as any);
}

export async function createUser(
  createUser: CreateUserDto
): Promise<UserDto | null> {
  const { email, name, password, passwordSalt } = createUser;
  const result = await query<User>({
    text: "INSERT INTO users(email, name, password, password_salt) VALUES($1, $2, $3, $4) RETURNING *",
    values: [email, name, password, passwordSalt],
  });
  const newUser = result.rows?.[0];
  if (!newUser) {
    return null;
  }
  return userDtoMapper.mapToDto(newUser as any);
}
