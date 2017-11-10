// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [ 'spec/**/*.spec.ts' ],
  mochaOpts: {
    ui: 'bdd',                  // use the describe/it syntax (default: 'bdd').
    compiler: 'ts:ts-node/register'   // interpret step definitions as TypeScript
  },
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',
  frameworkPath: require.resolve('serenity-js'),
  serenity: {
    dialect: 'mocha',
    requirementsDirectory: `${process.cwd()}/features`,
    outputDirectory: `${process.cwd()}/target/site/serenity/`
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  // onPrepare() {
  //   require('ts-node').register({
  //     project: 'e2e/tsconfig.e2e.json'
  //   });
  //   jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  // }
};
