const User = require('../models/usersModel');
const jwt  = require('jsonwebtoken');

//'jsonwebtoken' needs some unique thing about a user to create a token. So use id.
const createToken = (id) => {
    return jwt.sign({id:_id},process.env.SEC,{expiresIn:'3d'});//The reason first arg is {id:_id} is becuz later you can get access the if from jwt.
};

//Log the user in:
const loginUser = async (req,res) => {
    const {userName,password} = req.body;
    try {
        //Using the static 'signup' function defined inside 'usersModel'
        const user  = await User.login(userName,password);
        const token = createToken(user._id);
        return res.status(200).json({...user,token});
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
};

//Signup the user:
const signupUser = async (req,res) => {
    const {fullName,userName,password} = req.body;
    try {
        //Using the static 'signup' function defined inside 'usersModel'
        const user  = await User.signup(fullName,userName,password);
        const token = createToken(user._id);
        return res.status(200).json({...user,token});
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
}

module.exports = {loginUser,signupUser};
