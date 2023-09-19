import { 
    createUser, 
    checkUserExist,
    verifyUser
} from "../queries/user.js";
import { createProfil } from "../queries/profil.js";
import { verifyRefreshToken } from "../utils/utils.js";

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const registerUser = async (req, res, next) =>{
    const {email, password, role} = req.body;

    if(!email || !password){
        return res
        .status(400)
        .json({error: "Email and Password are mandatory"});
    }

    //check if the user already exist
    const userExist = await checkUserExist({email});
    if(userExist){
        return res.status(409).json({error: "user already exist"});
    };

    const user = await createUser({email, password, role});

    const profil = await createProfil({user_id: user.id})
    console.log(profil)

    const accessToken = jwt.sign({ user_id: user.id, email: user.email }, process.env.ACCESS_SECRET, {
        expiresIn: `${process.env.ACCESS_EXPIRED_TIME}s`,
    });

    const refreshToken = jwt.sign({ user_id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRED_TIME}s`,
    });
    
    res.status(201).json({
        user,
        access_token: accessToken,
        refresh_token: refreshToken
    }) 
}

export const loginUser = async (req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "email and password are mandatory"});
    }

    const user = await verifyUser({email, password});

    if(!user){
        return res.status(400).json({error: 'email or password is incorrect'});
    }

    const accessToken = jwt.sign({ user_id: user.id, email: user.email }, process.env.ACCESS_SECRET, {
        expiresIn: `${process.env.ACCESS_EXPIRED_TIME}s`,
    });

    const refreshToken = jwt.sign({ user_id: user.id}, process.env.REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRED_TIME}s`,
    });
    
    res.status(200).json({
        user,
        access_token: accessToken,
        refresh_token: refreshToken
    }) 
}

export const refreshToken = (req, res, next) => {
    const {user_id, refresh_token} = req.body;
    const isValid = verifyRefreshToken({user_id, refresh_token});

    if(!isValid){
        return res
        .status(401)
        .json({error: "Invalid token,try login again"})
    }

    const access_token = jwt.sign({user_id}, process.env.ACCESS_SECRET, {
        expiresIn: `${process.env.REFRESH_EXPIRED_TIME}s`
    })

    return res.status(200).json({ success: true, access_token });
}

export const verifyEmail = async (req, res, next) =>{
    const {email} = req.body;
    
    if(!email){
        return res
        .status(400)
        .json({error: "email is required"})
    }

    const emailExist = await checkUserExist({email})
    
    return res
    .status(200)
    .json({email_exists: emailExist})
}

export const verifyPassword = async (req, res, next) =>{
    const {email} = req.user;
    const {password} = req.body;

    if(!password){
        return res
        .status(400)
        .json({error: "password is required"});
    };

    const isValid = await verifyUser({email, password});
    const password_valid = isValid !== null;

    return res
    .status(200)
    .json({password_valid})
}