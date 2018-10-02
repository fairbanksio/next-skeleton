/**
 * Defines an endpoint that returns a list of users. You must be signed in and
 * have "admin": true set in your profile to be able to call the /admin/users
 * end point (you will need to configure persistant Mongo database to do that).
 *
 * Note: These routes only work if you have actually configured a MONGO_URI!
 * They do not work if you are using the fallback in-memory database.
 **/
'use strict'
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.Promise = global.Promise;

let User = require('../models/usermodel')

module.exports = (expressApp) => {

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }

  expressApp.get('/admin/users', (req, res) => {
    // Check user is logged in and has admin access
    if (!req.user || !req.user.admin || req.user.admin !== true)
      return res.status('403').end()

    User.find(function (err, users) {
      if (err) return console.error(err);
      return res.json(users)
    })
    .catch(err => {
      return res.status(500).json(err)
    })

  })

}
