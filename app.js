const express = require('express');
const path = require('path');
const gameRoutes = require('./routes/game');

const port = 3000;

const app = express();



app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'public') ));

gameRoutes(app);


