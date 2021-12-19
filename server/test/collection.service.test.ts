import { suite, test } from '@testdeck/mocha';
import { rejects } from 'assert';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import { resolve } from 'path/posix';
import sinon from 'sinon';
import { Request, Response } from "express";

const chaiaspromised = require('chai-as-promised');

import CollectionService from '../src/components/collection/collection.service';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class CollectionServiceTest {

  private SUT: CollectionService;
  private id: string;
  private name: string;
  private updated: object;
  private mockReq: Function;
  private mockRes: Function;
  private res: Response;

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
    this.SUT.getCollections().then(data => expect(data).to.be.instanceOf(new Promise<any[]>(() => {})));
  }

  @test 'getCollectionsById return Promise' () {
    this.SUT.getCollectionById(this.id).then(data => expect(data).to.be.instanceOf(new Promise<any>(() => {})));
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
}