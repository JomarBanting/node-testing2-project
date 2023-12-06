const db = require("../../data/db-config")

function getAll(){
    return db("animals")
}

function getById(id){
    return db("animals").where("id", id).first()
}

async function insert(data){
    const returnId = await db("animals").insert(data)
    return getById(returnId[0])
}

async function remove(id){
    const animal = await getById(id)
    await db("animals").del().where("id", id)
    return animal
}

module.exports = {
    getAll,
    getById,
    insert,
    remove
}