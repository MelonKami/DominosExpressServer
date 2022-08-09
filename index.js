const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080;
const fs = require('fs');

if (!fs.existsSync('./resources.json'))
    fs.writeFileSync('./resources.json', '{}')

if (!fs.existsSync('./announcements.json'))
    fs.writeFileSync('./announcements.json', '{}')

const resources = JSON.parse(fs.readFileSync('./resources.json', 'UTF-8'));
const announcements = JSON.parse(fs.readFileSync('./announcements.json', 'UTF-8'));

console.log(resources);

var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Make a backend announcement handler


app.use(require('cors')({
    origin: '*'
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send({ status: 'Operational' });
});

app.get('/getResources', (req, res) => {
    console.log('getResources');
    // return resources
    res.send(resources);
});

app.get('/getAnnouncement', (req, res) => {
    console.log('lastAnnouncement');

    res.send(announcements);
});

app.post('/postAnnouncement', jsonParser, function (req, res) {
    console.log(req.body);

    announcements.announcements.append({ date: Date(), text: req.body })

    res.send({ action: succeeded })
    // add announcement to announcement json file with correct format
    // eg. date, time, message ect.
    announcements.append(req.body)

})

app.post('/addResource', jsonParser, function (req, res) {
    console.log(req.body);

    resources[req.body.name] = req.body.link;
    fs.writeFileSync('./resources.json', JSON.stringify(resources));
})