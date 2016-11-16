'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var util = require('util');
var username = require('username')

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('azure-cli command module') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'commandModuleName',
      message: 'Command module name:'
    },
    {
      type: 'input',
      name: 'commandModuleDescription',
      message: 'Command module description:',
      default: 'My azure-cli command module'
    },
    {
      type: 'input',
      name: 'authorName',
      message: 'Author name:',
      default: function () {
        return username.sync();
      }
    },
    {
      type: 'input',
      name: 'commandModuleVersion',
      message: 'Command module version number:',
      default: '0.1.0'
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    let longCommandModuleName = util.format('azure-cli-%s', this.props.commandModuleName);
    let folderStructure = util.format('%s/azure/cli/command_modules/%s', longCommandModuleName, this.props.commandModuleName);
    mkdirp.sync(folderStructure)

    let setupFileData = {
      commandModuleVersion: this.props.commandModuleVersion,
      longCommandModuleName: longCommandModuleName,
      commandModuleDescription: this.props.commandModuleDescription,
      authorName: this.props.authorName,
      shortCommandModuleName: this.props.commandModuleName
    };

    this.fs.copyTpl(
      this.templatePath('setup.py'),
      this.destinationPath(util.format('%s/%s', longCommandModuleName, 'setup.py')),
      setupFileData);

    let readmeFileData = {
      shortCommandModuleName: this.props.commandModuleName
    };

    this.fs.copyTpl(
      this.templatePath('README.rst'),
      this.destinationPath(util.format('%s/%s', longCommandModuleName, 'README.rst')),
      readmeFileData);

    this.fs.copy(
      this.templatePath('requirements.txt'),
      this.destinationPath(util.format('%s/%s', longCommandModuleName, 'requirements.txt')));

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath(util.format('%s/%s', longCommandModuleName, '__init__.py')));

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath(util.format('%s/azure/%s', longCommandModuleName, '__init__.py')));

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath(util.format('%s/azure/cli/%s', longCommandModuleName, '__init__.py')));

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath(util.format('%s/azure/cli/command_modules/%s', longCommandModuleName, '__init__.py')));

    this.fs.copy(
      this.templatePath('__init__.py'),
      this.destinationPath(util.format('%s/azure/cli/command_modules/%s/%s', longCommandModuleName, this.props.commandModuleName, '__init__.py')));

    this.fs.copy(
      this.templatePath('_params.py'),
      this.destinationPath(util.format('%s/azure/cli/command_modules/%s/%s', longCommandModuleName, this.props.commandModuleName, '_params.py')));

    this.fs.copy(
      this.templatePath('commands.py'),
      this.destinationPath(util.format('%s/azure/cli/command_modules/%s/%s', longCommandModuleName, this.props.commandModuleName, 'commands.py')));

    this.fs.copy(
      this.templatePath('custom.py'),
      this.destinationPath(util.format('%s/azure/cli/command_modules/%s/%s', longCommandModuleName, this.props.commandModuleName, 'custom.py')));
  }
});
