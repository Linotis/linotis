import { Application, Request, Response } from 'express';
import passport from 'passport';
import UserController from './user.controller';

export class UserRoutes {

  private userController: UserController = new UserController();
  
	public route(app: Application): void {
		app.post('/api/auth/login', (req: Request, res: Response) => {
      this.userController.login(req, res);
	  });

    app.post('/api/auth/register', (req: Request, res: Response) => {
      this.userController.register(req, res);
    });

    app.get('/api/user', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.userController.getById(req, res);
    });

    app.patch('/api/user', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.userController.updateUser(req, res);
    })
	}
}