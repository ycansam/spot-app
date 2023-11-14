const Client = require('node-torrent');
const client = new Client({
  // Specify the download directory
  downloads: '/path/to/downloads',
});

// Add a torrent by passing the torrent file or magnet link
const torrent = client.addTorrent('path/to/your.torrent');

// Listen for torrent events
torrent.on('ready', function () {
  console.log('Torrent is ready to be processed');
  // Access torrent properties like torrent.name, torrent.files, etc.
});

torrent.on('download', function (bytes) {
  console.log('Downloaded:', bytes, 'total:', torrent.downloaded);
});

torrent.on('done', function () {
  console.log('Torrent download finished');
  // Access the downloaded files in torrent.files
});

// Handle errors
torrent.on('error', function (err) {
  console.log('Torrent error:', err);
});

// Start the torrent client
client.start();