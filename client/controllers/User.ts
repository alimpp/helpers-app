import { UserDataModel } from '~/model/User';
import { ISaveUserData, IUserForServer } from '../types/User';

const { success, error } = useToast();

import { navigateTo } from 'nuxt/app';
class UserController extends UserDataModel {
  
  constructor() {
    super();
  }

  private userStore = useUserStore();

  private getCacheData() {
    const cacheUser = this.readObject();
    if (cacheUser) {
      this.userStore.setUser(cacheUser);
    }
  }

  async login (paylaod: IUserForServer) {
    try{
      const requestResponse: IUserForServer = await this.Post(`/api/auth/login`, paylaod);
      const response = requestResponse as { token: string };
      const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 });
      tokenCookie.value = response.token;
      success('Authenticated Success');
      navigateTo('/');
    }catch(err) {
      const textError = 'Login failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  async register (paylaod: IUserForServer) {
    try{
      const requestResponse: IUserForServer = await this.Post(`/api/auth/register`, paylaod);
      if(requestResponse) navigateTo('/auth/login')
    }catch(err) {
      const textError = 'Register failed';
      error(textError);
      console.error(err);
      throw new Error(textError);
    }
  }

  public async profile(): Promise<void> {
    this.getCacheData();
    const token = useCookie('token');
    this.userStore.setJwt(token.value ? token.value : '');
    if (token.value) {
      const requestResponse = await this.Get('/api/users/profile');
      if (requestResponse) this.userStore.setAuthenticated(true);
      const user = await this.profileParsed(requestResponse);
      this.userStore.setUser(user);
    }
  }

  async updateProfile(body: IUserForServer) {
    this.Patch('/api/users/update', body).then(() => {
      success('Profile Updated');
      this.profile();
    });
  }

  public logout() {
    const token = useCookie('token');
    token.value = '';
    this.clearStorage();
    this.userStore.logout();
    navigateTo('/');
    setTimeout(() => {
      location.reload();
    }, 10);
  }
}

export const userController = new UserController();
