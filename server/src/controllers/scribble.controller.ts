import { Request, Response } from "express";
import ScribbleService from "../services/scribble.service";

export default class ScribbleController {
  
  private scribbleService: ScribbleService = new ScribbleService();

  async getById(req: Request, res: Response) {
    const{id} = req.params;
    return this.scribbleService.getScribbleById(id)
    .then(value => res.status(200).json(value))
    .catch((err) => res.status(500).json(err.message));
  }

  async create(req: Request, res: Response) {
    const{title, imgSrc, collectionId} = req.body;
    return this.scribbleService.createScribble(title, imgSrc, collectionId)
    .then(value => res.status(201).json(value))
    .catch((err) => res.status(500).json(err.message));   
  }



}