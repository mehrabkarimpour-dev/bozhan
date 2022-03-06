import ElasticAbstract from "./elasticAbstract";


export default class Elastic extends ElasticAbstract {

    /**
     * @param index
     * @param matchData
     */
    public async search(index: string, matchData: object): Promise<object | null> {
        try {
            let res = await this.client.search({
                index: index,
                query: {
                    match: matchData
                }
            })
            return res?.hits
        } catch (e) {
            return null
        }
    }

    /**
     * @param index
     * @param doc
     */
    public async index(index: string, doc: object): Promise<boolean | undefined | null> {
        try {
            await this.client.index({
                index: index,
                document: doc
            })
            await this.refresh(index)
        } catch (e) {
            return null
        }
    }

    /*
    * ================= private functions =====================
    * */
    /**
     * @param index
     * @private
     */
    private async refresh(index: string) {
        return await this.client.indices.refresh({index: index})
    }
}