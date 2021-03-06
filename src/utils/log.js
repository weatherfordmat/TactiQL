import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

/**
 * This is a simple terminal based logging system;
 * I will add support for keeping .log files.
 */

export const error = (s) => logWrapper('error', chalk.red.bold, s)

export const info = (s) => logWrapper('info', chalk.blue, s)

// can I think of a better word for this?
export const describe = (s) => logWrapper('describe', chalk.gray, s)

export const warning = (s) => logWrapper('warning', chalk.yellow, s)

export const success = (s) => logWrapper('success', chalk.green.bold, s)

const pad = (s) => {
    return `${s}\n`;
}

const loggingLevel = (colors, included, cb, s) => {
    if (colors) {
        return cb();
    } else if (!included) {
        return null;
    } else {
        console.log(s);
    }
}

const logWrapper = (name, _c, s) => {
    let files = fs.readdirSync('./', 'utf-8');
    let idx = files.indexOf('.tactiqlrc');
    let t = files[idx]
    let config = JSON.parse(fs.readFileSync(t, 'utf-8'))["config"];
    return loggingLevel(
                config.colors, 
                config.logging.includes(name), 
                () => console.log.call(null, _c(pad(s))), 
                s
    );
}