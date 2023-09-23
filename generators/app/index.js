'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the ${chalk.red('SAP Digital Manufacturing Cloud POD Plugin V1.0.15')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: 'What is the name of your plugin?',
        default: "testPlugin"
      },
      {
        type: 'input',
        name: 'host',
        message: 'What is your DMC host name?',
        default: "dmc-az-cons-training.test.execution.eu20.dmc.cloud.sap"
      },
      {
        type: 'input',
        name: 'namespace',
        message: 'What is your plugin namespace?',
        default: "sap.com.plugins"
      },
      {
        type: 'confirm',
        name: 'workcenter',
        message: 'Support WORK_CENTER PODS?',
        default: true
      },
      {
        type: 'confirm',
        name: 'operation',
        message: 'Support OPERATION PODS?',
        default: true
      },
      {
        type: 'confirm',
        name: 'order',
        message: 'Support ORDER PODS?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    
    this.fs.copyTpl(
      this.templatePath('xs-security.json'),
      this.destinationPath('xs-security.json'),
      {xsappname: this.props.pluginName}
    );
    
  /*  this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {name: this.props.pluginName}
    );*/

    this.fs.copyTpl(
      this.templatePath('mta.yaml'),
      this.destinationPath('mta.yaml'),
      {name: this.props.pluginName, host: this.props.host}
    );

    this.fs.copyTpl(
      this.templatePath('template/xs-app.json'),
      this.destinationPath(this.props.pluginName+'/xs-app.json'),
      {name: this.props.pluginName}
    );

    this.fs.copyTpl(
      this.templatePath('template/package.json'),
      this.destinationPath(this.props.pluginName+'/package.json'),
      {name: this.props.pluginName}
    );

    /*this.fs.copyTpl(
      this.templatePath('template/package-lock.json'),
      this.destinationPath(this.props.pluginName+'/package-lock.json'),
      {name: this.props.pluginName}
    );*/

    this.fs.copyTpl(
      this.templatePath('template/webapp/index.html'),
      this.destinationPath(this.props.pluginName+'/webapp/index.html'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );

    var strPodTypes = "[";
    
    if (this.props.workcenter){strPodTypes=strPodTypes+"\"WORK_CENTER\"";}
    if (this.props.workcenter && this.props.operation){strPodTypes=strPodTypes+",";}
    
    if (this.props.operation){strPodTypes=strPodTypes+"\"OPERATION\"";}
    if (this.props.operation && this.props.order){strPodTypes=strPodTypes+",";}

    if (this.props.order){strPodTypes=strPodTypes+"\"ORDER\"";}

    var strPodTypes= strPodTypes+"]";


    this.fs.copyTpl(
      this.templatePath('template/webapp/designer/components.json'),
      this.destinationPath(this.props.pluginName+'/webapp/designer/components.json'),
      {name: this.props.pluginName, namespace: this.props.namespace, podTypes: strPodTypes}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/serviceBinding.js'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/serviceBindings.js')
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/manifest.json'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/manifest.json'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/Component.js'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/Component.js'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/view/MainView.view.xml'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/view/MainView.view.xml'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/model/models.js'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/model/models.js')
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/i18n/builder.properties'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/i18n/builder.properties'),
      {name: this.props.pluginName}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/i18n/i18n.properties'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/i18n/i18n.properties'),
      {name: this.props.pluginName}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/css/style.css'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/css/style.css')
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/controller/MainView.controller.js'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/controller/MainView.controller.js'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );

    this.fs.copyTpl(
      this.templatePath('template/webapp/template/builder/PropertyEditor.js'),
      this.destinationPath(this.props.pluginName+'/webapp/'+this.props.pluginName+'/builder/PropertyEditor.js'),
      {name: this.props.pluginName, namespace: this.props.namespace}
    );
  }

  install() {
    var npmdir = process.cwd() + '/' +this.props.pluginName;
    process.chdir(npmdir);

    this.npmInstall();

    }

  end() {
    this.log(
      yosay(
        `All finshed! Ready for you to add some cool functionality`
      ));
  }
};
