import {Client} from "@elastic/elasticsearch";
import elasticConfig from "../../../config/elastic";

export default abstract class ElasticAbstract {

    public client: any

    constructor() {
        this.client = new Client({node: `${elasticConfig.url}:${elasticConfig.port}`})
    }

    abstract search(index: string, match: object): any

    abstract index(index: string, doc: object): any

}