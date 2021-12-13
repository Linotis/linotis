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
    let{title, imgSrc, collectionId} = req.body;
    imgSrc = req.file ? req.file.path : '';
    return this.scribbleService.createScribble(title, imgSrc, collectionId)
    .then(value => res.status(201).json(value))
    .catch((err) => res.status(500).json(err.message));   
  }

  async update(req: Request, res: Response) {
    const{id} = req.params;

    const updated = {title: req.body.title, imgSrc: req.body.imgSrc};

    if(req.file) {
      updated.imgSrc = req.file.path;
    };

    return this.scribbleService.updateScribble(id, updated)
    .then(value => res.status(201).json(value))
    .catch((err) => res.status(500).json(err.message)); 
  }

  async delete(req: Request, res: Response) {
    const{id} = req.params;
    return this.scribbleService.deleteScribble(id)
    .then(value => res.status(200).json({message: 'Scribble delete'}))
    .catch((err) => res.status(500).json(err.message));
  }
}