require('./models/User');
require('./models/Track');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();

//first json data is parsed and the authRoutes is interpreted
app.use(express.json());
app.use(authRoutes);    
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://reddychennuru:Purush9567@@cluster0.ffpux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo instance");
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(` Your email: ${req.user.email}`);
});

app.listen(3001,() => {
    console.log("Listening on port 3001");
});