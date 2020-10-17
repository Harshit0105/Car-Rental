var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');


var multer = require('multer');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const profileDIR = "../assets/profilePic";
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profileDIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});
var profileUpload = multer({
    storage: profileStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})
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
    var Trip = new mongoose.Schema({
        car_id: String,
        user_id: String,
        startDate: Date,
        endDate: Date,
        amount: Number,
        car_name: String,
    }, { collection: 'Trip' });
    var Users = mongoose.model('User', Users);
    var Item = mongoose.model('Car', Item);
    var Trip = mongoose.model('Trip', Trip);
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
    app.get("/findUser/", (req, res) => { res.send(null) });
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
                // console.log("User found");
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
                // console.log(data);
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
    app.post("/updateProfile", (req, res) => {
        var newUser = new Users(req.body);
        Users.findOne({ _id: newUser._id }, function(err, data) {
            if (err) {
                res.status(400);
                res.send("Unable to save data");
            } else if (data == null) {
                res.send({ 'message': "No user found" });
            } else {
                data.username = newUser.username;
                data.gender = newUser.gender;
                data.profilePath = newUser.profilePath;
                data.phoneno = newUser.phoneno;
                data.email_id = newUser.email_id;
                data.save(function(err) {
                    if (err) {
                        res.status(400);
                        res.send("Update fail");
                    } else {
                        res.send({ 'message': "Update success" });
                    }
                });
            }
        });
    });
    app.post("/api/uploadProfile", profileUpload.single('uploadedImage'), (req, res) => {
        if (!req.file) {
            console.log("No file received");
            return res.send({
                success: false
            });
        } else {
            console.log('file received successfully');
            return res.send({
                success: true
            })
        }
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


    //For Trips
    app.get("/getTrips/:car_id", (req, res) => {
        Trip.find({ 'car_id': req.params.car_id }, function(err, trips) {
            if (err) {
                res.status(400);
                res.send("Unable to find Cars");
            } else {
                // console.log("All Trip Returned");
                // console.log(cars);
                res.send(trips);
            }
        });
    });

    app.get("/getUserTrips/:user_id", (req, res) => {
        Trip.find({ 'user_id': req.params.user_id }, function(err, trips) {
            if (err) {
                res.status(400);
                res.send("Unable to find trips");
            } else {
                res.send(trips);
            }
        });
    });

    app.post("/addTrip", (req, res) => {
        var newTrip = new Trip(req.body);
        newTrip.save(function(err, data) {
            if (err) {
                res.status(400);
                res.send("Unable to save data");
            } else {
                res.status(200);
                res.json({ "message": "Trip added successfully" });
            }
        });
    });
}
app.listen(8000, () => console.log("Server running on port 8000"));