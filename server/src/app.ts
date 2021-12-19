import 'dotenv/config';
import express from "express";
import cors from 'cors';
import morgan from 'morgan';
import * as bodyParser from "body-parser";
import mongoose from 'mongoose';
import passport from 'passport';
import {UserRoutes} from './components/user/user.routers';
import {CollectionRouters} from './components/collection/collection.routers';
import { ScribbleRoutes } from './components/scribble/scribble.routers';
import checkPassport from './middleware/passport';

class App {
  public app: express.Application;
  public mongoURL: string;
  private userRoutes: UserRoutes;
  private collectionRoutes: CollectionRouters;
  private scribbleRoutes: ScribbleRoutes;

  constructor(app: express.Application, mongoURL: string, userRoutes: UserRoutes, collectionRoutes: CollectionRouters, scribbleRoutes: ScribbleRoutes) {
    
    this.app = app;
    this.mongoURL = mongoURL;
    this.userRoutes = userRoutes;
    this.collectionRoutes = collectionRoutes;
    this.scribbleRoutes = scribbleRoutes;
    
    this.config(this.app);
    this.mongoSetup(mongoURL);
    
    if(userRoutes) {
      this.userRoutes.route(this.app);
    }
    
    if(collectionRoutes) {
      this.collectionRoutes.route(this.app);
    }
    
    if(scribbleRoutes) {
      this.scribbleRoutes.route(this.app);
    }

  }

  private config(app: express.Application): void {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    checkPassport(passport);
    app.use(cors());
    app.use(morgan('dev'));
  };

  private mongoSetup(mondoURL: string): void {
    mongoose.connect(this.mongoURL)
    .then(() => console.log('Mongo connected'))
    .catch(error => console.log(error));
  }
}

export default new App(express(), process.env.DB_URL!, new UserRoutes, new CollectionRouters, new ScribbleRoutes).app;
