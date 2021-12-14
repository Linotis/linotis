import { suite, test } from '@testdeck/mocha';
import { rejects } from 'assert';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import { resolve } from 'path/posix';
const chaiaspromised = require('chai-as-promised');

import CollectionService from '../src/services/collection.service';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class CollectionServiceTest {

  private SUT: CollectionService;
  private id: string;
  private name: string;
  private updated: object;

  before() {
    this.SUT = new CollectionService();
    this.id = '123';
    this.name = 'test'
    this.updated = {
      name: 'test'
    }
  }

  @test 'CollectionService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, CollectionService);
  }

  @test 'getAllCollections return Promise' () {
    assert.instanceOf(this.SUT.getCollections(), Promise);
  }

  @test 'getCollectionsById return Promise' () {
    assert.instanceOf(this.SUT.getCollectionById(this.id), Promise);
  }

  @test 'Create collection return Promise' () {
    assert.instanceOf(this.SUT.createCollection(this.name), Promise);
  }

  @test 'Update collection return Promise' () {
    assert.instanceOf(this.SUT.updateCollection(this.id, this.updated), Promise);
  }

  @test 'Delete collection return Promise' () {
    assert.instanceOf(this.SUT.deleteCollection(this.id), Promise);
  }

  // @test 'init return if !config' () {
  //   expect(this.SUT.loginUser(this.userEmail, this.userPassword)).should.be.rejectedWith(Error);
  // }
}