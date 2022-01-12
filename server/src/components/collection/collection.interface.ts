import ILanguage from '../language/language.interface';
import IScribble from '../scribble/scribble.interface';

interface ICollection {
  _id: string;
  name: string;
  scribbles: Array<IScribble>;
  languageId: string;
}

export default ICollection