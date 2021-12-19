import IScribble from '../scribble/scribble.interface';

interface ICollection {
  _id: string;
  name: string;
  scribbles: Array<IScribble>;

}

export default ICollection