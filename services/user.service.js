const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.loginUser = async function(email, password) {
  const candidate = await User.findOne({email});
  
  if(candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password);
    if(passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, process.env.JWT, {expiresIn: 60 * 60});
      return token;
    } else {
      throw new Error('Invalid password');
    }
  } else {
    throw new Error('User not found');
  }
};  

module.exports.registerUser = async function(email, password, role) {
  const candidate = await User.findOne({email});
  
  if(candidate) {
    throw new Error(`User ${email} already exists`);
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  
  const user = await User.create({
    email: email,
    password: hashPassword,
    role: role
  });
  return user;
};