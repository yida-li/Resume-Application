// entry point to our backend

const express = require('express');

const connectDB = require('./config/db');

const app = express();

// Initialize middleware
app.use(express.json({ extended: false })); // allows to accept body data supposedely

connectDB();

app.get('/', (req, res) => res.send('Hello Eden'));

// paths to other files

app.use('/api/users', require('./routes/users'));
app.use('/api/authentication', require('./routes/authentication'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`'Server started on port ${PORT}`));
