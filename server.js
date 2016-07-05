var express = require('express');

var app = express();
app.use(express.static('public'));

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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

app.get('/items', function (req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

//Deleting item on the shopping list
//Storage.prototype.delete = function (name) {
//
//};
//var deletedStorage = new Storage();
//storage.pop('Broad beans');

app.delete('/items/<id>', function (req, res) {
    for (var i = 0; i < item.length; i++) {
        var item = {
            name: name,
            id: this.id
        };
        if (indexOf(req.params.id) !== -1) {
            item.splice(i, 1);
        }
    }
    return item;
});

//Use when deploying this app
app.listen(process.env.PORT || 8080);
