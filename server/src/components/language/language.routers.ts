import { Application, Request, Response } from 'express';
import upload from '../../middleware/upload';
import passport from 'passport';
import LanguageController from './language.controller';

export class LanguageRoutes {
  private languageController: LanguageController = new LanguageController();

  public route(app: Application) {

    app.post('/api/language', upload.single('icon'), passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.languageController.create(req, res);
    });

    app.get('/api/languages', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.languageController.getAll(req, res);
    });

    app.get('/api/language/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.languageController.getById(req, res);
    });
    app.patch('/api/language/:id', upload.single('icon'), passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.languageController.update(req, res);
    });
    app.delete('/api/language/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.languageController.delete(req, res);
    });
  }
}