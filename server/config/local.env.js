'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN: 'http://localhost:9000',
    SESSION_SECRET: "wakeup-secret",

    GOOGLE_ID: '383546803296-6kivmfltecc90d7nfe405ri5ufp1kg5c.apps.googleusercontent.com',
    GOOGLE_SECRET: 'exWFeiKRn53ipo8TAVLyH6rr',

    // Control debug level for modules using visionmedia/debug
    DEBUG: ''
};