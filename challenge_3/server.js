const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('Get was made');
})

app.post('/', (req, res) => {
  console.log('Post was made');
})

app.listen(port, () => console.log(`Listening on port ${port}.`))