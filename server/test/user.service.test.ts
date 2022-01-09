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

    this.token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJ1c2VySWQiOiI2MWQ3NGI5NTMwOTEzMDY1MjQ1YjhjMTYiLCJpYXQiOjE2NDE2NjUxMTcsImV4cCI6MTY0MTY2ODcxN30.-jQHgss5M74k2o-JujI7KPf57REAEr5ecFqITIFxup8'
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

  @test 'GetUserInfo called decodeToken' () {
    let spy = sinon.spy(this.SUT, "tokenDecode");
    this.SUT.getUserInfo(this.token);
    sinon.assert.calledWith(spy);
  }

  @test 'UpdateUserInfo called decodeToken' () {
    let updatedData = {
      fistName: 'test'
    }
    let spy = sinon.spy(this.SUT, "tokenDecode");
    this.SUT.updateUserInfo(this.token, updatedData);
    sinon.assert.calledWith(spy);
  }
} 