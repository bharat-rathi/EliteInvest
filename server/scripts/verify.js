const { sequelize, User, Entity, Filing } = require('../models');

const verify = async () => {
    try {
        const userCount = await User.count();
        const entityCount = await Entity.count();
        const filingCount = await Filing.count();

        console.log(`Users: ${userCount}`);
        console.log(`Entities: ${entityCount}`);
        console.log(`Filings: ${filingCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Verification failed:', error);
        process.exit(1);
    }
};

verify();
