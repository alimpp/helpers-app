import { BaseApp } from "../core/BaseApp";

export class UserDataModel extends BaseApp<any> {
  constructor() {
    super("user");
  }

  async profileParsed(user: any) {
    const result = {
      fristname: user.fristname,
      lastname: user.lastname,
      id: user.id,
      email: user.email,
      bgColor: ''
    };
    this.saveItem(result);
    return result;
  }
}
