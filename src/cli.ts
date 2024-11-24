#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';
import Enquirer from 'enquirer';
import { exec } from 'child_process';

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

  exec('mdfind "kind:application"', async (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${stderr}`);
        return;
    }
    const results = stdout.split('\n')
     .filter(Boolean); // Remove empty lines
    //  .map(result => trimUpToLastChar(result, '/')) // remove path in front of application names
     // 🌐 🗂️ 🔖 📑 💻 📕

    const prompt = new AutoComplete({
      name: 'command',
      message: 'Select a command:',
      limit: 10,
      choices: results,
    });
  
    const command = await prompt.run();
    console.log(`You selected: ${command}`);
    exec(`open "${command}"`, async (err, stdout, stderr) => {
      if (err) {
          console.error(`Error: ${stderr}`);
          return;
      }
    });
  });
}

function trimUpToLastChar(input: string, char: string) {
  const index = input.lastIndexOf(char);
  if (index === -1) {
    return input; // If the character is not found, return the original string
  }
  return input.substring(index + 1).trim(); // Extract everything after the character
}