import { requestCommonHeaders } from "./shared.js";

export const PASSWORD_LENGTH = {
  MIN: 8,
  MAX: 16,
};

export const SIGNIN_FORM_FIELDS = [
  {
    name: "email",
    type: "email",
    required: true,
    placeholder: "Enter email",
    "aria-label": "email",
  },
  {
    name: "password",
    type: "password",
    required: true,
    placeholder: "Enter password",
    "aria-label": "password",
  },
];

export const SIGNUP_FORM_FIELDS = [
  {
    type: "text",
    required: true,
    "aria-label": "username",
    placeholder: "Enter name",
    name: "name",
  },
  ...SIGNIN_FORM_FIELDS,
];

export const ERROR_MESSAGES = {
  INVALID_EMAIL: "Invalid email address",
  NAME_REQUIRED: "Name is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
  PASSWORD_MAX_LENGTH: "Password must be at most 16 characters long",
  PASSWORD_REQUIRED: "Password is required",
  EMAIL_REQUIRED: "Email is required",
  NAME_MIN_LENGTH: "Name must be at least 1 character long",
};

export const CONSTANTS = {
  ACCESS_TOKEN_EXPIRATION_KEY: "access_token",
  ACCESS_TOKEN_EXPIRATION_THRESHOLD: 5 * 60 * 1000, // 5 min
};

export const AUTH_API = {
  SIGN_IN: {
    ...requestCommonHeaders,
    url: "/api/auth/sign-in",
    method: "POST",
  },
  SIGN_UP: {
    ...requestCommonHeaders,
    url: "/api/auth/sign-up",
    method: "POST",
  },
  SESSION: {
    ...requestCommonHeaders,
    url: "/api/auth/session",
    method: "GET",
  },
  REFRESH_TOKEN: {
    ...requestCommonHeaders,
    url: "/api/auth/access-token",
    method: "GET",
  },
};
