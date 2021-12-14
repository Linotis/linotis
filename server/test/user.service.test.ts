import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
const chaiaspromised = require('chai-as-promised');

import UserService from '../src/services/user.service';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class UserServiceTest {
  
  private SUT: UserService;
  private userEmail: string;
  private userPassword: string;
  private userRole: string;

  before() {
    this.SUT = new UserService();
    this.userEmail = 'test@test.com';
    this.userPassword = 'test';
    this.userRole = 'test role'

  }

  @test 'UserService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, UserService);
  }

  @test 'Create user return Promise' () {
    assert.instanceOf(this.SUT.createUser(this.userEmail, this.userPassword, this.userRole), Promise);
  }

  @test 'Login user return Promise' () {
    assert.instanceOf(this.SUT.loginUser(this.userEmail, this.userPassword), Promise);
  }
}