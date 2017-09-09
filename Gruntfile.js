var webpack = require('webpack');

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            release: {
                files: ['src/**/*'],
                tasks: ['pug', 'webpack', 'less']
            }
        },
        pug: {
            release: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty: true
                },
                files: {
                    'app/NewTab.html': 'src/pug/main.pug'
                }
            }
        },
        webpack: {
            NewTab: {
                entry: [
                    'babel-polyfill',
                    './src/js/WorldClock.js'
                ],
                output: {
                    filename: './app/app.js'
                },
                module: {
                    loaders: [{
                        exclude: /node_modules/,
                        loader: 'babel-loader'
                    }]
                },
                resolve: {
                    extensions: ['.es6', '.js', '.jsx']
                },
                stats: {
                    colors: true
                },
                progress: false,
                devtool: 'source-map',
                plugins: [
                    new webpack.DefinePlugin({
                        'process.env': {
                            NODE_ENV: JSON.stringify('production')
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        },
                        output: {
                            comments: false
                        },
                        sourceMap: true
                    })
                ]
            },
        },
        less: {
            release: {
                files: {
                    'app/style.css': 'src/less/style.less'
                }
            }
        },
        copy: {
            bootstrap: {
                files: [
                    {
                        expand: true,
                        src: ['**'],
                        dest: 'app/lib/bootstrap',
                        cwd: 'node_modules/bootstrap/dist/'
                    }
                ]
            },
            flags: {
                files: [
                    {
                        expand: true,
                        src: ['css/**/*', 'flags/**/*'],
                        dest: 'app/lib/flag-icon-css',
                        cwd: 'node_modules/flag-icon-css/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        src: ['css/**/*', 'fonts/**/*'],
                        dest: 'app/lib/font-awesome',
                        cwd: 'node_modules/font-awesome/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-pug');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
};