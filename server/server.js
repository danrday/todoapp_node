'use strict'

const { json } = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo'
const PORT = process.env.PORT || 3000

app.use(express.static('client'))
app.use(json())

app.get('/api/title', (req, res) =>
  res.json({ title: 'To Do List' })
)

const ListItem = mongoose.model('task', {
  content: String,
})

app.get('/api/todo', (req, res, err) =>
  ListItem
    .find()
    .then(tasks => {
      console.log("tasks", tasks)
      console.log("tasks[0].content", tasks[0].content)
      res.json({ tasks })
  })
    .catch(err)
)

app.post('/api/todo', (req, res, err) =>
  ListItem
    .create(req.body)
    .then(msg => res.json(msg))
    .catch(err)
)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
)
