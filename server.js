var express = require('express');

var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

var User = function () {
    this.username = "";
    this.items = [];
}

User.prototype.add = function (username) {
    var
}

var Storage = function () {
    this.items = [];
    this.id = 0;
};

//Adding item on the shopping list
Storage.prototype.add = function (name) {
    var item = {
        name: name,
        id: this.id
    };
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


//Endpoint to retreieve item
app.get('/items/', function (req, res) {
    res.json(storage.items);
});


app.get('/items/:id', function (req, res) {
    var item;
    // SEARCH algorithm with get
    for (var i = 0; i < storage.items.length; i++) {
        if (req.params.id == storage.items[i].id) {
            item = storage.items[i];
            break;
        }
    }
    if (item === undefined) {
        res.json({
            message: "Item not found!"
        });
    } else {
        res.json(item);
    }
});

//Endpoint to add item
app.post('/items', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});


//Endpoint to change item name when user renames them
app.put('/items/:id', function (req, res) {
    var item;
    for (var i = 0; i < storage.items.length; i++) {
        if (req.params.id == storage.items[i].id) {
            item = storage.items[i];
            // update it
            item.name = req.body.name;
            // break out of loop
            break;
        }
    }
    if (item === undefined) {
        res.json({
            message: "Item not found!"
        });
    } else {
        res.json(item);
    }
});


//Endpoint to delete item when user clicks the "x" mark
app.delete('/items/:id', function (req, res) {
    var item;
    // SEARCH algorithm with delete
    for (var i = 0; i < storage.items.length; i++) {

        if (req.params.id == storage.items[i].id) {
            item = storage.items.splice(i, 1);
            break;
        }
    }
    if (item === undefined) {
        res.json({
            message: "Item not found!"
        });
    } else {
        res.json(item);
    }

});

//Use when deploying this app
app.listen(process.env.PORT || 8080);
