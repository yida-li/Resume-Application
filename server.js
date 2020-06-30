const express = require('express');
const app = express();

const ooo = require('./config/db');
ooo();


// initialize middleware    use to be bodyparser, now integerated with express so lucky me eh
app.use(express.json({extended:false}));


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contacts'));



const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log('i think backend servernpconnected ok?'));
