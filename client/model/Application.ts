import { BaseApp } from '../core/BaseApp';
import { IApplicationStyles } from '../types/Application';

export class ApplicationDataModel extends BaseApp<any> {
  constructor() {
    super('application');
  }

  public formater(apiResponse: IApplicationStyles) {
    if (apiResponse) return apiResponse;
    return {
      theme: 'light',
      title: 'standard',
      subTitle: 'standard',
      descrption: 'standard',
      text: 'standard',
      label: 'standard',
      date: 'standard',
      breadCrumb: 'standard',
      sidebarItems: 'standard',
      divider: 'standard',
    };
  }
}
