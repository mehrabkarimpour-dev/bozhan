#!/usr/bin/env node
const {exec} = require('child_process')
let fs = require('fs')
let program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')
const path = require("path");


program
    .command('ping')
    .action(function () {
        console.log(chalk.blue(figlet.textSync('P O N G', {horizontalLayout: 'full'})))
    })
program
    .command('run <command>')
    .action(function (commandName) {
        commandName += '.ts'
        let commandDosNotExists = true
        fs.readdirSync(__dirname).filter((file) => {
            return (file.indexOf('.') !== 0) && (file.slice(-3) === '.ts')
        }).forEach((file) => {

            if (file === commandName) {
                commandDosNotExists = false
            }
            exec("node app/console/command/supervisor.js --name=" + commandName)
            // exec("ts-node -e 'require('node app/console/command/" + file + "').run()'")
        })
        if (commandDosNotExists) {
            console.log(chalk.red('command ' + commandName + ' not found !'))
        }
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
    let content = "import {Dispatchable} from 'vendor/core/event/Dispatchable';\n\nexport class " + fileName + " extends Dispatchable {\n\n    public name: string = '" + fileName + "'\n\n\n    public registerListeners()\n{\n        return [\n\n        ]\n\n    }\n\n    public run(...parameters: any) {\n\n    }\n\n}"
    editFile(argsArray[0], 'app/events/' + argsArray[1] + '.ts', content, argsArray[1], 'app/events/')
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
    let queueContent = "import Queue from 'vendor/core/queue/queue'; \n\n class " + fileName + " extends Queue { \n\n    public name: string = '" + fileName + "'\n" +
        "    /*\n" +
        "    *  you also can rewrite current queue config with down properties...\n" +
        "    *\n" +
        "       //   public delay: number = 1000  // ms\n" +
        "       //   public removeOnComplete: boolean = true\n" +
        "       //   public attempts: number = 2\n" +
        "    *\n" +
        "    * */\n" +
        "    public handle(args: any) {\n\n\n   } \n\n}\n\n export default " + fileName + ""
    editFile(argsArray[0], 'app/queue/' + argsArray[1] + '.ts', queueContent, argsArray[1], 'app/queue/')
}

async function typeormModelMaker(argsArray) {
    let fileName = getFileName(argsArray[2])
    let typeormContent = "import {Entity, Column, PrimaryColumn} from \"typeorm\"; \n  \n  \n @Entity() \n class " + fileName + " { \n  \n     @Column() \n     id: number | undefined; \n } \n  \n  \n export default " + fileName + ""
    editFile(argsArray[0], 'app/models/typeorm/' + argsArray[2] + '.ts', typeormContent, argsArray[2], 'app/models/typeorm/')
}

async function mongooseModelMaker(argsArray) {
    let fileName = getFileName(argsArray[2])
    let mongooseContent = "import {Schema, model} from 'mongoose'; \n  \n interface " + fileName + " { \n   } \n  \n  \n const schema = new Schema<" + fileName + ">({ \n      }) \n  \n  \n  \n export default model<" + fileName + ">('" + fileName + "', schema)"
    editFile(argsArray[0], 'app/models/mongoose/' + argsArray[2] + '.ts', mongooseContent, argsArray[2], 'app/models/mongoose/')
}

async function sequelizeModelMaker(argsArray) {

    let fileName = getFileName(argsArray[2])

    let sequelizeContent = "'use strict';\n" +
        "import {Model} from 'sequelize';\n" +
        "\n" +
        "interface " + fileName + "Attributes {\n" +
        "    id: string\n" +
        "}\n" +
        "\n" +
        "module.exports = (Sequelize: any, DataTypes: any) => {\n" +
        "\n" +
        "\n" +
        "    class " + fileName + " extends Model<" + fileName + "Attributes> implements " + fileName + "Attributes {\n" +
        "        /**\n" +
        "         * Helper method for defining associations.\n" +
        "         * This method is not a part of Sequelize lifecycle.\n" +
        "         * The `database/index` file will call this method automatically.\n" +
        "         */\n" +
        "\n" +
        "        id!: string\n" +
        "\n" +
        "        static associate(models: any) {\n" +
        "          \n" +
        "        }\n" +
        "    }\n" +
        "\n" +
        "\n" +
        "    " + fileName + ".init({\n" +
        "        id: {\n" +
        "            allowNull: false,\n" +
        "            autoIncrement: true,\n" +
        "            primaryKey: true,\n" +
        "            type: DataTypes.INTEGER,\n" +
        "            validate: {\n" +
        "                notEmpty: true\n" +
        "            }\n" +
        "        }\n" +
        "    }, {\n" +
        "        sequelize: Sequelize,\n" +
        "        modelName: '" + fileName + "',\n" +
        "        tableName: '" + fileName + "s'\n" +
        "    });\n" +
        "\n" +
        "\n" +
        "    return " + fileName + "\n" +
        "}\n"
    editFile(argsArray[0], 'app/models/sequelize/' + argsArray[2] + '.ts', sequelizeContent, argsArray[2], 'app/models/sequelize/')
}


let modelsMakeAbles = {
    sequelize: sequelizeModelMaker,
    typeorm: typeormModelMaker,
    mongoose: mongooseModelMaker,
}

async function middlewareMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let queueContent = "import {NextFunction, Request, Response} from 'express' \n  \n  \n export class " + fileName + " { \n  \n  \n     public static _name: string = 'role' \n     public static hasParams: boolean = true \n     public static parameters: any = null \n  \n \n" +
        "    /**\n" +
        "     * Middleware can be calling in routes...\n" +
        "     *\n" +
        "     */ \n  \n     constructor(parameters: object | string | null = null) { \n         " + fileName + ".parameters = parameters \n     } \n  \n  \n     public async run(req: Request, res: Response, next: NextFunction) { \n         return next() \n     } \n  \n  }"
    editFile(argsArray[0], 'app/http/middleware/' + argsArray[1] + '.ts', queueContent, argsArray[1], 'app/http/middleware/')
}

async function requestMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let queueContent = "import {RequestsForm} from 'app/http/requests/Requests' \n import {NextFunction, Request, Response} from 'express' \n  \n  \n class " + fileName + " extends RequestsForm { \n  \n     public static params: any = null \n  \n     constructor() { \n         super(); \n     } \n  \n     public static validParams: object = [ \n           \n     ] \n  \n  \n     public static _name: string = '" + fileName + "' \n  \n     public validate() { \n         return [ \n            \n         ] \n     } \n  \n     public handle(req: Request, res: Response, next: NextFunction) { \n         return next() \n     } \n } \n  \n export default " + fileName + " "
    editFile(argsArray[0], 'app/http/requests/' + argsArray[1] + '.ts', queueContent, argsArray[1], 'app/http/requests/')
}

async function enumMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let enumContent = "enum " + fileName + " { \n\n }"
    editFile(argsArray[0], 'app/enums/' + argsArray[1] + '.ts', enumContent, argsArray[1], 'app/enums/')
}

async function jobMaker(argsArray) {
    let fileName = getFileName(argsArray[1])
    let jobContent = "\n" +
        "import {everyHour} from 'vendor/core/autoload/job/jobTime'; \n  \n class " + fileName + " { \n \n" +
        "    /*\n" +
        "    *   set cron job time .\n" +
        "    *      second  minute   hour   day of month.   month   day of week\n" +
        "    *         *      *       *          *           *          *\n" +
        "    * */  \n     public cronTime: string = everyHour() \n  \n     public index = async () => { \n  \n  \n  \n   } \n } \n \n export default " + fileName + ""
    editFile(argsArray[0], 'app/schedule/' + argsArray[1] + '.ts', jobContent, argsArray[1], 'app/schedule/')
}

async function modelMaker(argsArray) {
    if (modelsMakeAbles[argsArray[1]]) {
        return modelsMakeAbles[argsArray[1]](argsArray)
    }
    console.log(chalk.red(`${argsArray[1]} not found ! `))
    console.log(chalk.yellow(`only the following are supported : `))
    let makeAbleModels = Object.keys(modelsMakeAbles)
    for (let i = 0; i < makeAbleModels.length; i++) {
        console.log(chalk.blue(`${makeAbleModels[i]}`))
    }
}


let makeAbles = {
    event: eventMaker,
    listener: listenerMaker,
    controller: controllerMaker,
    queue: queueMaker,
    model: modelMaker,
    middleware: middlewareMaker,
    request: requestMaker,
    enum: enumMaker,
    job: jobMaker
}

program.command('make <type>')
    .action(async function (args) {
        let argsArray = args.split(':')

        if (!argsArray[1]) {
            let makeA = Object.keys(makeAbles)
            console.log(chalk.red(` What do you want to make ? `))
            for (let i = 0; i < makeA.length; i++) {
                console.log(chalk.blue(`${makeA[i]}`))
            }
            return
        }
        if (makeAbles[argsArray[0]]) {
            return makeAbles[argsArray[0]](argsArray)
        }
        console.log(chalk.red(`Bozhan can't create ${argsArray[0]} !`))
    })

program.parse()
