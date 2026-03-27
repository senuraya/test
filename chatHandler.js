const chalk = require('chalk')

module.exports = async (senura, m, chatUpdate, store) => {
    try {
        const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage.text : ''
        const prefix = "."
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
        const from = m.key.remoteJid

        if (isCmd) {
            console.log(chalk.black(chalk.bgCyan('[ COMMAND ]')), command, 'from', m.pushName)
        }

        switch (command) {
            case 'menu': {
                let menuText = `*───「 SENURA MD 」───*\n\nHi ${m.pushName}!\n\n.alive\n.ping\n.owner\n\n*Powered by Senura*`
                await senura.sendMessage(from, { text: menuText }, { quoted: m })
                break
            }
            case 'ping':
                m.reply('Pong! ⚡')
                break
        }
    } catch (err) { console.log(err) }
}
