const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 0,
        name: 'Testik',
        daysCount: 1
    },
    {
        id: 1,
        name: 'Chelik',
        daysCount: 3
    },
    {
        id: 2,
        name: 'Huuuy',
        daysCount: 5
    },
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})