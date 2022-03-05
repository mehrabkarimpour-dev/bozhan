import 'dotenv'

/*
*    elastic configuration
* */
const elasticConfig: any = {
    port: process.env.ELASTIC_PORT || 9200,
    url: process.env.ELASTIC_URL || 'http://localhost',
}

export default elasticConfig








