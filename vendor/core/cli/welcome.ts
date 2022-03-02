const chalk = require('chalk');
const figlet = require('figlet');


export default () => {
    console.log(
        chalk.red(
            figlet.textSync('B O Z H A N ', {horizontalLayout: 'full'})
        )
    );
}