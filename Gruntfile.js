// Generated on 2014-02-22 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-phonegap');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 3 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },


        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/bower_components/components-font-awesome/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
//                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/s/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>',
                        src: ['*.html', 'views/{,*/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/scripts',
                        src: '*.js',
                        dest: '.tmp/concat/scripts'
                    }
                ]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'bower_components/**/*',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        phonegap: {
            config: {
                root: 'www',
                config: 'config.xml',
                cordova: '.cordova',
                path: 'phonegap',
//                plugins: ['/local/path/to/plugin', 'http://example.com/path/to/plugin.git'],
                platforms: ['android'],
                maxBuffer: 200, // You may need to raise this for iOS.
                verbose: false,
                releases: 'releases',
                releaseName: function () {
                    var pkg = grunt.file.readJSON('package.json');
                    return(pkg.name + '-' + pkg.version);
                },

                // Must be set for ios to work.
                // Should return the app name.
                name: function () {
                    var pkg = grunt.file.readJSON('package.json');
                    return pkg.name;
                },

                // Add a key if you plan to use the `release:android` task
                // See http://developer.android.com/tools/publishing/app-signing.html
                key: {
                    store: 'release.keystore',
                    alias: 'release',
                    aliasPassword: function () {
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    },
                    storePassword: function () {
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('');
                    }
                },

                // Set an app icon at various sizes (optional)
                icons: {
                    android: {
                        ldpi: 'logo.png',//'icon-36-ldpi.png',
                        mdpi: 'logo.png',//'icon-48-mdpi.png',
                        hdpi: 'logo.png',//'icon-72-hdpi.png',
                        xhdpi: 'logo.png'//'icon-96-xhdpi.png'
                    },
                    wp8: {
                        app: 'icon-62-tile.png',
                        tile: 'icon-173-tile.png'
                    },
                    ios: {
                        icon29: 'icon29.png',
                        icon29x2: 'icon29x2.png',
                        icon40: 'icon40.png',
                        icon40x2: 'icon40x2.png',
                        icon57: 'icon57.png',
                        icon57x2: 'icon57x2.png',
                        icon60x2: 'icon60x2.png',
                        icon72: 'icon72.png',
                        icon72x2: 'icon72x2.png',
                        icon76: 'icon76.png',
                        icon76x2: 'icon76x2.png'
                    }
                },

                // Set a splash screen at various sizes (optional)
                // Only works for Android and IOS
                screens: {
                    android: {
                        ldpi: 'screen-ldpi-portrait.png',
                        // landscape version
                        ldpiLand: 'screen-ldpi-landscape.png',
                        mdpi: 'screen-mdpi-portrait.png',
                        // landscape version
                        mdpiLand: 'screen-mdpi-landscape.png',
                        hdpi: 'screen-hdpi-portrait.png',
                        // landscape version
                        hdpiLand: 'screen-hdpi-landscape.png',
                        xhdpi: 'screen-xhdpi-portrait.png',
                        // landscape version
                        xhdpiLand: 'www/screen-xhdpi-landscape.png'
                    },
                    ios: {
                        // ipad landscape
                        ipadLand: 'screen-ipad-landscape.png',
                        ipadLandx2: 'screen-ipad-landscape-2x.png',
                        // ipad portrait
                        ipadPortrait: 'screen-ipad-portrait.png',
                        ipadPortraitx2: 'screen-ipad-portrait-2x.png',
                        // iphone portrait
                        iphonePortrait: 'screen-iphone-portrait.png',
                        iphonePortraitx2: 'screen-iphone-portrait-2x.png',
                        iphone568hx2: 'screen-iphone-568h-2x.png'
                    }
                },

                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                versionCode: function () {
                    return(1)
                },

                // Android-only options that will override the defaults set by Phonegap in the
                // generated AndroidManifest.xml
                // See https://developer.android.com/guide/topics/manifest/uses-sdk-element.html
                minSdkVersion: function () {
                    return(10)
                },
                targetSdkVersion: function () {
                    return(19)
                },

                // iOS7-only options that will make the status bar white and transparent
                iosStatusBar: 'WhiteAndTransparent',

                // If you want to use the Phonegap Build service to build one or more
                // of the platforms specified above, include these options.
                // See https://build.phonegap.com/
                /*remote: {
                    username: 'your_username',
                    password: 'your_password',
                    platforms: ['android', 'blackberry', 'ios', 'symbian', 'webos', 'wp7']
                },*/

                // Set an explicit Android permissions list to override the automatic plugin defaults.
                // In most cases, you should omit this setting. See 'Android Permissions' in README.md for details.
                permissions: ['INTERNET', 'ACCESS_COURSE_LOCATION']
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'bower-install',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'bower-install',
  //      'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
  //      'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
//        'newer:jshint',
        'test',
        'build'
    ]);
};
