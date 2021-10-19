const express = require('express');
const app = express();
const port = 3000

app.use(express.static('client'));
app.use(express.json());

app.post('/upload_json', (req, res) => {
  jsonToCSV(req.body);
  res.end();
})

//Take Json and convert it to csv
const jsonToCSV = (input) => {
  let result = [];
  let header = ['firstName', 'lastName', 'county', 'city', 'role', 'sales']

  let recursion = (input) => {
    let values = [];
    header.forEach(key => values.push(input[key]));
    result.push(values.join(', '));
    input.children.forEach(child => recursion(child));
  }

  recursion(input);
  console.log(result);
}

app.listen(port, () => console.log(`Listening on port ${port}.`));