import { Request, Response } from "express";
import CollectionService from "../services/collection.service";

export default class CollectionController {


  //private collectionService: CollectionService = new CollectionService();
  constructor(private collectionService: CollectionService) {}
  
  async getAll(req: Request, res: Response) {
    return this.collectionService.getCollections()
    .then(value => res.status(200).json(value))
    .catch((err) => res.status(500).json(err.message));
  }

  async getById(req: Request, res: Response) {
    const{id} = req.params;
    return this.collectionService.getCollectionById(id)
    .then(value => res.status(200).json(value))
    .catch((err) => res.status(500).json(err));
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