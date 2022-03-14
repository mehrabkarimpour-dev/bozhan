import {Container} from "../../../app/providers/AppContainer"

const fastcsv = require("fast-csv")
const fs = require("fs")

let Exports: any = []

async function checkDirectoryExists(path: string) {
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

const cleanPath = async (path: string) => {
    if (path[0] !== '/') {
        path = '/' + path
    }
    if (path[path.length - 1] !== '/') {
        path += '/'
    }
    await checkDirectoryExists('storage' + path)
    return path
}

function cleanName(name: string) {
    const first3 = name.substring(name.length - 4)
    if (first3 !== '.csv') name += '.csv'
    return name

}

Container._exports.map((Export: any) => {
    let _objExport = new Export()
    _objExport.output = async (data: Array<object>, name: string = 'file.csv') => {
        let dataFormat = _objExport.run(...data)
        let path = await cleanPath(_objExport.path)
        let clean_name = cleanName(name)

        const ws = await fs.createWriteStream('storage/' + path + clean_name)
        return fastcsv.write(dataFormat, {headers: true})
            .on("finish", function () {
                return 'storage/' + _objExport.path
            })
            .pipe(ws).path
    }
    Exports[_objExport.name] = _objExport
})

export default Exports