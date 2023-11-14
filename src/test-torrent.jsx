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

    return (
        <div>
            <h1>Hello from React</h1>
            <p>{message}</p>
        </div>
    );
};

export default App;