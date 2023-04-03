export const chromeSyncGet = async (key: string) =>
  await window?.chrome?.storage.sync.get(key);

export const chromeSyncSet = async (key: string, value: string | number) =>
  await window?.chrome?.storage.sync.set({ [key]: value });
