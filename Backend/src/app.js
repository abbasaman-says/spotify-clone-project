const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/auth.routes');
const musicRoutes = require('./Routes/music.routes');
const cors = require("cors");




const app = express();
app.use(express.json());
app.use(cookieParser());

// ye frontend bnaty wqt ye lkha code
// app.use(cors({
//     origin: "http://localhost:5174",
//     credentials: true
// }));
app.use(cors({
    origin: "*", // yahan apna Vercel wala live frontend URL dein (ya '*' saari requests allow karne ke liye)
    // origin: "https://spotify-clone-project-gules.vercel.app", // yahan apna Vercel wala live frontend URL dein (ya '*' saari requests allow karne ke liye)
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);



module.exports = app;

