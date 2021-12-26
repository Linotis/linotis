import Scribble from './scribble.model';
import Collection from '../collection/collection.model';

export default class ScribbleService {

  public async getScribbleById(id: string) {
    const scribble = await Scribble.findById(id);
    return scribble;
  }
  
  public async createScribble(title: string, imgSrc: string, collectionId: any) {
    const scribble = await Scribble.create({
      title: title,
      imgSrc: imgSrc,
      collectionId: collectionId
    });
    await scribble.save();
    const collectionById = await Collection.findById(collectionId);
    collectionById!.scribbles.push(scribble);
    await collectionById!.save();
    return scribble;
  }

  public async updateScribble(id: string, updated: object) {
    const scribble = await Scribble.findOneAndUpdate(
      {_id: id},
      {$set: updated},
      {new: true}
    );
    return scribble;
  }

  public async deleteScribble(id: string) {
    const scribble = await Scribble.remove({_id: id});
    return scribble;
  }
}