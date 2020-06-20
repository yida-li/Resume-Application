const express = require('express');
const app = express();

const ooo = require('./config/db');
ooo();
const PORT = process.env.PORT || 4000;

app.use('api/users', require('./routes/users'));
app.use('api/auth', require('./routes/auth'));
app.use('api/contact', require('./routes/contacts'));

app.listen(PORT, () => console.log('i think backend servernpconnected ok?'));
