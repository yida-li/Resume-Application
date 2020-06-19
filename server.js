const express = require('express');
const app = express();

const MoonBot = require('./config/db');

MoonBot(); // connection with mongoDB database

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json('Hello, Welcome to Infinity'));

app.use('/api/users', require('./routes/users'));

app.use('/api/auth', require('./routes/auth'));

app.use('/api/contacts', require('./routes/contact'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
