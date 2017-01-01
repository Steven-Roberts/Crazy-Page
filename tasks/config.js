const src = 'src';

export const paths = {
    src,
    build: 'build',
    release: 'release',
    masterIcon: 'branding/master-icon.png',
    manifest: `${src}/manifest.json`
};

const srcGlob = (ext = '*') => `${paths.src}/**/${ext}`;

export const globs = {
    img: [srcGlob('*.{png,jpg,gif,svg}')],
    json: [srcGlob('*.json')],
    js: [srcGlob('*.js')],
    gulp: ['gulpfile.babel.js', 'tasks/**/*'],
    css: [srcGlob('*.css')],
    build: [`${paths.build}/**/*`]
};

export const watchOptions = {
    ignoreInitial: false
};
