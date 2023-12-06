const db = require("../data/db-config")
const request = require("supertest")
const server = require("./server")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async () => {
    await db.seed.run()
})

describe("[GET] /animals", () => {
    test("response with 200 Ok", async () => {
        const res = await request(server).get("/animals")
        expect(res.status).toBe(200)
    })
    test("response with all the animals", async () => {
        const res = await request(server).get("/animals")
        expect(res.body).toHaveLength(4)
    })
})

describe("[GET] /animals/:id", () => {
    test("response with 200 Ok", async () => {
        const res = await request(server).get("/animals/1")
        expect(res.status).toBe(200)
    })
    test("response with the animal given id", async () => {
        const res = await request(server).get("/animals/1")
        expect(res.body).toMatchObject({name:"horse", classification: "mammal"})
    })
})

describe("[POST] /animals", () => {
    test("response with 201 Ok", async () => {
        const animal = {name: "cow", classification: "mammal"}
        const res = await request(server).post("/animals").send(animal)
        expect(res.status).toBe(201)
    })
    test("resolve the inserted animal", async () => {
        const animal = {name: "cow", classification: "mammal"}
        await request(server).post("/animals").send(animal)
        expect(await db("animals")).toHaveLength(5)
    })
})

describe("[DELETE] /animals/:id", () => {
    test("resolve the deleted animal", async () => {
        await request(server).delete("/animals/1")
        expect(await db("animals")).toHaveLength(4)
    })
})