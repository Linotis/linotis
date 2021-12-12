import { Request, Response } from "express";
import CollectionService from "../services/collection.service";

export default class CollectionController {

  private collectionService: CollectionService = new CollectionService();

  async getAll(req: Request, res: Response) {
    try {
      const collections = this.collectionService.getCollections();
      return res.status(200).json(collections);
    } catch(e){

    }
  }
  
  async create(req: Request, res: Response) {
    try {
      const{name} = req.body;
      const collection = this.collectionService.createCollection(name);
      return res.status(201).json(collection);
    } catch(e) {
      console.log(e);
    }
  }
}