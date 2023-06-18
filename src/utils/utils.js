import pkg from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export function isAuthenticated (req, res, next) {
    try {
        let token = req.get("authorization");
        if (!token){
            return res.status(404).json({ success: false, msg: "Token not found" });
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded.user_id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: error.message });
        // console.error(error);
    }
}

export const verifyRefreshToken = (data) => {
    const {user_id, refresh_token} = data;

    try{
        const decode = jwt.verify(refresh_token, process.env.REFRESH_SECRET)
        return decode.user_id === user_id;
    }catch(err){
        console.log("expire");
        return false;
    }
}