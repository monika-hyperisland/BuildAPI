require('dotenv').config({ path: 'mongobd.env' });

const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const groupRoutes = require('./routes/groups');
const expenseRoutes = require('./routes/expenses');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.send('Welcome to the Bill Splitting API');
});

app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/expenses', expenseRoutes);

const client = new MongoClient(process.env.MONGO_URI);
async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    app.locals.db = client.db('bill_split'); 

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
}

startServer();
console.log(process.env.JWT_SECRET);
