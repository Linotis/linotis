import { suite, test } from '@testdeck/mocha';
import sinon from 'sinon';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import { Request, Response } from "express";

const chaiaspromised = require('chai-as-promised');

import CollectionController from '../src/components/collection/collection.controller';
import CollectionService from '../src/components/collection/collection.service';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class CollectionControllerTest {

  private SUT: CollectionController;
  private service: CollectionService;
  private res: Response;
  private req: Request;
  private id: string;

  before() {
    this.SUT = new CollectionController(); 
    this.service = new CollectionService();
    this.SUT.collectionService = this.service;
    this.id = '123';
  }

  @test async '1' () {
    const spy = sinon.spy(this.service, "getCollections");
    this.SUT.getAll(this.req, this.res);
    sinon.assert.calledOnce(spy);
  };
}