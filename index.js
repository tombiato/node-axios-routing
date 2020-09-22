const express = require('express')
const app = express()
const axios = require('axios')

const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded())

app.get('/users', async (req, res) => {
    try {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/' + req.params.id)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.get('/users/:id/posts', async (req, res) => {
    try {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/' + req.params.id + '/posts')
        res.send(data)
    } catch (e) {
        res.send(e)
    }
})

app.get('/users/:id/albums', async (req, res) => {
    try {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/users/' + req.params.id)
        const albums = await axios.get('https://jsonplaceholder.typicode.com/users/' + req.params.id + '/albums/')
        data.albums = albums.data
        for (let album of data.albums) {
            const photos = await axios.get('https://jsonplaceholder.typicode.com/albums/' + album.id + '/photos/')
            album.photos = photos.data
            //console.log(photos.data)
        }
        console.log(data)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.post('/users', async (req, res) => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', req.body)
        res.send('ressource créé')
    } catch (error) {
        res.send(error)
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const response = await axios.put('https://jsonplaceholder.typicode.com/users/' + req.params.id, req.body)
        res.send('ressource modifié')
    } catch (e) {
        res.send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const response = await axios.delete('https://jsonplaceholder.typicode.com/users/' + req.params.id)
        res.send('ressource supprimé')
    } catch (e) {
        res.send(e)
    }
})

app.listen(port)
