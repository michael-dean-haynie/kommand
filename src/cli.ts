#!/usr/bin/env node

import { Command } from 'commander';
import packageJson from '../package.json';
import Enquirer from 'enquirer';
import { exec } from 'child_process';
import { promisify } from 'util';

// Convert exec into a promise-based function
const execAsync = promisify(exec);

// TODO: figure this out
const { AutoComplete } = Enquirer as any;

// entry point
main();


async function main() {
  const kommands = await prepareKommands();
  const program = await prepareProgram(kommands);
  program.parse();
}

async function prepareKommands(): Promise<Map<string, Kommand>> {
  const kommands: Map<string, Kommand> = new Map();
  try {
    const { stdout, stderr } = await execAsync('mdfind "kind:application"');
    // Log output
    // if (stdout) console.log('Output:', stdout);
    // if (stderr) console.error('Error:', stderr);

    // 🌐 🗂️ 🔖 📑 💻 📕
    const openApplicationKommands = stdout.split('\n')
      .filter(Boolean) // remove empty lines
      .map(file => new OpenApplicationKommand(
        file,
        trimUpToLastChar(file, '/'),
        file
      ));

    for (const openApplicationKommand of openApplicationKommands) {
      kommands.set(openApplicationKommand.searchName, openApplicationKommand);
    }

    return kommands;
  } catch (err) {
    console.error('Command failed:', err instanceof Error ? err.message : err);
    throw err;
  }
}

async function prepareProgram(kommands: Map<string, Kommand>): Promise<Command> {
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

  program.action(async (...args: any[]) => {
    try {
      await programAction(kommands, ...args);
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  return program;
}

async function programAction(kommands: Map<string, Kommand>, ...args: any[]) : Promise<void> {
  const prompt = new AutoComplete({
    name: 'command',
    message: 'Select a command:',
    limit: 10,
    choices: [...kommands.values()].map(kommand => kommand.searchName),
  });

  const selected = await prompt.run();
  const kommand = kommands.get(selected);
  await kommand?.execute();
}

interface Kommand {
  id: string;
  searchName: string;
  execute(): Promise<void>;
}

class OpenApplicationKommand implements Kommand {
  constructor(
    public readonly id: string,
    public readonly searchName: string,
    public readonly applicationName: string,
  ) {}

  async execute(): Promise<void> {
    exec(`open "${this.applicationName}"`, async (err, stdout, stderr) => {
      if (err) {
          console.error(`Error: ${stderr}`);
          return;
      }
    });
  }
}

function trimUpToLastChar(input: string, char: string) {
  const index = input.lastIndexOf(char);
  if (index === -1) {
    return input; // If the character is not found, return the original string
  }
  return input.substring(index + 1).trim(); // Extract everything after the character
}
