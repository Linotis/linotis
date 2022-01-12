import Language from './language.model';

export default class LanguageClass {
  
  public async getLanguages() {
    const languages = await Language.find();
    return languages;
  }

  public async getLanguageById(id: string) {
    const language = await Language.findById(id);
    return language;
  }

  public async addLanguage(name: string, icon: string) {
    const language = await Language.create({
      name: name,
      icon: icon
    });
    return language;
  }

  public async updateLanguage(id: string, updated: object) {
    const language = await Language.findOneAndUpdate(
      {_id: id},
      {$set: updated},
      {new: true}
    );
    return language;
  }

  public async deleteLanguage(id) {
    const language = await Language.remove({_id: id});
    return language;
  }
}