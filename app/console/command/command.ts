#!/usr/bin/env node
const {exec} = require('child_process')
let fs = require('fs');
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


program.command('make <type>')
    .action(async function (args) {
        let argsArray = args.split(':')
        exec('touch app/events/published/' + argsArray[1] + '.ts')
        let event = "import {Dispatchable} from '../../../vendor/core/event/Dispatchable';\n\nexport class "+argsArray[1]+" extends Dispatchable {\n\n    public name: string = '"+argsArray[1]+"'\n\n\n    public registerListeners()\n{\n        return [\n\n        ]\n\n    }\n\n    public run(...parameters: any) {\n\n    }\n\n}"
        fs.writeFile('app/events/published/' + argsArray[1] + '.ts', event, function (err) {
            if (err)
                return console.log(err);
            console.log('Wrote Hello World in file helloworld.txt, just check it');
        })
    })

program.parse()
