const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
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

const images = [
  "https://i.pinimg.com/originals/0e/9e/88/0e9e8812f01f82650833264673bf51ed.jpg",
  "https://wallpaperaccess.com/full/7281.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/71Tq9OsjO7L._SY879_.jpg",
  "https://free4kwallpapers.com/uploads/originals/2019/07/14/ultra-hd-ocean-s-wallpaper.jpg",
  "https://cdn.wallpapersafari.com/24/3/ZlgUc6.jpg",
  "https://www.dayglo.com/media/1212/bokeh-3249883_1280.png",
  "https://wallpaperplay.com/walls/full/b/5/e/159585.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Long_March_2D_launching_VRSS-1.jpg",
  "https://cosmos-production-assets.s3.amazonaws.com/file/spina/photo/6597/180716_fluorescent_P.jpg",
  "https://c.gitcoin.co/grants/4e0e1e6de351af46fe9482b35840d3bd/logo.png",
  "https://images-na.ssl-images-amazon.com/images/I/81wajOO6mLL._SX355_.jpg",
  "https://www.melbourneairport.com.au/getattachment/Passengers/Parking/long-term-car-park/new-banner-homepage_02.png",
  "https://images.unsplash.com/photo-1490907452017-eccf91f84cf9",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoI7Yah5HYzaOn2tnpdBGdXgLL5Ka3ElFjYJPM7zZ91_WHw0TO",
  "https://i.pinimg.com/originals/0e/9e/88/0e9e8812f01f82650833264673bf51ed.jpg",
  "https://wallpaperaccess.com/full/7281.jpg",
  "https://images-na.ssl-images-amazon.com/images/I/71Tq9OsjO7L._SY879_.jpg",
  "https://free4kwallpapers.com/uploads/originals/2019/07/14/ultra-hd-ocean-s-wallpaper.jpg",
  "https://cdn.wallpapersafari.com/24/3/ZlgUc6.jpg",
  "https://www.dayglo.com/media/1212/bokeh-3249883_1280.png",
  "https://wallpaperplay.com/walls/full/b/5/e/159585.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Long_March_2D_launching_VRSS-1.jpg",
  "https://cosmos-production-assets.s3.amazonaws.com/file/spina/photo/6597/180716_fluorescent_P.jpg",
  "https://c.gitcoin.co/grants/4e0e1e6de351af46fe9482b35840d3bd/logo.png",
  "https://images-na.ssl-images-amazon.com/images/I/81wajOO6mLL._SX355_.jpg",
  "https://www.melbourneairport.com.au/getattachment/Passengers/Parking/long-term-car-park/new-banner-homepage_02.png",
  "https://images.unsplash.com/photo-1490907452017-eccf91f84cf9",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoI7Yah5HYzaOn2tnpdBGdXgLL5Ka3ElFjYJPM7zZ91_WHw0TO",
  "https://free4kwallpapers.com/uploads/originals/2023/02/12/spiral-milky-way-galaxy-wallpaper.jpg",
  "https://free4kwallpapers.com/uploads/originals/2023/02/13/mercedes-benz-e-evolution-ii-wallpaper.jpg",
  "https://free4kwallpapers.com/uploads/originals/2015/07/19/nine-planet-wallpaper-triple-screen.jpg",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1570636418879-08b0a89d882e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
  "https://free4kwallpapers.com/uploads/originals/2023/02/12/spiral-milky-way-galaxy-wallpaper.jpg",
  "https://free4kwallpapers.com/uploads/originals/2023/02/13/mercedes-benz-e-evolution-ii-wallpaper.jpg",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1570636418879-08b0a89d882e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1570636418879-08b0a89d882e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1541454226399-0f6d5496db29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
  "https://images.unsplash.com/photo-1570636418879-08b0a89d882e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
  "https://images.unsplash.com/photo-1570636418879-08b0a89d882e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80",
  "https://unsplash.com/photos/pJILiyPdrXI",
  "https://unsplash.com/photos/DwTZwZYi9Ww",
  "https://unsplash.com/photos/2fl-ocJ5MOA",
  "https://unsplash.com/photos/YnfGtpt2gf4",
  "https://unsplash.com/photos/9VWOr22LhVI",
  "https://unsplash.com/photos/t1mqA3V3-7g",
  "https://unsplash.com/photos/YvYBOSiBJE8",
  "https://unsplash.com/photos/D76DklsG-5U",
  "https://unsplash.com/photos/eLUegVAjN7s",
  "https://unsplash.com/photos/kmF_Aq8gkp0",
  "https://unsplash.com/photos/yZf1quatKCA",
  "https://unsplash.com/photos/llYg8Ni43fc",
  "https://unsplash.com/photos/A6S-q3D67Ss",
  "https://unsplash.com/photos/YcfCXxo7rpc",
  "https://picsum.photos/id/102/4320/3240",
  "https://picsum.photos/id/103/2592/1936",
  "https://picsum.photos/id/104/3840/2160",
  "https://picsum.photos/id/106/2592/1728",
  "https://picsum.photos/id/107/5000/3333",
  "https://picsum.photos/id/108/2000/1333",
  "https://picsum.photos/id/109/4287/2392",
  "https://picsum.photos/id/110/5000/3333",
  "https://picsum.photos/id/111/4400/2656",
  "https://picsum.photos/id/112/4200/2800",
  "https://picsum.photos/id/113/4168/2464",
  "https://picsum.photos/id/114/3264/2448",
  "https://picsum.photos/id/115/1500/1000",
  "https://picsum.photos/id/116/3504/2336",
  "https://picsum.photos/id/117/1544/1024",
  "https://picsum.photos/id/118/1500/1000",
  "https://picsum.photos/id/119/3264/2176",
  "https://picsum.photos/id/120/4928/3264",
  "https://picsum.photos/id/121/1600/1067",
  "https://picsum.photos/id/122/4147/2756",
  "https://picsum.photos/id/123/4928/3264",
  "https://picsum.photos/id/124/3504/2336",
  "https://picsum.photos/id/125/1500/1000",
  "https://picsum.photos/id/126/4272/2511",
  "https://picsum.photos/id/127/4032/2272",
  "https://picsum.photos/id/128/3823/2549",
  "https://picsum.photos/id/129/4910/3252",
  "https://picsum.photos/id/130/3807/2538",
  "https://picsum.photos/id/131/4698/3166",
  "https://picsum.photos/id/132/1600/1066",
  "https://picsum.photos/id/133/2742/1828",
  "https://picsum.photos/id/134/4928/3264",
  "https://picsum.photos/id/135/2560/1920",
  "https://picsum.photos/id/136/4032/2272",
  "https://picsum.photos/id/137/4752/3168",
  "https://picsum.photos/id/102/4320/3240",
  "https://picsum.photos/id/103/2592/1936",
  "https://picsum.photos/id/104/3840/2160",
  "https://picsum.photos/id/106/2592/1728",
  "https://picsum.photos/id/107/5000/3333",
  "https://picsum.photos/id/108/2000/1333",
  "https://picsum.photos/id/109/4287/2392",
  "https://picsum.photos/id/110/5000/3333",
  "https://picsum.photos/id/111/4400/2656",
  "https://picsum.photos/id/112/4200/2800",
  "https://picsum.photos/id/113/4168/2464",
  "https://picsum.photos/id/114/3264/2448",
  "https://picsum.photos/id/115/1500/1000",
  "https://picsum.photos/id/116/3504/2336",
  "https://picsum.photos/id/117/1544/1024",
  "https://picsum.photos/id/118/1500/1000",
  "https://picsum.photos/id/119/3264/2176",
  "https://picsum.photos/id/120/4928/3264",
  "https://picsum.photos/id/121/1600/1067",
  "https://picsum.photos/id/122/4147/2756",
  "https://picsum.photos/id/123/4928/3264",
  "https://picsum.photos/id/124/3504/2336",
  "https://picsum.photos/id/125/1500/1000",
  "https://picsum.photos/id/126/4272/2511",
  "https://picsum.photos/id/127/4032/2272",
  "https://picsum.photos/id/128/3823/2549",
  "https://picsum.photos/id/129/4910/3252",
  "https://picsum.photos/id/130/3807/2538",
  "https://picsum.photos/id/131/4698/3166",
  "https://picsum.photos/id/132/1600/1066",
  "https://picsum.photos/id/133/2742/1828",
  "https://picsum.photos/id/134/4928/3264",
  "https://picsum.photos/id/135/2560/1920",
  "https://picsum.photos/id/136/4032/2272",
  "https://picsum.photos/id/137/4752/3168",
  "https://picsum.photos/id/139/3465/3008",
  "https://picsum.photos/id/140/2448/2448",
  "https://picsum.photos/id/141/2048/1365",
  "https://picsum.photos/id/142/4272/2848",
  "https://picsum.photos/id/143/3600/2385",
  "https://picsum.photos/id/144/4912/2760",
  "https://picsum.photos/id/145/4288/2848",
  "https://picsum.photos/id/146/5000/3333",
  "https://picsum.photos/id/147/2448/2448",
  "https://picsum.photos/id/149/3454/2288",
  "https://picsum.photos/id/151/4288/3216",
  "https://picsum.photos/id/152/3888/2592",
  "https://picsum.photos/id/153/4763/3155",
  "https://picsum.photos/id/154/3264/2176",
  "https://picsum.photos/id/155/3264/2176",
  "https://picsum.photos/id/156/2177/3264",
  "https://picsum.photos/id/157/5000/3914",
  "https://picsum.photos/id/158/4836/3224",
  "https://picsum.photos/id/159/5000/2460",
  "https://picsum.photos/id/160/3200/2119",
  "https://picsum.photos/id/161/4240/2832",
  "https://picsum.photos/id/162/1500/998",
  "https://picsum.photos/id/163/2000/1333",
  "https://picsum.photos/id/164/1200/800",
  "https://picsum.photos/id/165/2000/1333",
  "https://picsum.photos/id/166/1280/720",
  "https://picsum.photos/id/167/2896/1944",
  "https://picsum.photos/id/168/1920/1280",
  "https://picsum.photos/id/169/2500/1662",
  "https://picsum.photos/id/170/2500/1667",
  "https://picsum.photos/id/171/2048/1536",
  "https://picsum.photos/id/172/2000/1325",
  "https://picsum.photos/id/173/1200/737",
  "https://picsum.photos/id/174/1600/589",
  "https://picsum.photos/id/175/2896/1944",
  "https://picsum.photos/id/176/2500/1662",
  "https://picsum.photos/id/177/2515/1830",
  "https://picsum.photos/id/178/2592/1936",
  "https://picsum.photos/id/179/2048/1365",
  "https://picsum.photos/id/180/2400/1600",
  "https://picsum.photos/id/181/1920/1189",
  "https://picsum.photos/id/182/2896/1944",
  "https://picsum.photos/id/183/2316/1544",
  "https://picsum.photos/id/184/4288/2848",
  "https://picsum.photos/id/185/3995/2662",
  "https://picsum.photos/id/186/2048/1275",
  "https://picsum.photos/id/187/4000/2667",
  "https://picsum.photos/id/188/2896/1936",
  "https://picsum.photos/id/189/2048/1536",
  "https://picsum.photos/id/190/2048/1365",
  "https://picsum.photos/id/191/2560/1707",
  "https://picsum.photos/id/192/2352/2352",
  "https://picsum.photos/id/193/3578/2451",
  "https://picsum.photos/id/194/2000/1325",
  "https://picsum.photos/id/195/768/1024",
  "https://picsum.photos/id/196/2048/1536",
  "https://picsum.photos/id/197/4272/2848",
  "https://picsum.photos/id/198/3456/2304",
  "https://picsum.photos/id/199/2592/1728",
  "https://picsum.photos/id/200/1920/1280",
  "https://picsum.photos/id/201/5000/3333",
  "https://picsum.photos/id/202/2392/1260",
  "https://picsum.photos/id/203/4032/3024",
  "https://picsum.photos/id/204/5000/3333",
  "https://picsum.photos/id/206/2880/1800",
];

function randomName() {
  switch (Math.floor(Math.random() * 7)) {
    case 0:
      return "Charles Cahill";
    case 1:
      return "Rudy Haley";
    case 2:
      return "Felicity Howell";
    case 3:
      return "Frank Kohler";
    case 4:
      return "Milo Koss";
    case 5:
      return "Kris Klocko";
    case 6:
      return "Andy Effertz";
  }
}

function randomColor() {
  switch (Math.floor(Math.random() * 7)) {
    case 0:
      //purple
      return "rgba(194, 0, 255, .95)";
    case 1:
      //blue
      return "rgba(0, 198, 255, .95)";
    case 2:
      //yellow
      return "rgba(255, 239, 0, .95)";
    case 3:
      //pink
      return "rgba(255, 0, 182, .95)";
    case 4:
      //teal
      return "rgba(0, 255, 169, .95)";
    case 5:
      //red
      return "rgba(255, 0, 57, .95)";
    case 6:
      //orange
      return "rgba(255, 143, 0, .95)";
  }
}

app.post("/getPosts", function (req, res) {
  const postData = [
    {
      name: randomName(),
      username: randomName(),
      pfp: images[Math.floor(Math.random() * images.length)],
      large: Math.random() < 0.5,
      posts: [
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
          ],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
      ],
    },
    {
      name: randomName(),
      username: randomName(),
      pfp: images[Math.floor(Math.random() * images.length)],
      large: Math.random() < 0.5,
      posts: [
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
      ],
    },
    {
      name: randomName(),
      username: randomName(),
      pfp: images[Math.floor(Math.random() * images.length)],
      large: Math.random() < 0.5,
      posts: [
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
            images[Math.floor(Math.random() * images.length)],
          ],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
      ],
    },
    {
      name: randomName(),
      username: randomName(),
      pfp: images[Math.floor(Math.random() * images.length)],
      large: Math.random() < 0.5,
      posts: [
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
      ],
    },
    {
      name: randomName(),
      username: randomName(),
      pfp: images[Math.floor(Math.random() * images.length)],
      large: Math.random() < 0.5,
      posts: [
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
        {
          color: randomColor(),
          name: randomName(),
          imgs: [images[Math.floor(Math.random() * images.length)]],
        },
      ],
    },
  ];
  res.json({ postData });
});

app.post("/getSelectUserResults", function (req, res) {
  var input = req.body.searchInput;
  console.log(input);
});

const PORT = 8080;
app.listen(PORT, function () {
  console.log("Server is ready at " + PORT);
});
