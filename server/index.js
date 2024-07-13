// Import the required modules
const express = require('express');
const cors = require('cors');

// Create an instance of an Express application
const app = express();

// Use the cors middleware
app.use(cors());

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello World! CORS is enabled for all routes.');
});

// Define another route for demonstration
app.get('/api/data', (req, res) => {
    res.json({ message: 'This is some data from the server.', data: [1, 2, 3, 4, 5] });
});

// Start the server
const port = process.env.PORT || 8010;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});