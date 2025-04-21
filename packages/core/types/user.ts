export type UserDto = {
  id: string;
  name: string;
  email: string;
};

export type CreateUserDto = {
  email: string;
  name: string;
  password: string;
  passwordSalt: string;
};
