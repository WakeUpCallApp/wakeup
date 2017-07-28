'use strict';

var path = require('path');
var _ = require('lodash');
var domainUrl = process.env.NODE_ENV === 'development'? 'http://localhost:9000/' : '';

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'wakeup-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // MongoDB connection options
  mongo: {
    options: {
      useMongoClient: true,
      db: {
        safe: true
      }
    }
  },

  google: {
    clientID: process.env.GOOGLE_ID || '383546803296-6kivmfltecc90d7nfe405ri5ufp1kg5c.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'exWFeiKRn53ipo8TAVLyH6rr',
    callbackURL:  domainUrl+'auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
