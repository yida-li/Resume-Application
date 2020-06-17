const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');

// Connect to the DB
connectDB();

// Access the body of request, no need for body-parser
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set the static folder
  app.use(express.static('client/build'));
  // For all routes that do are not served by dabove routes, move index.html to client/build and use it
  // to take care of those routes.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'buid', 'index.html'))
  );
}
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
