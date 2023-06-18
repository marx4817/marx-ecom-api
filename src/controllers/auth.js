import { 
    createUser, 
    checkUserExist,
    verifyUser
} from "../queries/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { verifyRefreshToken } from "../utils/utils.js";

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

    const accessToken = jwt.sign({ user_id: user.id }, process.env.ACCESS_SECRET, {
        expiresIn: `${process.env.ACCESS_EXPIRED_TIME}s`,
    });

    const refreshToken = jwt.sign({ user_id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRED_TIME}s`,
    });
    
    res.status(201).json({user:{
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken
    }}) 
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

    const accessToken = jwt.sign({ user_id: user.id }, process.env.ACCESS_SECRET, {
        expiresIn: `${process.env.ACCESS_EXPIRED_TIME}s`,
    });

    const refreshToken = jwt.sign({ user_id: user.id }, process.env.REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRED_TIME}s`,
    });
    
    res.status(200).json({user:{
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken
    }}) 
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