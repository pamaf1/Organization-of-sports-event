const express = require('express');
require('dotenv').config();
const usersRoute = require('./routes/usersRoutes');
const matchRoute = require('./routes/matchRoute');
const matchRegistrationRoute = require('./routes/matchRegistrationRoute');
const reviewRoute = require('./routes/reviewRoute');
const port = process.env.PORT || 5000;
const app = express();
const dbConfig = require("./config/dbConfig");
app.use(express.json())


app.use('/api/users', usersRoute);
app.use('/api/matches', matchRoute);
app.use('/api/registration', matchRegistrationRoute);
app.use('/api/reviews', reviewRoute);

app.listen(port, () => console.log(`Node JS server listening on port ${port}`));