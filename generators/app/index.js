'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
    
    prompting: function() {
        
        this.log(yosay(
            'Welcome to react-redux ' + chalk.red('generator-rr') + ' generator!'
        ));
        
        var prompts = [{
            type   : 'confirm',
            name   : 'useMaherial',
            message: 'Would you like to use matheril design?',
            default: true
        }];
        
        return this.prompt(prompts).then(function(props) {
            this.props = props;
        }.bind(this));
    },
    
    _generateGrunt: function() {
        
        this.gruntfile.insertConfig("browserify", "{options: { browserifyOptions: { paths: [ './public/src/js', './public/src' ],debug: true } }," +
            "dist: { options: { transform: [ ['babelify', {'presets': ['es2015', 'react']}] ] }," +
            "files: { 'public/build/js/bundle.js': ['public/src/js/index.js'] } } }");
    
        this.gruntfile.loadNpmTasks('grunt-browserify');
        this.gruntfile.loadNpmTasks('grunt-contrib-sass');
    
        this.gruntfile.registerTask('build', 'browserify');
    },
    
    writing: function() {
        
        var fsCopy = function(srcPath, distPath, opts) {
            var copyCommand = opts ? 'copyTpl' : 'copy';
            
            this.fs[copyCommand](
                this.templatePath(srcPath),
                this.destinationPath(distPath),
                opts
            );
        }.bind(this);
        
        fsCopy('index.js', 'public/src/js/index.js');
        fsCopy('_index.html', 'public/src/index.html', {title: 'Custom title'});
        fsCopy('_package.json', 'package.json', {appname: this.appname});
        fsCopy('routes.js', 'public/src/js/routes.js');
        fsCopy('actions', 'public/src/js/actions');
        fsCopy('components', 'public/src/js/components');
        fsCopy('reducers', 'public/src/js/reducers');
        fsCopy('.eslintrc', '.eslintrc');
    
        this._generateGrunt.call(this);
    },
    
    install: function() {
        this.npmInstall();
    }
});
