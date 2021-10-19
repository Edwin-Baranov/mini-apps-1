const express = require('express');
const app = express();
const port = 3000

app.use(express.static('client'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/upload_json', (req, res) => {
  console.log(req.body)
  let parsedReq = JSON.parse(req.body.csvInput);
  res.send(jsonToCSV(parsedReq));
})

//Take Json and convert it to csv
const jsonToCSV = (input) => {
  console.log('JSON INPUT:', input);
  let result = [];
  let header = ['firstName', 'lastName', 'county', 'city', 'role', 'sales']

  let recursion = (input) => {
    let values = [];
    header.forEach(key => values.push(input[key]));
    result.push(values.join(', '));
    input.children.forEach(child => recursion(child));
  }

  recursion(input);
  return header.join(', ') + '\n' + result.join('\n');
}

app.listen(port, () => console.log(`Listening on port ${port}.`));