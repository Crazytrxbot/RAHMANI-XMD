const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUI1WHQ0STk4TTJjQjhVMWtYbUxPWFUyNVJSd0t6MVRBa3hjTGR5ckRVND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHhSeG0rY0ZxQVRRdXQ0VTEvUzE2R1RNV3YrYXRTdmkxczN3aXBVY1pFTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXSGllMGpzWDhSZWl2N3FvZVFxZjhPYnptZzN2eFo0V3JWWmpPUXljbmtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvcy9wK05scWpiU0xSK3dhZ3krQ1lKTkJiOXRueFlWa3p6dHFNakRFdjBrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKcjE5NXozQW5NQldjSFR3OHJtaGhsY0FoTWVYTjVyWlhmM2J1QkdNWFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9FdDQ3TzBoZ3V5UGowNkdOV1I4bEVSbmp3b2VZMzk3L2t1YXlEMU9yREU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUdWaVVuMXRzc1B3TmJ3V1N6UEcwcXpsTElrTGtBa3p4cU5vUkJrM2NHND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNSt4Zmt5ckxaenRYTk55UHh3dGh4d3FOZU8zclluOEVRZWtUaEN2eVBWST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc4UXltODB2MWdkTFQwM25TaVRudkdyc281Qk5sSVBaS3FES2tiWlFhVnc5Z3owL29BRDc0VGZYRHk5dUdtNThZYVRWOUFyVVBhM1FLNno1K1lDemlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6IjM3V2Z4YlBnQXdPMXA2K0hoWnRpVDNoeitmbzJDSnIyOERjZGRVYWJ4SUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE5MzMzMjgyMzMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjcyRTIzQjgyMTcyNEI5RUU3MzI4N0MxMDQ2RDQ5NDQ2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDgxNTY2MTF9LHsia2V5Ijp7InJlbW90ZUppZCI6IjkxOTMzMzI4MjMzM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2QTg0MzFBN0Y5NzVFMUNGQzJFNTlGNzBERTY2QjhCMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4MTU2NjEyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTkzMzMyODIzMzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNDkxRTVBMkY0NDQ5MjFDMUNDRDRENUZFNkZBREM0MzYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODE1NjY0Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUTRKMk5WVFQiLCJtZSI6eyJpZCI6IjkxOTMzMzI4MjMzMzoxMkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjIyMjQxMDY3MDM2Njc3OToxMkBsaWQiLCJuYW1lIjoi4pyoUy5EZWIg4pyoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOcmc5TFVCRUxLQnk4RUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXS2hWamw5aXdYczJRMkhiOVJqbDZyTUloa3VEdC8raGN0SnFUczVSNVFrPSIsImFjY291bnRTaWduYXR1cmUiOiI0TFBhZy9YSnRBOXNWSGh4S0JRTm1RaGVSM0lMM1paRHNaMTdBVGxjUDZHbTlaRjZ0STI4ejNTTGg1RGxRYWIxcWU4Ym1pRmFZM1kxRTEvSTFFRkFBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiazBIMzN5TXV4SE5yT2YxRVFEV1dLejdMRXJOd2pROXlxZWZoS3I2TVZCV055QWl2QWtjVlhBTVkyVlBmWG1oUFBrTW1qZnFEc3g4aGRSaGIxKzU3amc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTkzMzMyODIzMzM6MTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVmlvVlk1ZllzRjdOa05oMi9VWTVlcXpDSVpMZzdmL29YTFNhazdPVWVVSiJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4MTU2NjA2LCJsYXN0UHJvcEhhc2giOiIyTUZLUFEiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZLNyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "rahman md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "rahman md",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'RAHMAN MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/aktbgo.jpg',
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
