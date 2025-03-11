import { ValidationError } from '../types';
import { ZodSchema } from 'zod';

type ParseSchemaResult<Schema> = {
  data?: Schema;
  errors?: ValidationError<Schema>;
};

export const parseSchema = <Schema = ZodSchema>(
  schema: ZodSchema<Schema>,
  data: Partial<Schema>,
): ParseSchemaResult<Schema> => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { data: result.data };
  }
  const fieldErrors = result.error.flatten().fieldErrors as any;
  const errors: ValidationError<Schema> = Object.entries<string[]>(
    fieldErrors,
  ).reduce(
    (cumm, [key, value]) => {
      return {
        ...cumm,
        [key]: {
          message: value[0],
        },
      };
    },
    {} as ValidationError<Schema>, // Type assertion for initial value
  );

  return {
    errors,
  };
};
