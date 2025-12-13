import { ApplicationDataModel } from '../model/Application';
import { IApplicationStyles } from '../types/Application';

interface ApplicationStylesUpdate {
  theme?: string;
  title?: string;
  subTitle?: string;
  descrption?: string;
  text?: string;
  label?: string;
  date?: string;
  breadCrumb?: string;
  sidebarItems?: string;
  divider?: string;
}

const { success, error } = useToast();

export class ApplicationController extends ApplicationDataModel {
  constructor() {
    super();
  }

  private appStore = useApplicationStore();
  private userStore = useUserStore();
  private adminStore = useAdminStore();

  public getCacheData() {
    try {
      const cacheData = this.readObject();
      
      if (cacheData) {
        this.appStore._state.id = cacheData.id;
        this.appStore.setTheme(cacheData.theme);
        this.appStore.setTitleSize(cacheData.title);
        this.appStore.setSubTitleSize(cacheData.subTitle);
        this.appStore.setTextSize(cacheData.text);
        this.appStore.setDescrptionSize(cacheData.descrption);
        this.appStore.setLabelSize(cacheData.label);
        this.appStore.setDateSize(cacheData.date);
        this.appStore.setBreadCrumbSize(cacheData.breadCrumb);
        this.appStore.setSidebarItemsSize(cacheData.sidebarItems);
        this.appStore.setDividerSize(cacheData.divider);
      }
      
    } catch (err) {
      const textError = 'Category data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async getStyles(role: string): Promise<void> {
    this.getCacheData();
    if (role == 'admin') {
      if (!this.adminStore._state.admin?.id) return;
    } else {
      if (!this.userStore.getAuthenticated) return;
    }
    try {
      const requestResponse: IApplicationStyles =
        await this.Get(`/api/styles/all`);
      
      const format: IApplicationStyles = this.formater(requestResponse);
      
      this.appStore._state.id = format.id;
      this.appStore.setTheme(format.theme);
      this.appStore.setTitleSize(format.title);
      this.appStore.setSubTitleSize(format.subTitle);
      this.appStore.setTextSize(format.text);
      this.appStore.setDescrptionSize(format.descrption);
      this.appStore.setLabelSize(format.label);
      this.appStore.setDateSize(format.date);
      this.appStore.setBreadCrumbSize(format.breadCrumb);
      this.appStore.setSidebarItemsSize(format.sidebarItems);
      this.appStore.setDividerSize(format.divider);
      this.saveItem(this.appStore._state);
    } catch (err) {
      const textError = 'Styles data caching failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async updateStyle(param: ApplicationStylesUpdate): Promise<void> {
    await this.Patch(`/api/styles/${this.appStore._state.id}`, { ...param });
  }
}

export const applicationController = new ApplicationController();
