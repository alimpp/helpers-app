import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';

interface IToast {
  title: string;
  text: string;
  type: string;
  id: string | number;
  timeout: number;
}

interface IAlert {
  title: string;
  text: string;
  type: string;
  id: string | number;
  timeout: number;
}

interface IApplication {
  id: string;
  theme: string;
  title: string;
  subTitle: string;
  descrption: string;
  text: string;
  label: string;
  date: string;
  breadCrumb: string;
  sidebarItems: string;
  divider: string;
  toastMessages: Array<IToast>;
  alert: IAlert;
  loading: Boolean;
  loadingText: string;
  loadingSub: string;
}

export class ApplicationStore extends BaseStore<IApplication> {
  private static _instance: ApplicationStore;

  public static getInstance(): ApplicationStore {
    if (!ApplicationStore._instance) {
      ApplicationStore._instance = new ApplicationStore();
    }
    return ApplicationStore._instance;
  }

  private constructor() {
    super('application', {
      id: '',
      theme: 'dark',
      title: 'standard',
      subTitle: 'standard',
      descrption: 'standard',
      text: 'standard',
      label: 'standard',
      date: 'standard',
      breadCrumb: 'standard',
      sidebarItems: 'standard',
      divider: 'standard',
      toastMessages: [],

      alert: {
        title: '',
        text: '',
        type: '',
        id: '',
        timeout: 0,
      },

      loading: false,
      loadingText: '',
      loadingSub: '',
    });
    StoreManager.register(this);
  }

  public setTitleSize(size: string) {
    this._state.title = size;
  }

  public setSubTitleSize(size: string) {
    this._state.subTitle = size;
  }

  public setTextSize(size: string) {
    this._state.text = size;
  }

  public setLabelSize(size: string) {
    this._state.label = size;
  }

  public setDateSize(size: string) {
    this._state.date = size;
  }

  public setBreadCrumbSize(size: string) {
    this._state.breadCrumb = size;
  }

  public setSidebarItemsSize(size: string) {
    this._state.sidebarItems = size;
  }

  public setDividerSize(size: string) {
    this._state.divider = size;
  }

  public setDescrptionSize(size: string) {
    this._state.descrption = size;
  }

  setTheme(theme: string) {
    this._state.theme = theme;
  }

  public setAlert(type: string, title: string, text: string, timeout: number) {
    this._state.alert = {
      title: title,
      text: text,
      type: type,
      id: this.generateId(),
      timeout: timeout,
    };
  }

  public resetAlert() {
    this._state.alert = {
      title: '',
      text: '',
      type: '',
      id: '',
      timeout: 0,
    };
  }

  public setLoading(loading: boolean, text: string, sub: string) {
    this._state.loading = loading;
    this._state.loadingText = text;
    this._state.loadingSub = sub;
  }

  public resetLoading() {
    this._state.loading = false;
    this._state.loadingText = '';
    this._state.loadingSub = '';
  }

  get getLoading() {
    return {
      state: this._state.loading,
      text: this._state.loadingText,
      sub: this._state.loadingSub,
    };
  }

  public reset() {
    this._state.toastMessages = [];
    this._state.alert = {
      title: '',
      text: '',
      type: '',
      id: '',
      timeout: 0,
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
