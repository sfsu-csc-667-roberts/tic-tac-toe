const express = require('express')
const router = express.Router()

router.post('/:id', function (request, response) {
  const { id } = request.params

  response.json({ testMessage: `Posted to id ${id}` })
})

router.post('/:id/move', function (request, response) {
  const { id } = request.params
  const { coordinate } = request.body

  response.json({ testMessage: `Posted to id ${id}/move: ${coordinate}` })
})


module.exports = router
