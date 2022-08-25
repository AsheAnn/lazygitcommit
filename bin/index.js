#!/usr/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import { spawn } from 'child_process'

var prefix
var title
var content

async function selectPrefix() {
  const answers = await inquirer.prompt({
    type: 'list',
    message: 'Select git comment prefix: ',
    name: 'prefix',
    choices: [
      '[FEATURE]',
      '[BUGFIX]',
      '[BUILD]',
      '[STYLE]',
      '[REFACTOR]',
      '[DOCS]',
    ],
  })

  prefix = answers.prefix

  if (prefix === '[FEATURE]') {
    console.log(chalk.blue(prefix))
  } else if (prefix === '[BUGFIX]') {
    console.log(chalk.magenta(prefix))
  } else if (prefix === '[BUILD]') {
    console.log(chalk.yellowBright(prefix))
  } else if (prefix === '[REFACTOR]') {
    console.log(chalk.redBright(prefix))
  } else if (prefix === '[DOCS]') {
    console.log(chalk.green(prefix))
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

  title = message.gitComment
  console.log(chalk.blue(title))

  const description = await inquirer.prompt({
    type: 'input',
    message: 'Write your description: ',
    name: 'gitDescription',
  })

  content = description.gitDescription
  console.log(chalk.yellow(content))
}

async function handleGitCommit() {
  var command = 'git'
  var args = ['commit', '-m', `${prefix} ${title}`, '-m', `${content}`]

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
