const express = require("express")

const server = express()

const Animals = require("./animals/animals-model")

server.use(express.json());

server.get("/animals", (req, res) => {
  Animals.getAll()
    .then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(500).json({
        message: err.message
      })
    })
});

server.get("/animals/:id", (req, res) => {
  const { id } = req.params
  Animals.getById(id)
  .then(data => {
    res.status(200).json(data)
  }).catch(err => {
    res.status(200).json({
      message: err.message
    })
  })
});

server.post("/animals", (req, res) => {
  Animals.insert(req.body)
  .then(data => {
    res.status(201).json(data)
  }).catch(err => {
    res.status(400).json({
      message: err.message
    })
  })
});

server.delete("/animals/:id", (req, res) => {
  res.end()
});

server.put("/animals/:id", (req, res) => {
  res.end()
});


module.exports = server;