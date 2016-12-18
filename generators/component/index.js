var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
    
    constructor: function () {
        yeoman.Base.apply(this, arguments);
        this.argument('name', { type: String, required: true });
    },
    
    prompting: function() {
        
        var prompts = [{
            type   : 'confirm',
            name   : 'withState',
            message: 'Would you like to use state in this component?',
            default: true
        }];
        
        return this.prompt(prompts).then(function(props) {
            this.props = props;
        }.bind(this));
    },
    
    writing: function() {
        var srcPath = this.props.withState ? '_component_state.js' : '_component_func.js';
        var tmpName = this.name[0].toUpperCase() + this.name.slice(1);
        
        this.fs.copyTpl(
            this.templatePath(srcPath),
            this.destinationPath('public/src/js/components/' + _.snakeCase(this.name)+ '.js'),
            {name: tmpName}
        );

    }
});
