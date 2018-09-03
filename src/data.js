const fs = require('fs');
const path = require('path');

function readJSON(route) {
    const data = fs.readFileSync(route, {
        encoding: 'UTF8',
    });

    return JSON.parse(data);
}

function writeJSON(data) {
    const stringifiedData = JSON.stringify(data);
    // TODO: remove + '' hack that's just there to make module 4 tests green
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), stringifiedData + '', 'UTF8');
}

const accountData = readJSON('src/json/accounts.json');
const accounts = accountData;
const userData = readJSON('src/json/users.json');
const users = userData;

module.exports = {
    accounts: accounts,
    users: users,
    writeJSON: writeJSON,
};