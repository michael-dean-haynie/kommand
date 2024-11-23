#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

program
  .name('my-cli-tool')
  .description('A sample CLI tool written in TypeScript')
  .version('1.0.0');

program
  .option('-v, --verbose', 'Enable verbose mode')
  .option('-c, --config <path>', 'Specify a config file');

program
  .argument('<positional>', 'A required positional argument')
  .argument('[optional]', 'An optional positional argument');

program.action((positional, optional, options) => {
  console.log('Positional Argument:', positional);
  console.log('Optional Argument:', optional);
  console.log('Options:', options);
});

program.parse();