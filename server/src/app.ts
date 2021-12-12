import 'dotenv/config';
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import * as bodyParser from "body-parser";
import mongoose from 'mongoose';
import passport from 'passport';
import {UserRoutes} from './routes/user.routers';
import {CollectionRouters} from './routes/collection.routers';
import { ScribbleRoutes } from './routes/scribble.routers';
import checkPassport from './middleware/passport';


class App {

  public app: express.Application;
  public mongoURL: string = process.env.DB_URL!;
  private userRoutes: UserRoutes = new UserRoutes();
  private collectionRoutes: CollectionRouters = new CollectionRouters();
  private scribbleRoutes: ScribbleRoutes = new ScribbleRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.userRoutes.route(this.app);
    this.collectionRoutes.route(this.app);
    this.scribbleRoutes.route(this.app);

  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use(passport.initialize());
    checkPassport(passport);
    this.app.use(cors());
    this.app.use(morgan('dev'));
  };

  private mongoSetup(): void {
    mongoose.connect(this.mongoURL).then(() => console.log('Mongo connected')).catch(error => console.log(error));
  }
}

export default new App().app;
