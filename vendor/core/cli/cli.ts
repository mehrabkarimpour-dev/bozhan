const yargs = require('yargs')

export default () => {
    yargs
        .command('ppp', 'Tells whether an year is leap year or not', {
            year: {
                description: 'the year to check for',
                alias: 'y',
                type: 'number',
            }
        })
        .option('time', {
            alias: 't',
            description: 'Tell the present Time',
            type: 'boolean',
        })
        .help()
        .alias('help', 'h')
        .argv;

}