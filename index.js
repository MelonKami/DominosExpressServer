// const app = require('express')();
const bodyParser = require('body-parser');
const PORT = 8080;
const fs = require('fs');

const express = require('express');
const app = express();

var CronJob = require('cron').CronJob;

app.use(express.json());

if (!fs.existsSync('./resources.json'))
    fs.writeFileSync('./resources.json', '{}')

if (!fs.existsSync('./announcements.json'))
    fs.writeFileSync('./announcements.json', JSON.stringify({ announcements: [] }))

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
    console.log('Sending resources: ' + resources.json())
    res.send(resources);
});

app.get('/getAnnouncement', (req, res) => {
    console.log('lastAnnouncement');
    
    console.log('Sending announcements: ' + announcements)

    res.send(announcements);
});

app.post('/test', function (req, res) {
    console.log('test')
})

app.post('/postAnnouncement', function (req, res) {
    console.log('postAnnouncement called')
    console.log(req.body);

    announcements.announcements.push({ date: req.body.date, text: req.body.announcement })

    console.log(announcements)

    console.log('saving announcement')
    fs.writeFileSync('./announcements.json', JSON.stringify(announcements));

    // add announcement to announcement json file with correct format
    // eg. date, time, message ect.
    // announcements.append(req.body)

    res.send({ status: 'succeeded' })
})

app.post('/addResource', function (req, res) {
    console.log(req.body);

    resources[req.body.name] = req.body.link;
    fs.writeFileSync('./resources.json', JSON.stringify(resources));
})

var job = new CronJob(
    '0 0 * * *',
    function () {
        console.log('Clearing announcements');

        fs.writeFileSync('./announcements.json', JSON.stringify({ announcements: [] }))
        announcements = { "announcements": [] }
    },
    null,
    true,
    'Europe/Oslo'
);
// Use this if the 4th param is default value(false)
job.start()