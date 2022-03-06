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

function checkDirectoryExists(path, pathForCreate) {

    let pathArray = path.split('/')

    if (pathArray.length > 1) {
        delete pathArray[pathArray.length - 1]
        for (let i = 0; i < pathArray.length; i++) {
            if (pathArray[i]) {
                pathForCreate += '/' + pathArray[i]
                if (!fs.existsSync(pathForCreate)) {
                    fs.mkdirSync(pathForCreate)
                }
            }
        }

    }
}

function editFile(type, path, content, pathFile, pathForCreate) {
    checkDirectoryExists(pathFile, pathForCreate)

    fs.writeFile(path, content, function (err) {
        if (err)
            return console.log(chalk.red(`create ${type} failed ! \n ${err}`))
        console.log(chalk.magenta(figlet.textSync('BOZHAN', {horizontalLayout: 'full'})), chalk.blue(`${type} created successFully...`))
    })
}

function createFile(fileWithPath) {

    exec(fileWithPath)
}

function getFileName(filePath) {
    let fileName = filePath
    fileName = fileName.split('/')
    if (fileName.length > 1) {
        fileName = [fileName[fileName.length - 1]]
    }
    return fileName
}

function eventMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let content = "import {Dispatchable} from 'vendor/core/event/Dispatchable';\n\nexport class " + fileName + " extends Dispatchable {\n\n    public name: string = '" + argsArray[1] + "'\n\n\n    public registerListeners()\n{\n        return [\n\n        ]\n\n    }\n\n    public run(...parameters: any) {\n\n    }\n\n}"
    editFile(argsArray[0], 'app/events/published/' + argsArray[1] + '.ts', content, argsArray[1], 'app/events/published/')
}

async function listenerMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let content = "export class " + fileName + "{\n\n    public handle(parameters: any = null) {\n\n    }\n\n}"
    editFile(argsArray[0], 'app/listeners/' + argsArray[1] + '.ts', content, argsArray[1], 'app/listeners/')
}

async function controllerMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let content = "export {}\nimport 'reflect-metadata';\nimport {Request, Response} from 'express';\nimport {Controller} from 'app/http/controllers/controller';\n\n\nclass " + fileName + " extends Controller {\n\n\n\n    constructor() {\n        super();\n    }\n\n\n    public index = async (req: Request, res: Response) => {\n\n    }\n\n}\n\nexport default " + fileName + ""
    editFile(argsArray[0], 'app/http/controllers/' + argsArray[1] + '.ts', content, argsArray[1], 'app/http/controllers/')
}

async function queueMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let queueContent = "import Queue from 'vendor/core/queue/queue'; \n\n class " + fileName + " extends Queue { \n\n    public name: string = '" + argsArray[1] + "'\n" +
        "    /*\n" +
        "    *  you also can rewrite current queue config with down properties...\n" +
        "    *\n" +
        "       //   public delay: number = 1000  // ms\n" +
        "       //   public removeOnComplete: boolean = true\n" +
        "       //   public attempts: number = 2\n" +
        "    *\n" +
        "    * */\n" +
        "    public handle(args: any) {\n\n\n   } \n\n}\n\n export default " + fileName + ""
    editFile(argsArray[0], 'app/queue/published/' + argsArray[1] + '.ts', queueContent, argsArray[1], 'app/queue/published/')
}

let makeAbles = {
    event: eventMaker,
    listener: listenerMaker,
    controller: controllerMaker,
    queue: queueMaker
}

program.command('make <type>')
    .action(async function (args) {
        let argsArray = args.split(':')

        if (!argsArray[1]) return console.log(chalk.red(`name ${argsArray[0]} is required !`))
        if (makeAbles[argsArray[0]]) {
            return makeAbles[argsArray[0]](argsArray)
        }
        console.log(chalk.red(`Bozhan can't create ${argsArray[0]} !`))
    })

program.parse()
