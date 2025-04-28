export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  password_salt: string;
  created_at: any;
  updated_at: any;
};

export const userCommonProps = "id, email, name, created_at, updated_at";
export const userPropsWithPassword = `${userCommonProps}, password, password_salt`;
