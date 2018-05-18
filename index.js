'use strict';

const bluebird = require('bluebird');
const exec = bluebird.promisify(require('child_process').exec, {multiArgs: true});

class ServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    // this.commands = {
    //   welcome: {
    //     usage: 'Helps you start your first Serverless plugin',
    //     lifecycleEvents: [
    //       'hello',
    //       'world',
    //     ],
    //     options: {
    //       message: {
    //         usage:
    //           'Specify the message you want to deploy '
    //           + '(e.g. "--message \'My Message\'" or "-m \'My Message\'")',
    //         required: true,
    //         shortcut: 'm',
    //       },
    //     },
    //   },
    // };

    // Using the same hooks as in graphcool/serverless-plugin-typescript:
    // https://github.com/graphcool/serverless-plugin-typescript/blob/master/src/index.ts#L39
    this.hooks = {
      'after:package:createDeploymentArtifacts': buildClojure.bind(null, serverless, options),
      'after:deploy:function:packageFunction': buildClojure.bind(null, serverless, options)
    };
  }
}

const buildClojure = (serverless, options) => {
  serverless.cli.log('Building Clojure');
  return exec('lein uberjar');
}

module.exports = ServerlessPlugin;
