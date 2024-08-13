const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.post('/movies', async (req, res) => {
    const {name } = req.body;
    const [result] = await pool.query('INSERT INTO movies (name) VALUES (?)', [name]);
    res.json(201).json({ id: result.insertId, name });
});

app.delete('/movies/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM movies WHERE id = ?', [id]);
    res.sendStatus(204);
});

app.post('reviews', async (req, res) => {
    const { movieId, rating, comment } = req.body;
    const [result] = await pool.query('INSERT INTO reviews (movieId, rating, comment) VALUES (?, ?, ?)', [movieId, rating, comment]);
    res.status(201).json({ id: result.insertId, movieId, rating, comment });
});

app.get('/reviews', async (req, res) => {
    const [rows] = await pool.query(
        `SELECT movies.name, reviews.review FROM reviews 
        JOIN movies ON reviews.movies.id = movieId`
    )
    res.json(rows);
} );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });

