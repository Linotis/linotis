import Scribble from '../models/scribble.model';
import Collection from '../models/collection.model';

export default class ScribbleService {

  public async getScribbleById(id: string) {
    const scribble = await Scribble.findById(id);
    return scribble;
  }
  
  public async createScribble(title: string, imgSrc: string, collectionId) {
    const scribble = new Scribble({
      title: title,
      imgSrc: imgSrc,
      collectionId: collectionId
    });
    await scribble.save();
    const collectionById = await Collection.findById(collectionId);
    collectionById.scribbles.push(scribble);
    await collectionById.save();
    return scribble;
  }
}