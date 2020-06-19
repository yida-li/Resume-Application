const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log('i think backend servernpconnected ok?'));
