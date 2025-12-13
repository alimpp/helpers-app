import { BaseApp } from "../core/BaseApp";
import type { IAdminInfo } from "@/types/Admin";

export class AdminDataModel extends BaseApp<any> {
  constructor() {
    super("admin");
  }

  async profileParsed(admin: IAdminInfo) {
    const result = {
      username: admin.username,
      password: admin.password,
      id: admin.id,
      role: admin.role,
    };
    this.saveItem(result);
    return result;
  }
}
