chrome.runtime.onMessage.addListener(({ type, key }, _, sendResponse) => {
  if (type === "getEnvironmentKey") {
    sendResponse(chrome.runtime.getManifest().env[key]);
    return;
  }

  sendResponse("");
});
