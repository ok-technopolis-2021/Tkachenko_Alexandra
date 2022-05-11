const gulp = require('gulp');
const concat = require('gulp-concat');
const less = require('gulp-less');
const inject = require('gulp-inject');
const rollup = require('rollup');
const image = require('gulp-image');

const assetsPath = 'src/assets/*.{png, jpeg, psd, bmp, gif, tiff, icon, ico}';
const stylesPath = './src/styles/app.scss';
var imageDirectory = 'src/assets/';
const jsPath = 'src/scripts/*.js';
const htmlPath = './src/*.html';
const distPath = './dist/';
const rollupConfig = {
    input: 'src/scripts/app.js',
    plugins: []
}

const imageOptimizingSettings = {
    pngquant: true,
    optipng: true,
    zopflipng: true,
    mozjpeg: true,
    gifsicle: true,
    svgo: true,
    concurrent: 10,
};

gulp.task('rollup', async (done) => {
    const bundle = await rollup.rollup(rollupConfig);

    bundle.write({
        format: 'esm',
        file: 'dist/app.js'
    });
    done();
});

gulp.task('css', () => {
    return gulp.src(stylesPath)
        .pipe(less())
        .pipe(concat('styles/style.css'))
        .pipe(gulp.dest(distPath));
});

gulp.task('watch', function (done) {
    gulp.watch(stylesPath, gulp.series('css'));
    gulp.watch(jsPath, gulp.series('rollup'));
    done();
});

gulp.task('assets', function () {
    return gulp.src(assetsPath)
        .pipe(image(imageOptimizingSettings))
        .pipe(gulp.dest(`${distPath}/assets/`));
});

 gulp.task('html', function () {
    const target = gulp.src(htmlPath);
    const sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });

    return target.pipe(inject(sources, { ignorePath: '../dist', relative: true, addPrefix: '.' }))
        .pipe(gulp.dest(distPath));
});

gulp.task('default', gulp.series('rollup', 'css', 'assets', 'html', 'watch'));
gulp.task('build', gulp.series('rollup', 'css', 'assets', 'html'));