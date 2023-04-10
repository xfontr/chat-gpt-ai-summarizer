import chrome from "../services/chrome";

export const chromeSyncGet = async (key: string) =>
  await chrome!.storage.sync.get(key);

export const chromeSyncSet = async (
  key: string,
  value: string | number | undefined
) => await chrome!.storage.sync.set({ [key]: value });

export const chromeSyncDelete = async (key: string): Promise<void> =>
  await chrome!.storage.sync.remove(key);
