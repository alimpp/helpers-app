import type { IAdminInfo } from '@/types/Admin';
import { BaseStore } from '../../core/BaseStore';
import { StoreManager } from '../../core/StoreManager';

interface IAdminState {
  admin: IAdminInfo;
  jwtToken: string;
  isAuthenticated: boolean;
  moduleState: string;
}

export class AdminStore extends BaseStore<IAdminState> {
  private static _instance: AdminStore;

  public static getInstance(): AdminStore {
    if (!AdminStore._instance) {
      AdminStore._instance = new AdminStore();
    }
    return AdminStore._instance;
  }

  private constructor() {
    super('user', {
      admin: {
        id: '',
        username: '',
        password: '',
        role: '',
      },
      jwtToken: '',
      isAuthenticated: false,
      moduleState: '',
    });

    StoreManager.register(this);
  }

  get getModuleState(): string {
    return this._state.moduleState;
  }

  public setModuleState(moduleState: string) {
    this._state.moduleState = moduleState;
  }

  setJwt(jwt: string) {
    this._state.jwtToken = jwt;
  }

  public get getAdmin() {
    return this._state.admin;
  }

  setAdmin(user: IAdminInfo) {
    this._state.admin = user;
  }

  setAuthenticated(flag: boolean) {
    this._state.isAuthenticated = flag;
  }

  public reset() {
    ((this._state.admin = {
      id: '',
      username: '',
      password: '',
      role: '',
    }),
      (this._state.jwtToken = ''));
    this._state.isAuthenticated = false;
    this._state.moduleState = '';
  }
}
