import { AdminDataModel } from '~/model/Admin';
import type { IAdminInfo } from '~/types/Admin';
const { success, error } = useToast();

class AdminController extends AdminDataModel {
  
  constructor() {
    super();
  }

  private adminStore = useAdminStore();

  private getCacheData() {
    const cacheUser = this.readObject();
    if (cacheUser) {
      this.adminStore.setAdmin(cacheUser);
    }
  }

  async login(body: { username: string; password: string }) {
    await this.Post('/api/auth/login', body)
      .then((res: unknown) => {
        const response = res as { token: string };
        const tokenCookie = useCookie('token', { maxAge: 60 * 60 * 24 });
        tokenCookie.value = response.token;
        success('Authenticated Success');
        navigateTo('/admin/dashboard');
      })
      .catch((err) => {
        err('Username or password is not valid');
      });
  }

  async getInfo() {
    this.getCacheData();
    const response: IAdminInfo = await this.Get('/api/admin/info');
    const parsedData = await this.profileParsed(response);
    this.adminStore.setAdmin(parsedData);
  }
}

export const adminController = new AdminController();
