const express = require('express');
const router = express.Router();
const { Entity, Filing } = require('../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        const entities = await Entity.findAll({
            where: {
                name: { [Op.iLike]: `%${q}%` },
            },
        });

        const filings = await Filing.findAll({
            where: {
                ticker: { [Op.iLike]: `%${q}%` },
            },
            include: [Entity],
            limit: 10,
        });

        res.json({ entities, filings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
