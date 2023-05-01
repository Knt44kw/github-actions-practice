// npm install @actions/core @actions/github @actions/exec でインストールする前提
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run () {
  core.notice("Hello from custom JavaScript Actions")
  

}

run();