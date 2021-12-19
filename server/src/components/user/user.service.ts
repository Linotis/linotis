import users from './user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserService {

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
    const candidate = await users.findOne({email});

    if(candidate) {
      const passwordResult = bcrypt.compareSync(password, candidate.password);
      if(passwordResult) {
        const token = jwt.sign({
          email: candidate.email,
          userId: candidate._id
        }, process.env.JWT!, {expiresIn: 60 * 60});
        return token;
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('User not found');
    }
  }
}