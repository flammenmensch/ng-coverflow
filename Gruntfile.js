module.exports = function (grunt) {
    var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n *  License: <%= pkg.license %> */\n';
    var name = '<%= pkg.name %>-<%= pkg.version %>';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            release: [ 'dist' ]
        },

        concat: {
            release: {
                src: [ 'scripts/**.js', '<%= ngtemplates.release.dest %>' ],
                dest: 'dist/' + name + '.js'
            },
            options: {
                banner: bannerContent
            }
        },

        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        cwd: 'scripts/',
                        src: '**.js',
                        dest: 'dist/'
                    }
                ]
            }
        },

        ngtemplates: {
            release: {
                src: 'templates/**.html',
                dest: 'scripts/ng-coverflow.templates.js',
                options: {
                    module: 'ng-coverflow',
                    prefix: '../',
                    concat: 'release',
                    htmlmin: {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return '(function (ng) {\nng.module(\'' + module + '\').run([\'$templateCache\', function ($templateCache) {\n' + script + '} ]);\n} (angular));'
                    }
                }
            }
        },

        uglify: {
            release: {
                options: {
                    banner: bannerContent,
                    sourceMap: 'dist/' + name + '.min.js.map',
                    sourceMapUrl: name + '.min.js.map',
                    sourceMapRoot: '../',
                    compress: true,
                    report: 'gzip',
                    mangle: true
                },
                src: [ 'scripts/**.js' ],
                dest: 'dist/' + name + '.min.js'
            }
        },

        cssmin: {
            release: {
                //expand: true,
                src: [ 'styles/**.css' ],
                dest: 'dist/' + name + '.min.css'
            }
        },

        jshint: {
            files: [ 'scripts/**.js' ]
        },

        compress: {
            release: {
                options: {
                    archive: 'dist.zip'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');


    grunt.registerTask('default', [ 'clean', 'ngtemplates', 'jshint', 'concat', 'uglify', 'cssmin', 'compress' ]);
};