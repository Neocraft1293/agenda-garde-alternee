const express = require("express");
const bodyParser = require("body-parser");
const ical = require('ical.js');
const fs = require('fs');
const axios = require('axios');
const { spawnSync } = require('child_process');

const port = 8000;
const app = express();





app.get('/', (req, res) => {
    res.download("./agenda.ics");
});

app.listen(process.env.PORT || port, () => console.log("Le serveur écoute sur le port " + (process.env.PORT || port)));
