const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/filings', require('./routes/filings'));
app.use('/api/search', require('./routes/search'));
app.use('/api/profile', require('./routes/profile'));

app.get('/', (req, res) => {
    res.send('EliteInvest Track API is running');
});

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = app;
