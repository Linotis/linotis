import collections from './collection.model';

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

  public async updateCollection(id: string, updated: object) {
    const collection = await collections.findOneAndUpdate(
      {_id: id},
      {$set: updated},
      {new: true}
    );
    return collection;
  }

  public async deleteCollection(id: string) {
    const collection = await collections.remove({_id: id});
    return collection;
  }
}