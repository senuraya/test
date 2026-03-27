const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } = require("@adiwajshing/baileys")
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const chalk = require('chalk')

async function startSenuraMD() {
    const { state, saveCreds } = await useMultiFileAuthState(`./session`)
    
    const senura = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: Browsers.macOS('Desktop'),
        auth: state
    })

    console.log(chalk.cyan.bold(`
   _____                                 __  __ _____  
  / ____|                               |  \\/  |  __ \\ 
 | (___   ___ _ __  _   _ _ __ __ _     | \\  / | |  | |
  \\___ \\ / _ \\ '_ \\| | | | '__/ _\` |    | |\\/| | |  | |
  ____) |  __/ | | | |_| | | | (_| |    | |  | | |__| |
 |_____/ \\___|_| |_|\\__,_|_|  \\__,_|    |_|  |_|_____/ 
                > SENURA MD IS STARTING <
    `))

    senura.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason !== DisconnectReason.loggedOut) startSenuraMD()
        } else if (connection === 'open') {
            console.log(chalk.green('Senura MD Connected Successfully! ✅'))
        }
    })

    senura.ev.on('creds.update', saveCreds)
    return senura
}
startSenuraMD()
