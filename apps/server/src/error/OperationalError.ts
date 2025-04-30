class OperationalError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: any,
    public isValidationError?: boolean
  ) {
    super(message);
    Error.captureStackTrace(this, OperationalError);
  }
}

export { OperationalError };
