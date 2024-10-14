const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json()); 

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbms_project"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL");
});

app.get('/signup', (req, res) => {
    res.send("Signup page");
});

app.get('/login', (req, res) => {
    res.send("Login page");
});


app.get('/', (req, res) => {
    res.send("Home page");
});



app.post('/signup', (req, res) => {
    console.log("Received data:", req.body);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        return res.json({ message: "User registered successfully", data: data });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ success: false, message: 'An error occurred while logging in' });
        }

        if (results.length > 0) {
            const user = results[0];
            return res.json({ success: true, user });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    });
});

app.listen(8082, () => {
    console.log("Server is running on port 8082");
});
