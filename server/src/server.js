const express = require('express')
const cors = require('cors');
const server = express()

server.use(express.json())
server.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
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

server.post('/movies', async (req, res) => {
    const { title, watched } = req.body
    if (typeof title != 'string' || title == '') {
        res.status(400).json({error: 'Please include a non empty title field in the body of the request'})
    }

    try {
        const add = await knex('movies').insert({title, watched}).returning(['id', 'title', 'watched'])
        if (add) {
            res.status(201).json({message: `Movie with title: ${title} added`,
                                movie: add})
        } else {
            console.log(id)
            res.status(404).json({error: `Error inserting title: ${title} into movies table`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

server.patch('/movies', async (req, res) => {
    const { title, watched } = req.body
    const id = parseInt(req.body.id)
    // TODO type check

    try {
        const pat = await knex('movies').where('id', id).update({title, watched}).returning('id')

        if(pat.length > 0){
            res.status(201).json({message: `Movie with id: ${id} was successfully updated`,
                                    data: await knex('movies')
                                                            .where('id', id)
                                                            .select('*')})
        } else {
            res.status(404).json({error: `Unable to patch movie with id: ${id}`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Issue'})
    }
})

server.delete('/movies', async (req, res) => {
    const { title } = req.body
    if (typeof title != 'string' || title == '') {
        res.status(400).json({error: 'Please include a non empty title field in the body of the request'})
    }

    try {
        const del = await knex('movies').where('title', title).del()
        if (del > 0) {
            res.status(200).json({message: await knex('movies').select("*")})
        } else {
            res.status(404).json({error: `Error deleting movies with title: ${title}`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = server