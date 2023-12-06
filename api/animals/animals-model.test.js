const db = require("../../data/db-config")
const Animals = require("./animals-model")

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test("environment is testing", () => {
    expect(process.env.NODE_ENV).toBe("testing")
})

describe("getAll", () => {
    test("resolved all the animals in the table", async () => {
        const data = await Animals.getAll()
        expect(data).toHaveLength(4)
        expect(data[0]).toMatchObject({ name: "horse", classification: "mammal" })
        expect(data[3]).toMatchObject({ name: "great white shark", classification: "fish" })
    })
})

describe("getById", () => {
    test("resolved the animal given id", async () => {
        const data = await Animals.getById(1)
        expect(data).toMatchObject({ name: "horse", classification: "mammal" })
    })
})

describe("insert", () => {
    test("resolved insert new animal on the table", async () => {
        const animal = {name: "cow", classification: "mammal"}
        const newAnimal = await Animals.insert(animal)
        const animals = await db("animals")
        expect(newAnimal).toMatchObject(animal)
        expect(animals).toHaveLength(5)
        expect(animals[4]).toMatchObject(animal)
    })
})

describe("remove", () => {
    test("resolved deleted animal on the table", async () => {
        expect(await db("animals")).toHaveLength(4)
        await Animals.remove(1)
        expect(await db("animals")).toHaveLength(3)
    })
})
