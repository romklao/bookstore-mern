const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt  = require('bcrypt');

const userSchema = mongoose.Schema({
    fullName : {type:String,required:true},
    userName : {type:String,required:true},
    password : {type:String,required:true},
});

//Static Methods for Login and Signup :

//The following function signs up a user:
userSchema.statics.signup = async function (fullName,userName,password) {
    //See if any of the 3 arguments are missing : 
    if (!fullName || !userName || !password) {
        throw Error("All fields must be filled!");
    }
    //See if the password is valid : 
    if (!validator.isStrongPassword(password)) {
        throw Error("Password ain't strong enough!")
    }
    //See if the user with that particular username exists : 
    const exists = await this.findOne({userName}); //Since we r using 'this' keyword, we use 'async function' in line 14 instead of arrow function
    //Throw Error if username already in user
    if (exists) {
        throw Error("Username already in use!")
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({fullName,userName,password:hash});
    return user;
}

//The following function logs in a user : 
userSchema.statics.login = async function(userName,password) {
    if (!userName || !password) {
        throw Error("All fields must be filled!");
    }
    const user = await this.findOne({userName});
    if (!user) {
        throw Error("Wrong Username/ Username doesn't exist.");
    }
    //Matches given password with stored password:
    const match = await bcrypt.compare(password,user.password);
    if (!match) {
        throw Error("Wrong Password")
    }
    return user;
}

module.exports = mongoose.model('bookstoreuser',userSchema);