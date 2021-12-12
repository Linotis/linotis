import collections from '../models/collection.model';

export default class CollectionService {

  public async getCollections() {
    const allCollection = await collections.find();
    return allCollection;
  }

  public async getCollectionById(id: string) {
    const collection = await collections.findById(id);
    return collection;
  }

  public async createCollection(name: string) {
    const collection = await collections.create({name: name});
    return collection;
  }
}