const express = require('express');
const router = express.Router();

const {accounts, writeJSON} = require('../data');

router.get('/transfer', (req, res) => {
    return res.render('transfer');
});

router.post('/transfer', (req, res) => {
    let fromAccount = accounts[req.body.from];
    let toAccount = accounts[req.body.to];
    const amount = parseInt(req.body.amount, 10);

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    writeJSON(accounts);

    return res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) => res.render('payment', {account: accounts.credit}));

router.post('/payment', (req, res) => {
    const amount = parseInt(req.body.amount, 10);
    accounts.credit.balance -= amount;
    accounts.credit.available += amount;

    writeJSON(accounts);

    return res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;