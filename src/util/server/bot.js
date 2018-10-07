#!/usr/bin/env node

require('yargs')
  .command('create-expenses', 'Create Expenses', yargs => yargs, async () => {
    console.log('run createExpenses.js');
    require('./api/createExpenses.js');
  }).argv;
