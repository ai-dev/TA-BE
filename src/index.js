const express = require('express')
const bodyParser = require('body-parser')

const messages = require('./messages')
const { player, players }= require('./player')
const gameManager = require('./game')
const matchmaking = require('./matchmaking')
const { exitApp } = require('./helpers')

const app = express()
app.use(bodyParser.json())

const [PLAYER_1, PLAYER_2] = players

const host = 'localhost'
const ports = {
  [PLAYER_1]: 3000,
  [PLAYER_2]: 3001,
}

;(async () => {
  let { me, adversary } = await matchmaking(
    ports,
    host,
    players
  ).getRoles()

  const game = gameManager(me, adversary, ports, host)
  
  // Start webserver
  app.listen(ports[me], async () => {
    messages.presentation(me, ports)
    
    if (me === PLAYER_2) {
      // Trigger player1 to start the game.
      game.play()
    }
  })

  app.get('/ready', async (req, res) => {
    res.send('OK')
  })

  // Receive play from the adversary
  app.post('/play', async (req, res) => {
    let { number } = req.body
    res.send('OK')

    const { move, responseNumber } = await player(number, process.argv.includes('-i'))
    const winner = await game.play(number, responseNumber)
    messages.playDescription(number, responseNumber, move)

    if (winner) {
      winner === me ? messages.youWin() : messages.youLose()
      exitApp()
    }
  })
})()
