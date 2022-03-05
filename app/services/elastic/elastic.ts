import ElasticAbstract from "./elasticAbstract";


export default class Elastic extends ElasticAbstract {


    public async search(index: string, match: object) {
        let res = await this.client.search({
            index: index,
            query: {
                match: match
            }
        })
        return res?.hits
    }

    public async index(index: string, doc: object) {
        await this.client.index({
            index: index,
            document: doc
        })
        await this.refresh(index)
    }

    /*
    * ================= private functions =====================
    * */
    private async refresh(index: string) {
        await this.client.indices.refresh({index: index})
    }
}