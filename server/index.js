// Import the required modules
const express = require('express');
const cors = require('cors');
const { storeEncryptedSecretDON } = require('./utils/chainlink');
require('dotenv').config()

const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// Use the cors middleware
app.use(cors());

// Define a simple route
app.post('/store/github', async (req, res) => {
    console.log(req)
    const token = req.body.token;
    try {
        const result = await storeEncryptedSecretDON(token);

        return res.status(200).json({message: "Success!", version: result.version, success: result.success});
    } catch(e) {
        return res.status(500).json({message: e.message});
    }

});

// Start the server
const port = process.env.PORT || 8010;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});