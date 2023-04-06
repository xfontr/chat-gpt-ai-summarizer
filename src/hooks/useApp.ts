import App from "../components/App.js";
import { useTokens } from "../stores/tokens.store.js";
import injectHTML from "../utils/injectHTML.js";
import { $ } from "../utils/querySelector.js";
import { updateNode } from "../utils/renderUtils.js";
import { setBaseClass } from "../utils/setBaseClass.js";

type MountOptions = Partial<{
  inject: boolean;
  setContent: HTMLElement;
  fromLastBackup: boolean;
}>;

const contentHistory: HTMLElement[] = [];

const useApp = () => {
  const getApp = (): HTMLElement =>
    $(setBaseClass("summarizer-app", true)) as HTMLElement;

  const mount = ({
    inject = true,
    setContent,
    fromLastBackup,
  }: MountOptions = {}): ReturnType<typeof App> => {
    const app = App();

    if (inject) injectHTML(fromLastBackup ? getBackup() : app);
    if (setContent) updateNode(getApp(), setContent);

    return app;
  };

  const unmount = (): void => {
    contentHistory.push(getApp());
    getApp().remove();
  };

  const getBackup = (
    version: number = contentHistory.length - 1
  ): HTMLElement => contentHistory[version] ?? getApp();

  const init = async () => {
    const { init: initTokens } = useTokens();
    await initTokens();
    mount();
  };

  return {
    getApp,
    getBackup,
    unmount,
    mount,
    init,
  };
};

export default useApp;
