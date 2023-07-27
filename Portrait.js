const mongoose = require('mongoose')

const PortraitSchema = new mongoose.Schema({
    UserNameP: String,
    FullNameP: String,
    PhoneNumberP: String,
    PasswordP: String,
    BioP: String,
    ColorP: String,
    ProfilePics:{
        Pic1P : String,
        Pic2P : String,
        Pic3P : String,
        Pic4P : String,
        Pic5P : String,
        Pic6P : String,
    },
    PrivacyP: String,
})

mongoose.model("portrait", PortraitSchema)