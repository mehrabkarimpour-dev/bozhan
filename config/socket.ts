import 'dotenv'
/*
* in current file you see websocket and socket io configuration
*  also you can add your custom web socket packages...
* ______________________________________________________________
* */

/*
*    socket.io configuration
* */
export const ioConfig = {}


/*
*    ws package configuration
* */
export const wbConfig: any = {
    port: process.env.WB_PORT || 9009,
    perMessageDeflate: {
        // See zlib defaults.
        chunkSize: process.env.WB_CHUNK_SIZE || 1024,
        memLevel: process.env.WB_MEM_LEVEL || 7,
        level:process.env.level || 3
    },

    zlibInflateOptions: {
        chunkSize: process.env.WB_ZLIB_CHUNK_SIZE || 10 * 1024
    },
    clientNoContextTakeover: process.env.WB_CLIENT_NO_CONTEXT_TAKEOVER || true,
    serverNoContextTakeover: process.env.WB_SERVER_NO_CONTEXT_TAKEOVER || true,
    serverMaxWindowBits: process.env.WB_SERVER_MAX_WINDOW_BITS || 10,
    concurrencyLimit: process.env.WB_CONCURRENCY_LIMIT || 10,
    threshold: process.env.WB_THRESHOLD || 1024
}

export const defaultChannel = [
    'allUsersChannel',
    'testChannel'
]






