import users from '../models/user.model';

export default class UserService {

  public async createUser(email: string, password: string, role: string): Promise<Object> {
    const candidate = await users.findOne({email});
    if(candidate) {
      throw new Error(`User ${email} already exists`);
    }

    const user = await users.create({email: email, password: password, role: role});

    return user;
  }
}