module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // copy html files from the src directory to the dist directory
        copy: {
            html: {
                files: [{
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist',
                    expand: true
                }]
            },
            css: {
                files: [{
                    cwd: 'src',
                    src: '**/*.css',
                    dest: 'dist',
                    expand: true
                }]
            }
        },
        watch: {
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['copy:css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}
