const tryCatch = async <T = unknown, E = unknown>(
  callback: Function,
  ...args: unknown[]
): Promise<[T | null, E | unknown]> => {
  try {
    const response = await callback(...args);
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export default tryCatch;
