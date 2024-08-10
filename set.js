const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEZySGRScFU5MS8rdFpGQWdRTTU2UEdCV3JpT01lSDdFV3JkZXVjQVNsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiblpUVGpqWmcrVThMQUQ5dGxxS2ZWMkRpdnkwWExjOWY2MTFlQk1EODd4WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTQ0dObmd3eHJRT1Q2aHpNM3YzcFFSUTJIanBpbHRhbVh2MStUZTZhYldJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJld2dDN0NsOHhuU25zQzFHczhrY0NZUDVoZG94WjJJM01GQ1pscjBobnp3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlKRUlzSXI1NEpGRHhKTFhKY3RiNHhmQkRsTkFrNE9BM2QzUmJWVnBiVVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5IdHNIUHE0NnorblZScjcvWXdUdmlaU1pOZjc2V0xEL2U4eWs5Qng3SGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUNIaDhBay9ycm5iL0VKd01sSTk2QnNrNzMzY2ViWjJuMVB2TTJvbEZtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1RROC83am1QSXVpZzNOWUpwV3lsWDRvL1YrMlFLRnJxK0FPQzNITXpHRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing3VnlJQnp6bmw5aUZaWk9POUFjb0NWcUpPcmt6aTNSVzNsejY2VFVMbXQ1dWEveWxLR2RPejZIR2JyUmlzVTdIMzU1d1RIQ1U0QlJ5dSt0VUtmbmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJwRk53VGlVVTNLRm5QMkthLy9iaitFYVlmeG5sSjZNeVJWQzdlNW1MSzFnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc2OTkxNzA5NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3RkE0QjBFMzQ4MUQxQzZDNkYzMkFGQTM0MzNEREY0RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIzMjc4NjM5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJN1JrV3NaZVFIcXlZLTBGWVpaRHR3IiwicGhvbmVJZCI6ImI5YWMyOThkLTAwOTUtNDg5Yi1iYjNlLTIwNGYyNDcwMTU3MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZc0lmdWR0VVhlS1dXU0hNd2E3WlFLWmxhNkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMVhpeDl3ZlBpRkc1ME5pYStSamxiT0dISWFFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlNHTDhWOUxLIiwibWUiOnsiaWQiOiIyNTQ3Njk5MTcwOTQ6MzFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0wvanpjNEVFSjNLM0xVR0dDWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InY1VXRTbUU3SlNOUGlWUmZ1a2tGVHYzOTBXdzQxUnRWNUZaUjhXcjlPRmM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxPc3FQcDlhVW1aSWFqU2VWNXlranRvTmxOVFArQytYOVJkdVBIdG1uS3BINFhHUXZNajZaRXZ2SkVKdjA1KzhwMlFLYzExQVBEdjl0OS9UTFRWdkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4eU5VNjZqWnpvOHdIZmszYWw2WWlvenRVOWlmLzhnM2FTS3g5R2M4bENGelNUY1Bwc1cwWXUvdWdiTWtkZkl1eEsxTW8vaTFFeWIzSG9BV2xFYWRpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc2OTkxNzA5NDozMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiK1ZMVXBoT3lValQ0bFVYN3BKQlU3OS9kRnNPTlViVmVSV1VmRnEvVGhYIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMjc4NjM1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUgvMyJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "Gibril",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254769917094",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
