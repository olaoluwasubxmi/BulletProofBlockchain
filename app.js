const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

let blockchain = [];
let lastHash = null;

app.post('/register', (req, res) => {
    const { gun_id, owner_id } = req.body;

    if (!gun_id || !owner_id) {
        return res.status(400).json({ message: 'Missing data' });
    }

    const blockData = {
        gun_id,
        owner_id,
        timestamp: new Date().toISOString(),
        previousHash: lastHash
    };

    const blockHash = crypto.createHash('sha256').update(JSON.stringify(blockData)).digest('hex');

    const block = {
        hash: blockHash,
        data: blockData
    };

    blockchain.push(block);
    lastHash = blockHash;

    return res.status(200).json({ message: 'Gun registered successfully', blockHash });
});

app.get('/verify', (req, res) => {
    const { hash } = req.query;

    if (!hash) {
        return res.status(400).json({ message: 'Missing data' });
    }

    for (let i = blockchain.length - 1; i >= 0; i--) {
        if (blockchain[i].hash === hash) {
            return res.status(200).json(blockchain[i].data);
        }
    }

    return res.status(404).json({ message: 'Hash not found' });
});

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
