const path = require('path');
const express = require('express');

const app = express();

const data = require('./data');
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

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

app.get('/profile', (req, res) => {
    return res.render('profile', {
        user: users[0]
    });
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

app.listen(3000, () => {
    console.log('PS Project Running on port 3000!');
});