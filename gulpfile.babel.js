import {buildCss, createLintCss, watchCss} from './tasks/css';
import {buildImg, iconify, watchImg} from './tasks/img';
import {buildJs, createLintJs, watchJs} from './tasks/js';
import {buildJson, watchJson} from './tasks/json';
import {globs, paths, watchOptions} from './tasks/config.js';

import del from 'del';
import gulp from 'gulp';
import {join} from 'path';
import manifest from './src/manifest';
import {stat} from 'fs';
import zipper from 'gulp-zip';

const zipFileName = `${manifest.name} ${manifest.version}.zip`;

const clean = () => del(paths.build);

const lint = gulp.parallel(createLintCss(), createLintJs());

const build = gulp.series(clean, lint,
    gulp.parallel(buildCss, buildImg, iconify, buildJs, buildJson));

const checkVersion = (cb) => {
    stat(join(paths.release, zipFileName), (err) => {
        if (err) {
            return cb();
        }

        return cb(new Error(`There is already a release "${zipFileName}"`));
    });
};

const zip = () => gulp.src(globs.build)
    .pipe(zipper(`${manifest.name} ${manifest.version}.zip`))
    .pipe(gulp.dest(paths.release));

const release = gulp.series(build, checkVersion, zip);

const watcher = () => {
    watchCss(watchOptions);
    watchImg(watchOptions);
    watchJs(watchOptions);
    watchJson(watchOptions);
};

const watch = gulp.series(clean, watcher);

export {clean, lint, build, release, watch, watch as default};