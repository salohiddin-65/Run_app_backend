const express = require('express');
const app = express();
const HostHomeWifi = '192.168.100.79';
const Port = 3000;

app.use(express.json());

app.get('/home/profile', (req, res) => {
    res.send(profileData);
});

app.get('/home/status', (req, res) => {
    res.send(statusData);
});

app.get('/home/history', (req, res) => {
    res.send(historyData);
});

var users = [];
app.post('/register', (req, res) => {
    var isRegistered = false;
    for (let index = 0; index < users.length; index++) {
        if (users[index]['phone'] == req.body.phone) {
            isRegistered = true;
            res.send({
                "status": true,
                "message": "This phone number already in use..."
            })
        } else {
            isRegistered = false;
        }

    }
    if (!isRegistered) {
        users.push(req.body);
        res.status(201).send({
            "status": true,
            "message": "User successfully registered..."
        });
    }
});

app.post('/login', (req, res) => {
    var isExist = false;
    for (let index = 0; index < users.length; index++) {
        if (users[index]['password'] == req.body.password && users[index]['phone'] == req.body.phone) {
            isExist = true;
            res.send({
                "status": true,
                "message": "User exists...",
            });
        } else {
            isExist = false;
        }
    }
    if (!isExist) {
        res.send({
            "status": false,
            "message": "User not found...",
        });
    }
});

app.listen(Port, HostHomeWifi, (req, res) => {
    console.log(`Server running in your http://${HostHomeWifi}:${Port}`);
});

var profileData = {
    "img": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    "name": "Daniel",
};

var statusData = {
    "status": {
        "steps": "15,000",
        "result": "14,000",
    },
    "today": {
        "date": "18 June",
        "duration": "13:48",
        "todo": "5000",
        "done": "2345",
    },
    "result": {
        "steps": "53,524",
        "coins": "1000",
    },
};

var historyData = {
    "data": [
        { "date": "18 June", "pt": "100", "km": "12,4 km", "kcol": "1222", "steps": "10120" },
        { "date": "17 June", "pt": "70", "km": "6,4 km", "kcol": "1222", "steps": "10120" },
        { "date": "16 June", "pt": "120", "km": "16,4 km", "kcol": "1222", "steps": "10120" },
        { "date": "15 June", "pt": "90", "km": "10,4 km", "kcol": "1222", "steps": "10120" },
    ],
};
