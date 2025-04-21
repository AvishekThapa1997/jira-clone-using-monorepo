import { CreateUserDto, type UserDto } from "@jira-clone/core/types";

import { userDtoMapper } from "./userdto.mapper.js";
import { type User, users } from "@/schema/users.js";
import { db } from "@/lib/db.js";
import { eq } from "drizzle-orm";

export function getUserByEmail(
  email: string,
  includePassword?: true
): Promise<User | null>;
export function getUserByEmail(
  email: string,
  includePassword?: false
): Promise<Omit<User, "password" | "passwordSalt"> | null>;
export async function getUserByEmail(email: string, includePassword = false) {
  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      createdAt: users.createdAt,
      ...(includePassword
        ? { password: users.password, passwordSalt: users.passwordSalt }
        : {}),
    })
    .from(users)
    .where(eq(users.email, email))
    .execute();
  if (!user) {
    return null;
  }

  return user;
}

export async function getUserById(id: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .execute();
  if (!user) {
    return null;
  }

  return userDtoMapper.mapToDto(user);
}

export async function createUser(
  createUser: CreateUserDto
): Promise<UserDto | null> {
  const { email, name, password, passwordSalt } = createUser;
  const [newUser] = await db
    .insert(users)
    .values({
      email,
      name,
      password,
      passwordSalt,
    })
    .returning();

  if (!newUser) {
    return null;
  }
  return userDtoMapper.mapToDto(newUser);
}
