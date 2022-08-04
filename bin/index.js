#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import { spawn } from 'child_process'

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

  if (prefix === '[FEATURE]') {
    console.log(chalk.blue(prefix))
  } else if (prefix === '[BUGFIX]') {
    console.log(chalk.magenta(prefix))
  } else if (prefix === '[SETUP]') {
    console.log(chalk.yellowBright(prefix))
  } else {
    console.log(chalk.cyanBright(prefix))
  }
}

async function comment() {
  const message = await inquirer.prompt({
    type: 'input',
    message: 'Write your comment: ',
    name: 'gitComment',
  })

  note = message.gitComment
  console.log(chalk.cyan(note))
}

async function handleGitCommit() {
  var command = 'git'
  var args = ['commit', '-m', `${prefix} ${note}`]
  const child = spawn(command, args)

  child.stderr.on('data', (data) => {
    console.log(chalk.cyanBright(`${data}`))
  })

  child.stdout.on('data', (data) => {
    console.log(chalk.whiteBright(`${data}`))
  })
}

await selectPrefix()
await comment()
await handleGitCommit()
