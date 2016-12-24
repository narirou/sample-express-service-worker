const express = require('express');
const indexPage = require('../pages/index');
const aboutPage = require('../pages/about');
const testPage = require('../pages/test');

const app = express();

// 静的ファイルはサーバーからのアクセスに限定する
// express.staticが動作しないため
if (global.process) {
    app.use('/', express.static(`${__dirname}/../images`));
    app.use('/', express.static(`${__dirname}/../client`));
}

app.get('/', (req, res) => { res.send(indexPage); });
app.get('/about', (req, res) => { res.send(aboutPage); });
app.get('/test', (req, res) => { res.send(testPage); });

module.exports = app;
