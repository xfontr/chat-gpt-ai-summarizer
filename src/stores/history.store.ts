const history: [string, string][] = [];

export const historyStore = () => {
  const getAllHistory = (): typeof history => [...history];

  const addHistory = (inputText: string, completionText: string) => {
    history.push([inputText, completionText]);
  };

  return () => ({
    getAllHistory,
    addHistory,
  });
};

export const useHistory = historyStore();
