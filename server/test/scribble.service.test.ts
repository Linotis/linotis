import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
import sinon from 'sinon';
const chaiaspromised = require('chai-as-promised');

import ScribbleService from '../src/components/scribble/scribble.service';
import Scribble from '../src/components/scribble/scribble.model';
import Collection from '../src/components/collection/collection.model';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class ScribbleServiceTest {

  private SUT: ScribbleService;
  private id: string;
  private title: string;
  private imgSrc: string;
  private collectionId: string;
  private updated: object;

  before() {
    this.SUT = new ScribbleService();
    this.id = 'test';
    this.title = 'test';
    this.imgSrc = 'test url';
    this.collectionId = 'test id';
    this.updated = {
      name: 'test'
    }
  }

  @test 'ScribbleService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, ScribbleService);
  }

  @test 'GetScribbleById called findById' () {
    sinon.stub(Scribble, "findById");
    this.SUT.getScribbleById(this.id);
    sinon.assert.calledWith(Scribble.findById, this.id);
  }

  @test 'CreateScribble called create' () {
    sinon.stub(Scribble, "create");
    this.SUT.createScribble(this.title, this.imgSrc, this.collectionId);
    sinon.assert.calledWith(Scribble.create, {title: this.title, imgSrc: this.imgSrc, collectionId: this.collectionId});
  }

  @test 'UpdateScribble called findOneAndUpdate' () {
    sinon.stub(Scribble, "findOneAndUpdate");
    this.SUT.updateScribble(this.id, this.updated);
    sinon.assert.calledWith(Scribble.findOneAndUpdate, {_id: this.id},{$set: this.updated},{new: true});
  }

  @test 'DeleteScribble called remove' () {
    sinon.stub(Scribble, "remove");
    this.SUT.deleteScribble(this.id);
    sinon.assert.calledWith(Scribble.remove, {_id: this.id});
  }
}