import { Request, Response } from "express";
import UserService from './user.service';

export default class UserController {

  private userService: UserService = new UserService();

  async login(req: Request, res: Response) {
    try {
      const{email, password} = req.body;
      const token = await this.userService.loginUser(email, password);
      return res.status(200).json({token: `Bearer ${token}`});
    } catch(e: any) {
      return res.status(400).json({message: e.message});
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userParams = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        role: req.body.role
      }
      //const {email, password, firstName, lastName, age, role} = req.body;
      await this.userService.createUser(userParams);
      return res.status(201).json({message: 'Ok'});
    } catch(e: any) {
      return res.status(400).json({message: e.message});
    }
  }  
};