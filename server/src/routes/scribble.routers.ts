import { Application, Request, Response } from 'express';
import ScribbleController from '../controllers/scribble.controller';
import upload from '../middleware/upload';
import passport from 'passport';

export class ScribbleRoutes {
  private scribbleController: ScribbleController = new ScribbleController();

  public route(app: Application) {
    app.post('/api/scribble/create', upload.single('image'), passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.create(req, res);
    });
    app.get('/api/scribble/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.getById(req, res);
    });
    app.patch('/api/scribble/:id', upload.single('image'), passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.update(req, res);
    });
    app.delete('/api/scribble/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.scribbleController.delete(req, res);
    });
  }
}
