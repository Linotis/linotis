import { Request, Response } from "express";
import CollectionService from "../services/collection.service";

export default class CollectionController {

  private collectionService: CollectionService = new CollectionService();

  async getAll(req: Request, res: Response) {
    try {
      return this.collectionService.getCollections().then(value => res.status(200).json(value));
    } catch(e){
      console.log(e);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const{id} = req.params;
      return this.collectionService.getCollectionById(id).then(value => res.status(200).json(value));
    } catch(e){
      console.log(e);
    }
  }
  
  async create(req: Request, res: Response) {
    try {
      const{name} = req.body;
      return this.collectionService.createCollection(name).then(value => res.status(201).json(value));
    } catch(e) {
      console.log(e);
    }
  }
}