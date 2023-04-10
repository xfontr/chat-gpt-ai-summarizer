import { ENDPOINTS } from "../configs/constants";
import { freeApi } from "../services/api";
import { decrypt, encrypt } from "../services/encrypt";
import {
  chromeSyncDelete,
  chromeSyncGet,
  chromeSyncSet,
} from "../utils/chromeSync";

const API_KEY_KEY = "API_KEY";

let cachedApiKey: string | null = null;

const apiKeyStore = () => {
  const init = async (): Promise<void> => {
    const getApiKey = await chromeSyncGet(API_KEY_KEY);

    cachedApiKey = decrypt(getApiKey[API_KEY_KEY]) || null;
  };

  const getApiKey = (): string | null => cachedApiKey;

  const setApiKey = async (key: string): Promise<boolean> => {
    const isValid = await isApiKeyValid(key);

    if (!isValid) {
      return false;
    }

    await chromeSyncSet(API_KEY_KEY, encrypt(key));
    cachedApiKey = key || cachedApiKey;

    return true;
  };

  const isApiKeyValid = async (key: string): Promise<boolean> => {
    const response: any = await freeApi.getWithAuth(
      ENDPOINTS.verifyApiKey,
      key
    );

    return !!response[0];
  };

  const deleteApiKey = async (): Promise<void> => {
    await chromeSyncDelete(API_KEY_KEY);
    cachedApiKey = null;
  };

  return () => ({
    init,
    getApiKey,
    setApiKey,
    isApiKeyValid,
    deleteApiKey,
  });
};

export const useApiKey = apiKeyStore();
