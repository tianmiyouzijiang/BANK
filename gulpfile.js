var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    minihtml = require('gulp-htmlmin'),
    miniimg = require('gulp-imagemin'),
    minicss = require('gulp-minify-css'),
    minijs= require('gulp-uglify');
    gulp.task('minicss', function() {
        gulp.src('./css/*.css')
            .pipe(minicss())
            .pipe(gulp.dest('css'));
    })
    gulp.task('minijs',function() {
        gulp.src('*.js')
        .pipe(minijs())
        .pipe(gulp.dest('./js'))
    })
    gulp.task('minihtml',function() {
        gulp.src('./index.html')
            .pipe(minihtml({
                removeComments:true,
                collapseWhitespace:true,
                removeStyleLinTypeAttributes:true,
                minifyJs:true,
                minifyCss:true
            }))
            .pipe(gulp.dest('./html'))
    })
    gulp.task('miniimgpng',function() {
        gulp.src('./images/*.png')
        .pipe(miniimg({
            optimizationLevel:1,
            progressive:true,
            interlaced:true,
            multipass:true
        }))
        .pipe(gulp.dest('./img'))
    })
    gulp.task('miniimgjpg',function() {
        gulp.src('./images/*.jpg')
        .pipe(miniimg({
            optimizationLevel:1,
            progressive:true,
            interlaced:true,
            multipass:true
        }))
        .pipe(gulp.dest('./img'))
    })
    gulp.task('miniimggif',function() {
        gulp.src('./images/*.gif')
        .pipe(miniimg({
            optimizationLevel:1,
            progressive:true,
            interlaced:true,
            multipass:true
        }))
        .pipe(gulp.dest('./img'))
    })
gulp.task('server',function() {
    gulp.src('.')
    .pipe(webserver({
        port:'8888',
        host:'localhost',
        livereload:true,
        fallback:'index.html',
        open:true,
    }))
})
gulp.task('webserver',function() {
    gulp.src('./')
        .pipe(webserver({
            port:'8080',
            host:'localhost',
            middleware:function(req, res, next) {
                res.writeHead(200,{
                    "content-type":"text/json",
                    'Access-Control-Allow-Origin':"*"
                })
                if(req.url === '/getdata') {

                    res.end(require('fs').readFileSync('data.json'));
                }
            }
        }))
})
gulp.task('default',['server','webserver','minicss','minijs','miniimgpng','miniimggif','miniimgjpg','minihtml']); 