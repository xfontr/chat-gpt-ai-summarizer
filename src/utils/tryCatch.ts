const tryCatch = async <T = unknown, E = any>(
  callback: Function,
  ...args: unknown[]
): Promise<[T, E]> => {
  try {
    const response = await callback(...args);
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export default tryCatch;
