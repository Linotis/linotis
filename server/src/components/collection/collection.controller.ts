import { Request, Response } from "express";
import CollectionService from "./collection.service";

export default class CollectionController {


  collectionService: CollectionService = new CollectionService();
  
  async getAll(req: Request, res: Response) {
    try {
      const collections = await this.collectionService.getCollections();
      return res.status(200).json(collections);
    } catch(e: any) {
      return res.status(400).json({message: e.message});
    }
  }

  async getById(req: Request, res: Response) {
    const{id} = req.params;
    try {
      const collection = await this.collectionService.getCollectionById(id);
      return res.status(200).json(collection);
    } catch(e: any) {
      return res.status(400).json({message: e.message});
    }
  }
  
  async create(req: Request, res: Response) {
    const{name} = req.body;
    return this.collectionService.createCollection(name)
    .then(value => res.status(201).json(value))
    .catch((err) => res.status(500).json(err.message));
  }

  async update(req: Request, res: Response) {
    const{id} = req.params;
    const updated = {name: req.body.name};
    return this.collectionService.updateCollection(id, updated)
    .then(value => res.status(201).json(value))
    .catch((err) => res.status(500).json(err.message));
  }

  async delete(req: Request, res: Response) {
    const{id} = req.params;
    return this.collectionService.deleteCollection(id)
    .then(value => res.status(200).json({message: 'Collection delete'}))
    .catch((err) => res.status(500).json(err.message));
  }
}