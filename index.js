const express = require('express');
const multer = require('multer');
const cors = require('cors');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    }
});
const fs = require('fs');
var upload = multer({ storage: storage });
var sdk = require("microsoft-cognitiveservices-speech-sdk");
const app = express();
const PORT = process.env.PORT || 8000;
const clean = require('./regex');

app.use(cors());

// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you want to run
// through the speech recognizer.
var subscriptionKey = "cc1118bc46ec486492cc371e523154c1";
var serviceRegion = "westus2"; // e.g., "westus"

// now create the audio-config pointing to our stream and
// the speech config specifying the language.

app.post("/audio", upload.single('data'), (req, res) => {
    var pushStream = sdk.AudioInputStream.createPushStream();
    let file = req.file;
    fs.createReadStream(file.path).on('data', function (arrayBuffer) {
        pushStream.write(arrayBuffer.buffer);
    }).on('end', function () {
        pushStream.close();
        console.log("File done processing");
        fs.unlink(file.path, () => console.log("File removed"));
    });

    console.log("Now recognizing from the file");

    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.

    var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    // setting the recognition language to English.
    speechConfig.speechRecognitionLanguage = "en-US";

    // create the speech recognizer.
    var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    // start the recognizer and wait for a result.
    recognizer.recognizeOnceAsync(
        function (result) {
            let toSend = clean.parseCommands((JSON.parse(result["privJson"])).DisplayText);
            res.send(toSend);
            recognizer.close();
            recognizer = undefined;
        },
    );
});

app.get('/song', (req, res) => {
    let name = req.query.name;
    fs.readFile(`./music/${name}`, (err, data) => {
        res.header("content-type", "audio/mp3");
        res.end(data, "binary");
    });
});

app.get('/songnames', (req, res) => {
    fs.readdir('./music', (err, files) => {
        let fileArray = []
        files.forEach(file => {
            fileArray.push(file);
        });
        res.send({ files: fileArray });
    })
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));



