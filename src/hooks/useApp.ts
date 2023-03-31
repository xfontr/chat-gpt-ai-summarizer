import App from "../components/App.js";
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
  const getOuterApp = (): HTMLElement =>
    $(setBaseClass("summarizer-app", true)) as HTMLElement;

  const getApp = (): HTMLElement =>
    $(setBaseClass("summarizer-app__content", true)) as HTMLElement;

  const mount = ({
    inject = true,
    setContent,
    fromLastBackup,
  }: MountOptions = {}): ReturnType<typeof App> => {
    const app = App();

    if (inject) injectHTML(app);
    if (setContent) updateNode(getApp(), setContent);
    if (fromLastBackup) updateNode(getApp(), getBackup());

    return app;
  };

  const unmount = (): void => {
    contentHistory.push(getApp());
    getOuterApp().remove();
  };

  const getBackup = (
    version: number = contentHistory.length - 1
  ): HTMLElement => contentHistory[version] ?? getApp();

  return {
    getOuterApp,
    getApp,
    getBackup,
    unmount,
    mount,
  };
};

export default useApp;
