import { Request, Response } from "express";
import LanguageService from "./language.service";

export default class LanguageController {
  
  private languageService: LanguageService = new LanguageService();

  async getById(req: Request, res: Response) {
    const{id} = req.params;
    return this.languageService.getLanguageById(id)
      .then(value => res.status(200).json(value))
      .catch((err) => res.status(500).json(err.message));
  }

  async create(req: Request, res: Response) {
    let{name, icon} = req.body;
    icon = req.file ? req.file.path : '';
    return this.languageService.addLanguage(name, icon)
      .then(value => res.status(201).json(value))
      .catch((err) => res.status(500).json(err.message));   
  }

  async update(req: Request, res: Response) {
    const{id} = req.params;

    const updated = {name: req.body.name, icon: req.body.icon};

    if(req.file) {
      updated.icon = req.file.path;
    };

    return this.languageService.updateLanguage(id, updated)
      .then(value => res.status(201).json(value))
      .catch((err) => res.status(500).json(err.message)); 
  }

  async delete(req: Request, res: Response) {
    const{id} = req.params;
    return this.languageService.deleteLanguage(id)
      .then(value => res.status(200).json({message: 'Language delete'}))
      .catch((err) => res.status(500).json(err.message));
  }
}