import {globs, paths} from './config';

import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import gulp from 'gulp';
import manifest from '../src/manifest';
import {production} from 'gulp-environments';
import stylelint from 'gulp-stylelint';

export const createLintCss = (failAfterError = true) => {
    const lintCss = () => gulp.src(globs.css)
        .pipe(stylelint({
            failAfterError,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));

    return lintCss;
};

export const buildCss = () => gulp.src(globs.css)
    .pipe(autoprefixer({
        browsers: [`Chrome >= ${manifest.minimum_chrome_version}`]
    }))
    .pipe(production(cssnano()))
    .pipe(gulp.dest(paths.build));

export const watchCss = (watchOptions) => gulp.watch(globs.css, watchOptions,
    gulp.series(createLintCss(false), buildCss));
