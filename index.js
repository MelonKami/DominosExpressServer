const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080;
const fs = require('fs');

if (!fs.existsSync('./resources.json'))
    fs.writeFileSync('./resources.json', '{}')

const resources = JSON.parse(fs.readFileSync('./resources.json', 'UTF-8'));
console.log(resources);

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(require('cors')({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/getResources', (req, res) => {
    console.log('getResources');
    // return resources
    res.send(resources);
});

app.post('/addResource', jsonParser, function (req, res) {
    console.log(req.body);

    resources[req.body.name] = req.body.link;
    fs.writeFileSync('./resources.json', JSON.stringify(resources));
})