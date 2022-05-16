const app = require('express')();
const PORT = 8080;
const resources = require('./resources.json');

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

app.post('/addResource', (req, res) => {
    console.log('addResource');
    // add resource
    console.log(res.body);
});