var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function () {
    it('should list items on GET', function (done) {
        chai.request(app)
            .get('/users')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.be.a('Papaya');
                res.body[0].name.should.be.a('Chicken wings');
                res.body[0].name.should.be.a('Rice');
                done();
            });
    });

    it('should add an item on POST', function (done) {
        chai.request(app)
            .post('/users/joe')
            .send({
                'name': 'Kale'
            })
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                users.items.should.be.a('array');
                users.items.should.have.length(4);
                users.items[3].should.be.a('object');
                users.items[3].should.have.property('id');
                users.items[3].should.have.property('name');
                users.items[3].id.should.be.a('number');
                users.items[3].name.should.be.a('string');
                users.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should edit an item on PUT', function (done) {
        chai.request(app)
            .put('/users/joe/:id')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('id');
                res.body[0].name.should.be.a('string');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                done();
            });
    });
    it('should delete an item on DELETE', function (err, res) {
        chai.request(app)
            .delete('/users/joe/:id')
            .end(function (err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('id');
                res.body[0].name.should.be.a('string');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                done();
            });
    });
});
