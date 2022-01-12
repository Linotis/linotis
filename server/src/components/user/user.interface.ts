import ILanguage from "components/language/language.interface";

interface IUser {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  role: string;
  languages: Array<ILanguage>; 
}

export default IUser;