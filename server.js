// entry point to my backend!!!!

// node as backend technology so so know

const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.json({
    msg: 'Welcome to the contactkeeper api.....'
  })
); // res.send is sending data ok?

//Define my routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000; // look for environment variable called port or 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
