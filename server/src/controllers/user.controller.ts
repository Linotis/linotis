import { Request, Response } from "express";
import UserService from '../services/user.service';

export default class UserController {

  private userService: UserService = new UserService();

  async login(req: Request, res: Response) {
    try {
      const{email, password} = req.body;
      const token = await this.userService.loginUser(email, password);
      return res.status(200).json({token: `Bearer ${token}`});
    } catch(e) {}
  }

  async register(req: Request, res: Response) {
    try {
      const {email, password, role} = req.body;
      const user = await this.userService.createUser(email, password, role);
      return res.status(201).json({message: 'Ok'});
    } catch(e) {}
  }  
};