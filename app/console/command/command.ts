#!/usr/bin/env node
const {exec} = require('child_process')

let program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');


program
    .command('ping')
    .action(function () {
        console.log(
            chalk.blue(figlet.textSync('P O N G', {horizontalLayout: 'full'}))
        )
    })
program
    .command('run')
    .action(function () {
        console.log('run')
    })
program.command('make')
    .action(function () {
        console.log('make')
    })

program.parse()
