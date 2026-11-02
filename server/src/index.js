const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const pool = require('./db');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req,res) => {
    try {
       await pool.query('SELECT 1');
       res.json({status: 'ok', db: 'connected'}); 
    } catch (err) {
        console.error(err);
        res.status(500).json({status: 'error', db: 'unreachable'});
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));