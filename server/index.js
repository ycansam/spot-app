// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const torrentStream = require('torrent-stream');
const fs = require('fs');
const request = require('request');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());



app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/torrent', (req, res) => {

    const downloadDir = './downloads';
    const torrentFile = 'magnet:?xt=urn:btih:BCW2LJ5GDA5K4HQJ3AY56Z2I2VTASWQQ&dn=Sintel&tr=udp%3a%2f%2ftracker%2eleechers%2dparadise%2eorg%3a6969&tr=udp%3a%2f%2ftracker%2ecoppersurfer%2etk%3a6969&tr=udp%3a%2f%2ftracker%2eopentrackr%2eorg%3a1337&tr=udp%3a%2f%2fexplodie%2eorg%3a6969&tr=udp%3a%2f%2ftracker%2eempire%2djs%2eus%3a1337';

    const engine = torrentStream(torrentFile, { path: downloadDir });

    engine.on('ready', () => {
        console.log('Torrent is ready to be processed');

        let filesDownloaded = [];

        engine.files.forEach((file, index) => {
            const saveStream = fs.createWriteStream(path.join(downloadDir, file.name));
            let downloadedBytes = 0;

            file.createReadStream().pipe(saveStream);

            engine.on('download', (bytes) => {
                downloadedBytes += bytes;
                const percent = ((downloadedBytes / file.length) * 100).toFixed(2);
                console.log(`Downloaded ${bytes} bytes (${percent}%)`);
            });

            saveStream.on('finish', () => {
                filesDownloaded.push(file);
                console.log(`Download completed for file ${index}: ${file.name}`);
            });
        });

        if (filesDownloaded.length === engine.files.length) {
            res.json({ status: 'Download completed for all files' });
            engine.destroy();
        }
    });

    engine.on('error', (err) => {
        console.error('Torrent stream error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        engine.destroy();
    });

});

module.exports = app;
