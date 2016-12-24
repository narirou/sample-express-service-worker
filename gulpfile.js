const bs = require('browser-sync').create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const server = require('gulp-develop-server');
const browserify = require('browserify');
const through2 = require('through2');

const address = process.env.address || 'localhost';
const port = process.env.port || 3000;
const proxyPort = process.env.PROXY_PORT || 3333;

const paths = {
    scriptEndpoints: [
        './source/main.js',
        './source/service-worker.js',
    ],
    scripts: [
        './source/*.js',
        './source/scripts/**/*.js',
        './pages/*.js',
    ],
    server: './server/run.js',
    serverScripts: [
        './server/*.js',
    ],
    views: [
        './source/*.html',
    ],
};

const browserSyncConfig = {
    proxy: `http://${address}:${port}`,
    port: proxyPort,
};

function startServer(done) {
    server.listen({ path: paths.server }, () => {
        bs.init(browserSyncConfig, done);
    });
}

function restartServer(done) {
    server.restart((error) => {
        if (!error) bs.reload();
        done();
    });
}

function script() {
    const browserified = through2.obj((file, enc, next) => {
        browserify(file.path).bundle((error, res) => {
            file.contents = res;
            next(null, file);
        });
    });
    return gulp.src(paths.scriptEndpoints)
        .pipe(browserified)
        .pipe(plumber())
        .pipe(gulp.dest('client/'))
        .pipe(bs.stream());
}

function view() {
    return gulp.src(paths.views)
        .pipe(gulp.dest('client/'))
        .pipe(bs.stream());
}

function watch() {
    gulp.watch(paths.scripts, script);
    gulp.watch(paths.views, view);
    gulp.watch(paths.serverScripts, restartServer);
}

gulp.task('build', gulp.parallel(script, view));

gulp.task('watch', gulp.series(startServer, watch));

gulp.task('default', gulp.series('build', 'watch'));
