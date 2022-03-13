import {Container} from "../../../app/providers/AppContainer"

const fastcsv = require("fast-csv")
const fs = require("fs")

let Exports: any = []

function checkDirectoryExists(path: string) {
    let pathArray = path.split('/')
    let newPathMustBeCreated: string = ''
    if (pathArray.length > 1) {
        delete pathArray[pathArray.length - 1]
        for (let i = 0; i < pathArray.length; i++) {
            if (pathArray[i]) {
                newPathMustBeCreated += pathArray[i] + '/'
                if (!fs.existsSync(newPathMustBeCreated)) {
                    fs.mkdirSync(newPathMustBeCreated)
                }
            }
        }
    }
}

const cleanPath = (path: string) => {
    if (path[0] !== '/') {
        path = '/' + path
    }
    checkDirectoryExists('storage' + path)
}

Container._exports.map((Export: any) => {
    let _objExport = new Export()
    _objExport.output = (...data: Array<object>) => {
        let dataFormat = _objExport.run(...data)
        cleanPath(_objExport.path)
        const ws = fs.createWriteStream('storage/' + _objExport.path);
        fastcsv.write(...dataFormat, {headers: true})
            .on("finish", function () {
                console.log("Write to CSV successfully!");
            })
            .pipe(ws);
    }
    Exports[_objExport.name] = _objExport
})

export default Exports