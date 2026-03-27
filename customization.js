const fs = require('fs')
const chalk = require('chalk')

// API Details
global.APIs = {
	zenz: 'https://zenzapis.xyz',
}

global.APIKeys = {
	'https://zenzapis.xyz': '805a6c4430',
}

// Bot Details
global.owner = ['947xxxxxxxx'] // Oyaage number eka methana danna (Ex: 94712345678)
global.premium = ['94750433655']
global.ownernumber = '94750433655'
global.ownername = 'Senura'
global.botname = 'Senura MD'
global.footer = '© Senura MD 2024'
global.ig = 'https://github.com/senura' // Oyaage link ekak danna
global.region = 'Sri Lanka'
global.sc = 'https://github.com/senura/Senura-MD'
global.myweb = 'https://youtube.com'
global.packname = 'Senura MD Sticker Pack'
global.author = 'Senura'
global.sessionName = 'KEY_94750433655_1774583629244'
global.prefa = ['','!','.',',','🐤','🗿']
global.sp = '⭔'

// Message Settings
global.mess = {
    success: 'Done!',
    admin: 'Meka adminlata vitharayi!',
    botAdmin: 'Bot admin wenna ona!',
    owner: 'Meka owner ta vitharayi!',
    group: 'Meka groups wala vitharayi weda karanne!',
    private: 'Meka inbox vitharayi!',
    bot: 'Meka bot ta vitharayi!',
    wait: 'Poddak inna...',
    error: 'Error ekak awa!',
    endLimit: 'Limit eka iwarayi!',
}

global.limitawal = {
    premium: "Infinity",
    free: 100
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
