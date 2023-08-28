const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
var getPostData = require("./ExamplePosts");
const mongoUri =
  "mongodb+srv://Server:NyAozTBiMCTm5k0f@cluster0.vzfbt.mongodb.net/?retryWrites=true&w=majority";
require("./Portrait");
const Portrait = mongoose.model("portrait");

var UserName;
var PhoneNumber;
var FullName;
var Password;
var Bio;
var colorPick;
var pic1 = null;
var pic2 = null;
var pic3 = null;
var pic4 = null;
var pic5 = null;
var pic6 = null;
var myId;
var token;

app.use(bodyParser.json());

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo hello world");
});
mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

app.get("/", function (req, res) {
  Portrait.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/Welcome", function (req, res) {
  FullName = req.body.FullName;
  PhoneNumber = req.body.PhoneNumber;
  console.log(" ");
  console.log("Full Name: " + FullName);
  console.log("Phone Number: " + PhoneNumber);
  Portrait.exists({ PhoneNumberP: PhoneNumber }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (doc) {
        console.log("PhoneNumber Taken!");
      } else {
        console.log("PhoneNumber Good!");
      }
    }
  });
});

app.post("/SignIn", function (req, res) {
  UserName = req.body.UserName;
  Password = req.body.Password;
  var myProfile;
  console.log(" ");
  console.log("UserName: " + UserName);
  console.log("Password: " + Password);
  Portrait.exists({ UserName: UserName }, function (err, doc) {
    var myToken = doc._id;
    console.log("myToken: " + myToken);
    myProfile = Portrait.findById(myToken).then((myProfile) => {
      console.log("profile: " + myProfile);
      console.log("Portrait Exists!");
      console.log(myProfile._id);
      if (myProfile.PasswordP == Password) {
        console.log("Password Correct");
        myId = doc._id;
        res.json({
          message: true,
        });
      } else {
        console.log("Password Incorrect!");
        res.json({
          message: false,
        });
      }
    });
  });
});

app.post("/UsernamePassword", function (req, res) {
  (UserName = req.body.UserName),
    (Password = req.body.Password),
    console.log("UserName: " + UserName);
  console.log("Password: " + Password);
  Portrait.exists({ UserNameP: UserName }, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      if (doc) {
        console.log("UserName Taken!");
      } else {
        console.log("UserName Good!");
      }
    }
  });
});

app.post("/Bio", function (req, res) {
  colorPick = req.body.colorPick;
  Bio = req.body.Bio;
  console.log("Color: " + colorPick);
  console.log("Bio: " + Bio);
});

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images/profilePics");
  },
  filename(req, file, callback) {
    if (file.fieldname == "photo1") {
      pic1 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic1);
      pic1 = "./images/" + pic1;
      console.log("pic1: " + pic1);
    }
    if (file.fieldname == "photo2") {
      pic2 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic2);
      pic2 = "./images/" + pic2;
      console.log("pic2: " + pic2);
    }
    if (file.fieldname == "photo3") {
      pic3 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic3);
      pic3 = "./images/" + pic3;
      console.log("pic3: " + pic3);
    }
    if (file.fieldname == "photo4") {
      pic4 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic4);
      pic4 = "./images/" + pic4;
      console.log("pic4: " + pic4);
    }
    if (file.fieldname == "photo5") {
      pic5 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic5);
      pic5 = "./images/" + pic5;
      console.log("pic5: " + pic5);
    }
    if (file.fieldname == "photo6") {
      pic6 = `${file.fieldname}_${Date.now()}_${file.originalname}`;
      callback(null, pic6);
      pic6 = "./images/" + pic6;
      console.log("pic6: " + pic6);
    }
  },
});

const upload = multer({ storage });

app.post("/Photos1", upload.array("photo1", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/Photos2", upload.array("photo2", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/Photos3", upload.array("photo3", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/Photos4", upload.array("photo4", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/Photos5", upload.array("photo5", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});
app.post("/Photos6", upload.array("photo6", 3), (req, res) => {
  res.status(200).json({
    message: "success!",
  });
});

app.post("/SendData", function (req, res) {
  const portrait = new Portrait({
    UserNameP: UserName,
    PhoneNumberP: PhoneNumber,
    FullNameP: FullName,
    PasswordP: Password,
    BioP: Bio,
    ColorP: colorPick,
    ProfilePics: {
      Pic1P: pic1,
      Pic2P: pic2,
      Pic3P: pic3,
      Pic4P: pic4,
      Pic5P: pic5,
      Pic6P: pic6,
    },
    PrivacyP: req.body.privacy,
    ViewsP: 0,
    PostsP: 0,
    FollowersP: 0,
  });
  portrait
    .save()
    .then((data) => {
      console.log(portrait);
      myId = portrait.id;
      console.log("Object id: " + myId);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getId", function (req, res) {
  Portrait.find({}).then((data) => {
    console.log("working...");
    console.log("Check Id: " + myId);
    res.json({
      myidv: myId,
    });
  });
});

app.post("/getProfile", function (req, res) {
  token = req.body.token;
  console.log("token: " + token);
  profile = Portrait.findById(token).then((profile) => {
    res.json(profile);
    console.log("profile: " + profile);
    console.log("Profile Sent");
  });
});

app.get("/getPosts", function (req, res) {
  getPostData().then((Posts) => {
    console.log(Posts);
    res.json(Posts);
  });
});

app.post("/getSelectUserResults", function (req, res) {
  var input = req.body.searchInput;
  console.log(input);
});

const PORT = 8080;
app.listen(PORT, function () {
  console.log("Server is ready at " + PORT);
});

app.get("/images/:slug", function (req, res) {
  // Reading the file
  fs.readFile(
    "./images/100-100-color/" + req.params.slug + ".jpg",
    function (err, content) {
      // Serving the image
      res.end(content);
    }
  );
});
