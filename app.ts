import 'dotenv/config';
import express from "express";
import * as bodyParser from "body-parser";
import mongoose from 'mongoose';
//import * as passport from 'passport';
require('dotenv').config({ path: __dirname+'/.env' });
import {UserRoutes} from './routes/user.routers';

class App {

  public app: express.Application;
  public mongoURL: string = process.env.DB_URL!;
  private userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.userRoutes.route(this.app);

  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
  };

  private mongoSetup(): void {
    mongoose.connect(this.mongoURL).then(() => console.log('Mongo connected')).catch(error => console.log(error));
  }
}

export default new App().app;
