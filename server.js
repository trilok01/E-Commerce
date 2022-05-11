const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();
app.use(express.json());

// used in production to serve client files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'cient', 'build', 'index.html'));
    });
}

// connection to mongoDB and then running server on port 8000
const dbURI = config.get('dbURI');
const PORT = process.env.PORT || 8000;

mongoose.connect(dbURI, {})
    .then(() => {
        console.log("Database Connection Successful");
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    })
    .catch((err) => console.log(err));