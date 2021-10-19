const express = require('express');
const app = express();
const port = 3000

app.use(express.static('client'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/upload_json', (req, res) => {
  res.send(`<h3>CSV Report Generator</h3>

  <form method="POST" action="/upload_json">
    <textarea type="text" name="csvInput" rows="10" cols="50" placeholder="Paste your JSON here!"></textarea>
    <input type="submit" value="Send me!">
  </form>

  <p style="white-space: pre-wrap">${jsonToCSV(req.body.csvInput)}</p>`);
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