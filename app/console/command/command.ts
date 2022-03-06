#!/usr/bin/env node
const {exec} = require('child_process')
let fs = require('fs');
let program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');


program
    .command('ping')
    .action(function () {
        console.log(chalk.blue(figlet.textSync('P O N G', {horizontalLayout: 'full'})))
    })
program
    .command('run')
    .action(function () {
        console.log('run')
    })

// @ts-ignore
function editFile(type, path, content) {
    let pathArray = path.split('/')
    delete pathArray[pathArray.length - 1]
    let pathString = pathArray.join('/')

    if (!fs.existsSync(pathString)) {
        fs.mkdirSync(pathString)
    }
    // @ts-ignore
    fs.writeFile(path, content, function (err) {
        if (err)
            return console.log(chalk.red(`create ${type} failed ! \n ${err}`))
        console.log(chalk.magenta(figlet.textSync('BOZHAN', {horizontalLayout: 'full'})), chalk.blue(`${type} created successFully...`))
    })
}

// @ts-ignore
function createFile(fileWithPath) {

    exec(fileWithPath)
}

// @ts-ignore
function eventMaker(argsArray) {
    //createFile('touch app/events/published/' + argsArray[1] + '.ts')
    let content = "import {Dispatchable} from '../../../vendor/core/event/Dispatchable';\n\nexport class " + argsArray[1] + " extends Dispatchable {\n\n    public name: string = '" + argsArray[1] + "'\n\n\n    public registerListeners()\n{\n        return [\n\n        ]\n\n    }\n\n    public run(...parameters: any) {\n\n    }\n\n}"
    editFile(argsArray[0], 'app/events/published/' + argsArray[1] + '.ts', content)
}

// @ts-ignore
async function listenerMaker(argsArray) {
    let content = "export class " + argsArray[1] + "{\n\n    public handle(parameters: any = null) {\n\n    }\n\n}"
    editFile(argsArray[0], 'app/listeners/' + argsArray[1] + '.ts', content)
}

// @ts-ignore
async function controllerMaker(argsArray) {
    let content = "export {}\nimport 'reflect-metadata';\nimport {Request, Response} from 'express';\nimport {Controller} from './controller';\n\n\nclass " + argsArray[1] + " extends Controller {\n\n\n\n    constructor() {\n        super([]);\n    }\n\n\n    public index = async (req: Request, res: Response) => {\n\n    }\n\n}\n\nexport default " + argsArray[1] + ""
    editFile(argsArray[0], 'app/http/controllers/' + argsArray[1] + '.ts', content)
}

let makeAbles = {
    event: eventMaker,
    listener: listenerMaker,
    controller: controllerMaker
}

program.command('make <type>')
    // @ts-ignore
    .action(async function (args) {
        let argsArray = args.split(':')
        // @ts-ignore
        if (!argsArray[1]) return console.log(chalk.red(`name ${argsArray[0]} is required !`))

        // @ts-ignore
        if (makeAbles[argsArray[0]]) {
            // @ts-ignore
            return makeAbles[argsArray[0]](argsArray)
        }
        console.log(chalk.red(`Bozhan can't create ${argsArray[0]} !`))
    })

program.parse()
