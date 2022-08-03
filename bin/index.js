#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import { exec } from 'child_process'

var prefix
var note

async function selectPrefix() {
  const answers = await inquirer.prompt({
    type: 'list',
    message: 'Select git comment prefix: ',
    name: 'prefix',
    choices: ['[FEATURE]', '[BUGFIX]', '[SETUP]', '[STYLE]'],
  })

  prefix = answers.prefix
  prefix === '[FEATURE]'
    ? console.log(chalk.blue(prefix))
    : prefix === '[BUGFIX]'
    ? console.log(chalk.magenta(prefix))
    : prefix === '[SETUP]'
    ? console.log(chalk.yellowBright(prefix))
    : console.log(chalk.cyanBright(prefix))
}

async function comment() {
  const message = await inquirer.prompt({
    type: 'input',
    message: 'Write your comment: ',
    name: 'gitComment',
  })

  note = message.gitComment
  console.log(chalk.white(note))
}

async function handleGitCommit() {
  var command = 'git commit -m ' + `"${prefix} ${note}"`
  exec(command)
}

await selectPrefix()
await comment()
await handleGitCommit()
