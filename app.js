const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
app.use(session({
    secret: 'suaChaveSecreta',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 }
}));

const authRoutes = require('./routes/auth');
const interestRoutes = require('./routes/interests');
const petRoutes = require('./routes/pets');
const adoptionRoutes = require('./routes/adoptions');

app.use('/auth', authRoutes);
app.use('/interests', interestRoutes);
app.use('/pets', petRoutes);
app.use('/adoptions', adoptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
