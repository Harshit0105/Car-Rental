var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/car_rental_db", { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
var Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', mongoConnected);

function mongoConnected() {
    console.log("Connection done!");
    var Users = new mongoose.Schema({
        email_id: String,
        username: String,
        phoneno: Number,
        gender: String,
        password: String,
        profilePath: String,
        role: String,
    }, { collection: 'Users' });
    var Item = new mongoose.Schema({
        name: String,
        price: Number,
        transmission: String,
        bodyPic: String,
        interiorPic: String,
        category: String,
        available: Boolean,
    }, { collection: 'Cars' });
    var Users = mongoose.model('User', Users);
    var Item = mongoose.model('Car', Item);
    //For Users
    app.get("/alluser", (req, res) => {
        Users.find(function(err, user) {
            if (err) {
                res.status(400);
                res.send("Unable to find users");
            } else {
                console.log("All users");
                res.json(user);
            }
        });
    });
    app.get("/findUser/:email", (req, res) => {
        Users.findOne({ 'email_id': req.params.email }, function(err, user) {
            if (err) {
                res.status(400);
                res.send("Unable to find user");
            } else if (user == null) {
                console.log("New User");
                // res.status(400);
                res.send(user);
            } else {
                console.log("User found");
                res.send(user);
            }
        });
    });
    app.get("/login/:email_id/:password", (req, res) => {
        Users.findOne({ 'email_id': req.params.email_id, 'password': req.params.password }, function(err, data) {
            if (err) {
                console.log("Unable to find user");
                res.status(400);
                res.send("Unable to find user");
            } else {
                console.log("Login successfully");
                console.log(data);
                res.send(data);
            }
        });
    });
    app.post("/addUser", (req, res) => {
        var newUser = new Users(req.body);
        newUser.save(function(err, data) {
            if (err) {
                res.status(400);
                res.send("Unable to save data");
            } else {
                res.status(200);
                res.json({ "message": "User added successfully" });
            }
        });
    });
    //For Cars
    app.get("/allcars/:cate", (req, res) => {
        // console.log("Request come!");
        if (req.params.cate == "all") {
            Item.find(function(err, cars) {
                if (err) {
                    res.status(400);
                    res.send("Unable to find Cars");
                } else {
                    // console.log("All Cars Returned");
                    // console.log(cars);
                    res.send(cars);
                }
            });
        } else {
            Item.find({ 'category': req.params.cate }, function(err, cars) {
                if (err) {
                    res.status(400);
                    res.send("Unable to find Cars");
                } else {
                    console.log("All Cars Returned");
                    // console.log(cars);
                    res.send(cars);
                }
            });
        }
    });
    app.get("/carDetails/:id", (req, res) => {
        Item.find({ '_id': req.params.id }, function(err, cars) {
            if (err) {
                res.status(400);
                res.send("Unable to find Cars");
            } else {
                // console.log(cars);
                res.send(cars);
            }
        });
    });
}
app.listen(8000, () => console.log("Server running on port 8000"));