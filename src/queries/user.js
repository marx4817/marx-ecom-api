import bcrypt from 'bcrypt'
import { v4 as  uuidv4 } from "uuid";
import pg from 'pg';
import { dbConfig } from '../utils/connect.js';

export const createUser = async (data) =>{
    const {email, password} = data;
    let {role} = data;
    role = data.role ? role : 'client';

    const hashPswd = await bcrypt.hash(password, 10);
    const uniqueId = uuidv4();

    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
            `INSERT INTO users(id, email, password, role) values($1, $2, $3, $4) RETURNING id, email, role, last_login`,
            [uniqueId, email, hashPswd, role]
        );

        const payload = res.rows[0];
        client.end();
        return payload;
    }catch(err){
        console.log(err)
    };
};

export const checkUserExist = async (data) => {
    const {email} = data;
    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(`
            Select * from users where email=$1`, [email]
        );

        const payload = await res.rows[0];
        client.end();
        return payload != undefined;
    }catch(err){
        console.log(err)
    };
};

//verify the user
export const verifyUser = async (data) => {
    const {email, password} = data;
    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(`
            Select * from users where email=$1`, [email]
        );
        const user = res.rows[0];
        client.end();

        if(!user) return null;

        const userValid = await bcrypt.compare(password, user.password);
        if(!userValid) return null;
        
        return user;
    }catch(err){
        console.log(err);
    }
}

export const getUserById = async (data) => {
    const {id} = data;
    
    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
            `SELECT * FROM users WHERE id=$1`,
            [id]
        );

        const payload = res.rows[0];
        await client.end();
        return payload;
    }catch(err){
        console.log(err);
    }
}

