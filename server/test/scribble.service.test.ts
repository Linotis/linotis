import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
const chaiaspromised = require('chai-as-promised');

import ScribbleService from '../src/components/scribble/scribble.service';

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
}