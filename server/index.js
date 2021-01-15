const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, '..', 'client/build');
// const port = process.env.PORT || 3000;
const port = process.env.PORT || 8080;

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });

app.get('/test', (req, res) => {
    res.send('Welcome to the backend!')
})

app.listen(port);
console.log('App is listening on port ' + port);