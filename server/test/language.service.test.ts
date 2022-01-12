import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import sinon from 'sinon';

const chaiaspromised = require('chai-as-promised');

import LanguageService from '../src/components/language/language.service';
import language from '../src/components/language/language.model';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class LanguageServiceTest {

  private SUT: LanguageService;
  private id: string;
  private icon: string;
  private name: string;
  private updated: object;

  before() {
    this.SUT = new LanguageService();
    this.id = '123';
    this.name = 'test'
    this.icon = ''
    this.updated = {
      name: 'test'
    }  
  }

  @test 'LanguageService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, LanguageService);
  }

  @test 'GetLanguage called find' () {
    sinon.stub(language, "find");
    this.SUT.getLanguages();
    sinon.assert.calledWith(language.find);
  }

  @test 'GetLanguageById called findById' () {
    sinon.stub(language, "findById");
    this.SUT.getLanguageById(this.id);
    sinon.assert.calledWith(language.findById, this.id);
  }

  @test 'CreateLanguage called create' () {
    sinon.stub(language, "create");
    this.SUT.addLanguage(this.name, this.icon);
    sinon.assert.calledWith(language.create, {name: this.name, icon: this.icon});
  }

  @test 'UpdateLanguage called findOneAndUpdate' () {
    sinon.stub(language, "findOneAndUpdate");
    this.SUT.updateLanguage(this.id, this.updated);
    sinon.assert.calledWith(language.findOneAndUpdate, {_id: this.id},{$set: this.updated},{new: true});
  }

  @test 'DeleteLanguage called remove' () {
    sinon.stub(language, "remove");
    this.SUT.deleteLanguage(this.id);
    sinon.assert.calledWith(language.remove, {_id: this.id});
  }
}