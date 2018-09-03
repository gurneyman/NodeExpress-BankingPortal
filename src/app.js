const path = require('path');
const express = require('express');

const app = express();

const data = require('./data');
const users = data.users;
const accounts = data.accounts;
const writeJSON = data.writeJSON;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.render('index', {
        title: 'Account Summary',
        accounts
    });
});

app.get('/savings', (req, res) => {
    return res.render('account', {
        account: accounts.savings
    });
});

app.get('/checking', (req, res) => {
    return res.render('account', {
        account: accounts.checking
    });
});

app.get('/credit', (req, res) => {
    return res.render('account', {
        account: accounts.credit
    });
});

app.get('/profile', (req, res) => {
    return res.render('profile', {
        user: users[0]
    });
});

app.get('/transfer', (req, res) => {
    return res.render('transfer');
});

app.post('/transfer', (req, res) => {
    let fromAccount = accounts[req.body.from];
    let toAccount = accounts[req.body.to];
    const amount = parseInt(req.body.amount, 10);

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    writeJSON(accounts);

    return res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

app.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount, 10);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount;

    writeJSON(accounts);

    return res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});