'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/wakeup-dev'
  },
  seedDB: false,
  google: {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: "wakeup-secret",

    GOOGLE_ID: '383546803296-6kivmfltecc90d7nfe405ri5ufp1kg5c.apps.googleusercontent.com',
    GOOGLE_SECRET: 'exWFeiKRn53ipo8TAVLyH6rr',
  },
    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
};
