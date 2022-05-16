const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080;
const resources = require('./resources.json');

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

    resources.push(req.body);
})