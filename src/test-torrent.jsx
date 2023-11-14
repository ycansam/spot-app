// src/App.js
import React, { useState, useEffect } from 'react';
const { ipcRenderer, remote } = require('electron');

const App = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch data from the Node.js server
        fetch('http://localhost:3001/api/data')
            .then((res) => res.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const download = () => {
        fetch('http://localhost:3001/api/torrent')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert(`Torrent Status: ${data.status}\nTorrent Name: ${data.name}`);
            })
            .catch(error => {
                console.error('Error downloading torrent:', error);
                alert('Error downloading torrent. Check the console for details.');
            });
    }

    return (
        <div>
            <h1>Hello from React</h1>
            <p>{message}</p>
            <button onClick={download}>download</button>
        </div>
    );
};

export default App;