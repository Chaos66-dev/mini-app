const express = require('express')
const server = express()

server.use(express.json())
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

server.get('/', (req, res) => {
    res.status(200).send('I am working')
})

server.get('/movies', async (req, res) => {
    try {
        const query = await knex('movies').select("*")
        res.status(200).json(query)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = server