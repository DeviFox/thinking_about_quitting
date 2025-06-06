const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
    {
        id: 0,
        name: 'Настя Р',
        daysCount: 1
    },
    {
        id: 1,
        name: 'Настя К',
        daysCount: 1
    },
    {
        id: 2,
        name: 'Саша',
        daysCount: 1
    },
    {
        id: 3,
        name: 'Сария',
        daysCount: 1
    },
    {
        id: 4,
        name: 'Олег',
        daysCount: 1
    },
]

app.get('/users', (req, res) => {
    res.json(users)
})

app.patch('/users', (req, res) => {
    const {id} = req.body;
    const activeUser = users.find((user) => user.id === id);

    if (activeUser) {
        activeUser.daysCount = activeUser.daysCount + 1
        res.json(activeUser)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})