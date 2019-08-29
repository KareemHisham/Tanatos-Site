var gulp        = require('gulp'),
    prefixer    = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    imageMin    = require('gulp-imagemin'), 
    cleanCss    = require('gulp-clean-css'),
    htmlMin     = require('gulp-htmlmin'),
    uglify      = require('gulp-uglify'),
    zip         = require('gulp-zip'),
    pug         = require('gulp-pug');

gulp.task('html', function() {
    return gulp.src('project/pug/index.pug')
        .pipe(pug({pretty:true}))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
})

gulp.task('css', function(){
    return gulp.src('project/css/*.scss')
        .pipe(sass())
        .pipe(prefixer('last 2 versions'))
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('js', function(){
    return gulp.src('project/js/*.*')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
})

gulp.task('image', function(){
    return gulp.src('project/images/**/*.*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/images/'))
})

gulp.task('compress', function(){
    return gulp.src('dist/**/*.*')
        .pipe(zip('tanatos.zip'))
        .pipe(gulp.dest('.'))
})
gulp.task('watch', function(){
    gulp.watch('project/pug/index.pug', gulp.series('html'))
    gulp.watch('project/css/*.scss', gulp.series('css'))
    gulp.watch('project/js/*.*', gulp.series('js'))
    gulp.watch('project/images/**/*.*', gulp.series('image'))
    gulp.watch('dist/**/*.*', gulp.series('compress'))
})
