import express from 'express';
// const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is Ready');
});

app.get('/api/jokes', (req, res) => {
    const data = [
        { id: 1, title: 'Joke1', joke: "Why don't scientists trust atoms? Because they make up everything!" },
        { id: 2, title: 'Joke2', joke: "Why did the math book look sad? Because it had too many problems." },
        { id: 3, title: 'Joke3', joke: "Why do programmers prefer dark mode? Because light attracts bugs!" },
        { id: 4, title: 'Joke4', joke: "Why did the scarecrow win an award? Because he was outstanding in his field." },
        { id: 5, title: 'Joke5', joke: "Why don't skeletons fight each other? They don't have the guts." }
    ];
    res.send(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});