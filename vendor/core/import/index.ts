import {Container} from "../../../app/providers/AppContainer";

const csv = require('csv-parser')
const fs = require('fs')
import _imports = Container._imports


let Import: any = []

const cleanPath = (path: string) => {
    if (path[0] !== '/') path = '/' + path

    path = 'storage' + path

    console.log(path)
    return path
}

_imports.map((_import: any) => {
    if (_import) {
        let _objImport = new _import()
        let path = cleanPath(_objImport.path)
        let csvReaded: any = []
        _objImport.read = async () => {
            let d: any = []
            let res = await fs.createReadStream(path)
            let pip = await res.pipe(csv())
            await pip.on('data', async (data: any) => {
                await csvReaded.push(data)
                await d.push(data)
            })

            await pip.on('end', () => {
                _objImport.d = d
            })
            return csvReaded
        }
        _objImport.get = async function () {
            if (csvReaded.length == 0)
                await _objImport.read()
            return csvReaded
        }
        Import[_objImport.name] = _objImport
    }
})

export default Import