import { json } from "express";
import { 
    createProfil,
    getProfilById,
    updateProfil,
    getProfilByUserId,
 } from "../queries/profil.js";
import { getUserById } from "../queries/user.js";

export const createUserprofil = async (req, res, next) =>{
    const data1 = req.body
    
    if(Object.keys(data1).length<1 && req.file ==undefined){
        return res
        .status(400)
        .json({error: "data required"});
    }

    if(!data1.user_id){
        return res
        .status(400)
        .json({error: "user_id is required"});
    }

    const user = req.user;
    
    if(user.user_id != data1.user_id){
        return res
        .status(401)
        .json({error:"Unauthorized"})
    }

    const imgUrl = req.file ? `${req.protocol}://${req.get('host')}/images/profils/${req.file.filename}` :"";
    const data = {
        ...req.body,
        photo: imgUrl
    };

    const profil = await createProfil(data);

    if(!profil) return res.status(500)
   
    return res
    .status(201)
    .json(profil);
};

export const updateUserProfil = async (req, res, nex) =>{
    const {id} = req.params;

    const user = req.user;
    
    if(Object.keys(req.body).length<1 && req.file==undefined){
        return res
        .status(400)
        .json({error: "no field to update"})
    }

    const imgUrl = req.file ? `${req.protocol}://${req.get('host')}/images/profils/${req.file.filename}` :"";
    const data = {
        ...req.body,
        photo: imgUrl
    };

    data["id"] = id;

    const profil = await getProfilById({id});
    if(!profil){
        return res
        .status(404)
        .json({error:"profil not found"});
    }

    if(profil.user_id != user.id){
        return res
        .status(401)
        .json({error: "Unauthorized"})
    }
    
    //check if the user update his profil
    //if(profil.user_id !== req.user_id)
    const update = await updateProfil(data)
   
    if(!update){
        return res 
        .status(500)
        .json({error:"error"});
    }

    return res
    .status(200)
    .json(update);
}

export const getProfilUserById = async (req, res, next) =>{
    const {id} = req.params;

    const profil = await getProfilById({id});

    if(profil == undefined){
        return res 
        .status(404)
        .json({error:"not found"});
    }
    
    return res 
    .status(200)
    .json(profil);
}

export const deleteProfil = async (req, res, next) => {
    console.log(29393)
}

export const myProfile = async (req, res, next) =>{
    const user = req.user;
    const user2 = await getUserById({id: user.user_id})

    //delete the password
    if(user2){
        delete user2.password
    }

    const profil = await getProfilByUserId({id: user2?.id});
    

    if(profil == undefined){
        return res 
        .status(404)
        .json({error:"not found"});
    }
    
    return res 
    .status(200)
    .json({
        profil
    });
}