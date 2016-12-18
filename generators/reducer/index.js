var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    
    constructor: function() {
        yeoman.Base.apply(this, arguments);
        this.argument('name', {type: String, required: true});
    },
    
    writing: function() {
           
        this.fs.copy(
            this.templatePath('reducer.js'),
            this.destinationPath('public/src/js/reducers/' + _.snakeCase(this.name) + '_reducer.js')
        );
        
    }
});
