import { Application, Request, Response } from 'express';
import ScribbleController from '../controllers/scribble.controller';
import passport from 'passport';

export class ScribbleRoutes {
  private scribbleController: ScribbleController = new ScribbleController();

  public route(app: Application) {
    app.post('/api/scribble/create', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.create(req, res);
    });
    app.get('/api/scribble/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.getById(req, res);
    });
  }
}