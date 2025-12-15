const express = require('express');
const router = express.Router();
const { Filing, Entity } = require('../models');

// Get recent filings
router.get('/recent', async (req, res) => {
    try {
        const filings = await Filing.findAll({
            limit: 10,
            order: [['date', 'DESC']],
            include: [Entity],
        });
        res.json(filings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
