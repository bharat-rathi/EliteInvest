const sequelize = require('../config/db');
const User = require('./User');
const Entity = require('./Entity');
const Filing = require('./Filing');

Entity.hasMany(Filing, { foreignKey: 'entity_id' });
Filing.belongsTo(Entity, { foreignKey: 'entity_id' });

module.exports = {
    sequelize,
    User,
    Entity,
    Filing,
};
