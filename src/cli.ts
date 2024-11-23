#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';

const program = new Command();

program
  .name('kommand')
  .alias('kd')
  .description(packageJson.description)
  .version(packageJson.version);


// program
//   .option('-v, --verbose', 'Enable verbose mode')
//   .option('-c, --config <path>', 'Specify a config file');

// program
//   .argument('<positional>', 'A required positional argument')
//   .argument('[optional]', 'An optional positional argument');

// program.action((positional, optional, options) => {
//   console.log('Positional Argument:', positional);
//   console.log('Optional Argument:', optional);
//   console.log('Options:', options);
// });

program.parse();