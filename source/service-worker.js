const expressService = require('express-service');
const app = require('../server/application');

const cacheName = 'server-v1';
const cacheUrls = ['/'];

expressService(app, cacheUrls, cacheName);
