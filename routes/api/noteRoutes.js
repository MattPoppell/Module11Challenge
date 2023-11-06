// These are the global variables.
const router = require('express').Router();
const fs = require('fs');
const ut = require("util");
const uuid = require("../../helpers/uuid");
const fileRead = ut.promisify(fs.readFile);
let db = require("../../db/db.json");


router.get("/notes", (req, res) => {
    console.info(`This ${req.method} request was received for the notes.`);
    fileRead("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.get("/notes/:title", (req, res) => {
    const titleRequest = req.params.title;

    for (let i = 0; i < db.length; i++) {
        if (titleRequest === db[i].id) {
            res.json(db[i]);
        };
    };
});

router.post("/notes", (req, res) => {
    console.info(`${req.method} has been added.`);

    const { title, text } = req.body;

    if (req.body) {
        const note = {
            title,
            text,
            id: uuid(),
        };

        readAppend(note, "./db/db.json");
        return res.send(`Successfully added the new note!`);
    } else {
        return res.send("There was an error while trying to add the new note.");
    }
});

router.delete('/notes/:id', (req, res) => {
    db = db.filter((x) => x.id != req.params.id);
    res.json(db);
    fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 4));
});

const readAppend = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            fileWrite(file, parsedData);
        }
    });

const fileWrite = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`Writting to ${destination} has been successful!`)
    );

module.exports = router;