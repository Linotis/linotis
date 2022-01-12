import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import sinon from 'sinon';

const chaiaspromised = require('chai-as-promised');

import CollectionService from '../src/components/collection/collection.service';
import collection from '../src/components/collection/collection.model';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class CollectionServiceTest {

  private SUT: CollectionService;
  private id: string;
  private name: string;
  private updated: object;
  private languageId: string;

  before() {
    this.SUT = new CollectionService();
    this.id = '123';
    this.name = 'test';
    this.languageId = '12345';
    this.updated = {
      name: 'test'
    }  
  }

  @test 'CollectionService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, CollectionService);
  }

  @test 'GetCollection called find' () {
    sinon.stub(collection, "find");
    this.SUT.getCollections();
    sinon.assert.calledWith(collection.find);
  }

  @test 'GetCollectionById called findById' () {
    sinon.stub(collection, "findById");
    this.SUT.getCollectionById(this.id);
    sinon.assert.calledWith(collection.findById, this.id);
  }

  @test 'CreateCollection called create' () {
    sinon.stub(collection, "create");
    this.SUT.createCollection(this.name, this.languageId);
    sinon.assert.calledWith(collection.create, {name: this.name, languageId: this.languageId});
  }

  @test 'UpdateCollection called findOneAndUpdate' () {
    sinon.stub(collection, "findOneAndUpdate");
    this.SUT.updateCollection(this.id, this.updated);
    sinon.assert.calledWith(collection.findOneAndUpdate, {_id: this.id},{$set: this.updated},{new: true});
  }

  @test 'DeleteCollection called remove' () {
    sinon.stub(collection, "remove");
    this.SUT.deleteCollection(this.id);
    sinon.assert.calledWith(collection.remove, {_id: this.id});
  }


}