const express = require('express');
const router = express.Router();
const { Entity, Filing } = require('../models');

router.get('/:id', async (req, res) => {
    try {
        const entity = await Entity.findByPk(req.params.id, {
            include: [{
                model: Filing,
                order: [['date', 'DESC']],
            }],
        });
        if (!entity) return res.status(404).json({ error: 'Entity not found' });
        res.json(entity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
