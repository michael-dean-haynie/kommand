#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';
import Enquirer from 'enquirer';

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

program.action((positional, optional, options) => {
    main().catch(console.error);
});

program.parse();

async function main() {
    const { AutoComplete } = Enquirer as any;
  
    const prompt = new AutoComplete({
      name: 'command',
      message: 'Select a command:',
      choices: ['start', 'stop', 'restart', 'status', 'configure'],
    });
  
    const command = await prompt.run();
    console.log(`You selected: ${command}`);
}