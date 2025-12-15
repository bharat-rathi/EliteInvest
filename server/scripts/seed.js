const { sequelize, Entity, Filing } = require('../models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // Reset DB

        const entities = await Entity.bulkCreate([
            { name: 'Nancy Pelosi', type: 'politician', description: 'Speaker of the House' },
            { name: 'Elon Musk', type: 'insider', description: 'CEO of Tesla' },
            { name: 'BlackRock', type: 'institution', description: 'Investment Management' },
        ]);

        await Filing.bulkCreate([
            {
                entity_id: entities[0].id,
                filing_type: 'STOCK_ACT',
                date: '2023-10-01',
                ticker: 'NVDA',
                transaction_type: 'buy',
                amount: 500000,
                price: 450.00,
                volume: 1100,
                source_url: 'http://example.com',
            },
            {
                entity_id: entities[0].id,
                filing_type: 'STOCK_ACT',
                date: '2023-10-05',
                ticker: 'MSFT',
                transaction_type: 'sell',
                amount: 250000,
                price: 320.00,
                volume: 780,
                source_url: 'http://example.com',
            },
            {
                entity_id: entities[1].id,
                filing_type: '4',
                date: '2023-11-01',
                ticker: 'TSLA',
                transaction_type: 'sell',
                amount: 10000000,
                price: 210.00,
                volume: 47600,
                source_url: 'http://example.com',
            },
            {
                entity_id: entities[2].id,
                filing_type: '13F',
                date: '2023-09-30',
                ticker: 'AAPL',
                transaction_type: 'buy',
                amount: 50000000,
                price: 170.00,
                volume: 294000,
                source_url: 'http://example.com',
            },
        ]);

        console.log('Database seeded!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
