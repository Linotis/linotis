const errorHandler = require('../utils/errorHandler');
const UserService = require('../services/user.service');

module.exports.login = async function(req, res) {
  try {
    const {email, password} = req.body;
    const token = await UserService.loginUser(email, password);
    return res.status(200).json({token: `Bearer ${token}`});

  } catch(e) {
    errorHandler(res, e);
  }
};

module.exports.register = async function(req, res) {
  try {
    const {email, password, role} = req.body;
    await UserService.registerUser(email, password, role);
    return res.status(201).json({ message: 'Ok'});
  } catch(e) {
    errorHandler(res, e);
  }  
};