import ElasticAbstract from "./elasticAbstract";


export default class Elastic extends ElasticAbstract {

    /**
     * @param query
     */
    public async sql(query: string) {
        try {
            const result = await this.appendQuery(query)
            return this.cleanData(result)

        } catch (e) {
            return null
        }
    }
    /**
     *
     * @param index
     * @param query
     * @param fields
     */
    public async searchMachs(index: string, query: string, fields: [] | any): Promise<object | null> {
        try {
            let res = await this.client.search({
                index: index,
                query: {
                    multi_match: {
                        query,
                        fields
                    }
                }
            })
            return res?.hits
        } catch (e) {
            return null
        }
    }

    /**
     * @param index
     * @param matchData
     */
    public async searchMach(index: string, matchData: object): Promise<object | null> {
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
     * @param docs
     */
    public async index(index: string, docs: object): Promise<boolean | undefined | null> {

        let type = Function.prototype.call.bind(Object.prototype.toString);

        try {
            if (type(docs) === '[object Array]') {
                // @ts-ignore
                for (let doc of docs) {
                    await this.client.index({
                        index: index,
                        document: doc
                    })
                }
            } else {
                await this.client.index({
                    index: index,
                    document: docs
                })
            }
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
    /**
     * @param query
     * @private
     */
    private async appendQuery(query: string) {
        return await this.client.sql.query({
            query
        })
    }
    /**
     * @param result
     * @private
     */
    private async cleanData(result: any) {
        return result.rows.map((row: any) => {
            let obj: { [index: string]: object } = {}
            for (let i = 0; i < row.length; i++) {
                obj[result.columns[i].name] = row[i]
            }
            return obj
        })
    }
}