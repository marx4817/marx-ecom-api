import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const isAuthenticated = (req, res, next) => {
    
    try {
        let token = req.get("authorization");
        if (!token){
            return res.status(401).json({ error:"unauthorized" });
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = {user_id: decoded.user_id, email: decoded.email}
        next();
    } catch (error) {
        return res.status(401).json({ success: false, msg: error.message });
        // console.error(error);
    }
}