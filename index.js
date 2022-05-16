const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080;
const fs = require('fs');

if (fs.existsSync('./resources.json')) {
    const resources = require('./resources.json');
}
else {
    fs.writeFile('resources.json', JSON.stringify({}), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

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

    resources[req.body[0]] = req.body[1];
})