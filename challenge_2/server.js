const express = require('express');
const app = express();
const port = 3000

app.use(express.static('client'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/upload_json', (req, res) => {
  res.send(jsonToCSV(req.body.value));
})

//Take Json and convert it to csv
const jsonToCSV = (input) => {
  let parsed = JSON.parse(input);
  let result = [];
  let header = ['firstName', 'lastName', 'county', 'city', 'role', 'sales']

  let recursion = (input) => {
    let values = [];
    header.forEach(key => values.push(input[key]));
    result.push(values.join(', '));
    input.children.forEach(child => recursion(child));
  }

  recursion(parsed);
  return header.join(', ') + '\n' + result.join('\n');
}

app.listen(port, () => console.log(`Listening on port ${port}.`));