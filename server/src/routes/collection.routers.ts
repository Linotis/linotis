import { Application, Request, Response } from 'express';
import CollectionController from '../controllers/collection.controller';
import passport from 'passport';

export class CollectionRouters {
  
  private collectionController: CollectionController = new CollectionController();

  public route(app: Application) {
    app.post('/api/collection', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.collectionController.create(req, res);
    });
    app.get('/api/collections', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.collectionController.getAll(req, res);
    });
    app.get('/api/collection/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.collectionController.getById(req, res);
    });
    app.patch('/api/collection/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.collectionController.update(req, res);
    });
    app.delete('/api/collection/:id', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
      this.collectionController.delete(req, res);
    });
  }
}
