const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason, 
    Browsers, 
    makeInMemoryStore 
} = require("@whiskeysockets/baileys") // මම මේක @whiskeysockets වලට update කළා, මේක වඩාත් ස්ථාවරයි
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const { smsg } = require('./chatHandler') // path එක ඔයාගේ base එකට අනුව පරීක්ෂා කරන්න

async function startSenuraMD() {
    // --- Session ID එක GitHub Secrets වලින් ලබා ගැනීම ---
    if (!fs.existsSync('./session/creds.json')) {
        const session_id = process.env.SESSION_ID;
        if (session_id) {
            console.log(chalk.yellow("Connecting using Session ID..."));
            if (!fs.existsSync('./session')) fs.mkdirSync('./session');
            
            // Session ID එක string එකක් නම්, ඒක creds.json එකට ලියනවා
            // සමහරවිට ඔයාගේ Session ID එක Base64 format එකෙන් තියෙන්න පුළුවන්
            const sessionData = Buffer.from(session_id, 'base64').toString('utf-8');
            fs.writeFileSync('./session/creds.json', sessionData);
        }
    }

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
                > SENURA MD IS ACTIVE <
    `))

    senura.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason !== DisconnectReason.loggedOut) {
                startSenuraMD()
            } else {
                console.log(chalk.red("Logged out. Please update your Session ID!"));
            }
        } else if (connection === 'open') {
            console.log(chalk.green('Senura MD Connected Successfully! ✅'));
            senura.sendMessage(senura.user.id, { text: "_Senura MD connected successfully!_" });
        }
    })

    senura.ev.on('creds.update', saveCreds)

    senura.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            const m = smsg(senura, mek)
            require("./Base/BOT/src/Utils/chatHandler")(senura, m, chatUpdate)
        } catch (err) {
            console.log(err)
        }
    })

    return senura
}

startSenuraMD()
