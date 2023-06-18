import { pool } from "../utils/connect.js";

const userModel = `CREATE TABLE IF NOT EXISTS "users" (
    "id" varchar(100) not null unique,
    "email" varchar(100) not null unique,
    "password" varchar(100) not null,
    "role" varchar(15) not null Default 'client',
    "date_joined" TIMESTAMP DEFAULT NOW(),
	"last_login" TIMESTAMP,
	PRIMARY KEY ("id")
);`;

export default async function(){
    try{
        await pool.connect()
        await pool.query(userModel)
        pool.end()
        console.log("table created")
        return true
    }catch(err){
        console.log("dkkdk")
        return false
    }
}