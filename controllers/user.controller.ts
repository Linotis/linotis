
import { Request, Response } from "express";
import UserService from '../services/user.service';

export default class UserController {

  private userService: UserService = new UserService();

  async register(req: Request, res: Response) {
    try {
      const {email, password, role} = req.body;
      const user = this.userService.createUser(email, password, role);
      return res.status(201).json(user);
    } catch(e) {}
  }  
}