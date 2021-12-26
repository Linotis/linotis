import users from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUser from './user.interface';

export default class UserService {

  private jwtSecret = process.env.JWT!;

  public async createUser(userParams): Promise<Object> {
    const candidate = await users.findOne({email: userParams.email});
    
    if(candidate) {
      throw new Error(`User ${userParams.email} already exists`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userParams.password, salt);
    const user = await users.create(
        { email: userParams.email,
          password: hashPassword,
          firstName: userParams.firstName,
          lastName: userParams.lastName,
          age: userParams.age,
          role: userParams.role
        }
      );
    return user;
  }

  public async loginUser(email: string, password: string): Promise<String> {
    const user = await this.checkUser(email);
    if(user) {
      const passwordResult = bcrypt.compareSync(password, user.password);
      if(passwordResult) {
        const token = this.createToken(user.email, user._id, this.jwtSecret);
        return token;
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('User not found');
    }
  }

  public async createToken(email: string, userId: string, jwtSecret:string): Promise<String> {
    const token = jwt.sign({
      email: email,
      userId: userId
    }, jwtSecret, {expiresIn: 60 * 60});
    return token;
  }

  public async checkUser(email: string): Promise<(IUser & {_id: any;}) | null> {
    const candidate = await users.findOne({email});
    return candidate;
  }
}