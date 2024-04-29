const express = require('express');
const cors = require('cors');
const router = require('./routes/userRoute');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spreadsheet';

app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("server connected");
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

// Routes
app.use('/api/v1/', router);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});
