import {ExtractJwt, Strategy} from 'passport-jwt';
import users from '../models/user.model';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT
}


export default async function checkPassport(passport): Promise<any> {
  passport.use(new Strategy(options, async(payload, done) => {
    try {
      const user = await users.findById(payload.userId).select('email id');
      if(user) {
        done(null, user);
      }else {
        done(null, false);
      }
    } catch(e) {
      console.log(e);
    }
  }));
}