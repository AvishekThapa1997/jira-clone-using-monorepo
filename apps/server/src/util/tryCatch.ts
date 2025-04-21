export const tryCatch = <F extends (...args: any) => any>(operation: F) => {
  return async (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
    try {
      return operation(...args);
    } catch (err) {
      throw err;
    }
  };
};
