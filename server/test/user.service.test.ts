import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { assert, expect } from 'chai';
const chaiaspromised = require('chai-as-promised');
import sinon from 'sinon';
import users from '../src/components/user/user.model';
import UserService from '../src/components/user/user.service';

_chai.use(chaiaspromised);
_chai.should();
_chai.expect;

@suite class UserServiceTest {
  
  private SUT: UserService;
  private userEmail: string;
  private userPassword: string;
  private userId: string;
  private jwtSecret: string;
  private userParams: any;
  private token: string;

  before() {
    this.SUT = new UserService();
    this.userEmail = 'test@test.com';
    this.userPassword = 'test';
    this.userId = '2345';
    this.jwtSecret = 'dev-jwt';
    this.userParams = {
      email: 'demo@demo.com',
      password: 'demodemo',
      firstName: 'Art',
      lastName: 'S',
      age: 30,
      role: 'student'
    }
    this.token = '123123'
  }

  @test 'UserService is created' () {
    this.SUT.should.not.be.undefined;
    assert.instanceOf(this.SUT, UserService);
  }

  @test 'CreateToken return token string' () {
    return this.SUT.createToken(this.userEmail, this.userId, this.jwtSecret).then((data) => {expect(data).to.be.an('string')});
  }

  @test 'CheckUser called findOne' () {
    sinon.stub(users, 'findOne');
    this.SUT.checkUser(this.userEmail);
    sinon.assert.calledWith(users.findOne, {email: this.userEmail});
  }

  @test 'LoginUser call checkUser' () {
    let spy = sinon.spy(this.SUT, "checkUser");
    this.SUT.loginUser(this.userEmail, this.userPassword);
    sinon.assert.calledOnce(spy);
  }

  @test 'CreateUser called finOne' () {
    this.SUT.createUser(this.userParams);
    sinon.assert.calledWith(users.findOne, {email: this.userEmail});
  }

  // @test 'GetUserInfo called findById' () {
  //   this.SUT.getUserInfo(this.token);
  //   sinon.assert.calledWith(users.findById, {_id: this.userId});
  // }
}