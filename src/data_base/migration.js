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

const profilModel = `CREATE TABLE IF NOT EXISTS "profils" (
    "id" varchar(100) not null unique,
    "user_id" varchar(100) not null unique,
    "last_name" varchar(50),
    "first_name" varchar(100),
    "country" varchar(50),
    "address" varchar(200),
    "birth" TIMESTAMP,
    "photo" varchar(250),
    PRIMARY KEY ("id"),
    CONSTRAINT fk_post_user
   	FOREIGN KEY(user_id) 
    REFERENCES users(id)
    ON DELETE cascade
    ON UPDATE cascade
);`;

export default async function(){
    try{
        await pool.connect()
        await pool.query(userModel)
        await pool.query(profilModel)
        pool.end()
        console.log("table created")
        return true
    }catch(err){
        console.log(err)
        return false
    }
}