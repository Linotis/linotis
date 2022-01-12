import ICollection from "components/collection/collection.interface";

interface ILanguage {
  _id: string;
  name: string;
  icon: string;
  collections: Array<ICollection>;
}

export default ILanguage;