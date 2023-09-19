import { v4 as  uuidv4 } from "uuid";
import pg from 'pg';
import { dbConfig } from '../utils/connect.js';

export const createProfil = async (data) =>{
    const id = uuidv4();

    //chan ki nan baz dedone a se chan sa yo ki dwe soumet nn data a 
    // mw itilize yo pou 
    const validFields = [
        "id",
        "user_id",
        "first_name",
        "last_name",
        "photo",
        "country",
        "address",
        "birth"
    ];

    //add the id in the data
    const data1 = {
        id: id,
        ...data
    }
    
    // Teknik pou pou ranje vale ka antre nan tab la
    let positions = "";
    let fields = "";
    let values = [];
    Object.entries(data1).forEach(([key], index) => {
        if (validFields.includes(key)) {
            positions += `\$${index + 1}`;
            fields += key;
            values.push(data1[key])
            if (index + 1 < Object.keys(data1).length) {
                positions += ", ";
                fields +=", ";
            }
        }
    });

    // console.log("fields",fields)
    // console.log("values", values)
    // console.log("position", positions)

    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
            `INSERT INTO profils(${fields}) values(${positions}) RETURNING *`,
            values
        );
        const payload = res.rows[0];
        await client.end();

       return payload;
    }catch(err){
        console.log(err)
    }
}

export const updateProfil = async (data) =>{

    // retire id, nan chan ki pral update yo
    const { id } = data;
    delete data.id;

    const validFields = [
        "id",
        "user_id",
        "first_name",
        "last_name",
        "photo",
        "country",
        "address",
        "birth"
    ];
    console.log(data)
    // Teknik pou jenere chan ki pral update yo: key=$index
    let positions = "";
    let fields = [];
    let values = [];
    Object.entries(data).forEach(([key], index) => {
        if (validFields.includes(key)) {
        positions += `${key}=\$${index + 1}`;
        fields.push(key);
        values.push(data[key]);
        if (index + 1 < Object.keys(data).length) {
            positions += ", ";
        }
        }
    });

    //add the id in the values
    values.push(id)
  
    try {
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
        `UPDATE profils SET ${positions} WHERE id=$${
            Object.keys(fields).length + 1
        } RETURNING *`,
        values
        );
        const payload = res.rows[0];
        client.end();
        return payload;
    } catch (err) {
        console.log(err);
    }
};

export const getProfilById = async (data) => {
    const {id} = data;

    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
            `SELECT * FROM profils WHERE id=$1`,
            [id]
        );

        const payload = res.rows[0];
        await client.end();
        console.log(payload)
        return payload;
    }catch(err){
        console.log(err);
    }
}

export const getProfilByUserId = async (data) => {
    const {id} = data;

    try{
        const client = new pg.Client(dbConfig);
        await client.connect();
        const res = await client.query(
            `SELECT * FROM profils WHERE user_id=$1`,
            [id]
        );

        const payload = res.rows[0];
        await client.end();
        return payload;
    }catch(err){
        console.log(err);
    }
}

