const assert = require('assert')
const sinon = require('sinon')
const axios = require('axios')

const { getBestMove, player, players } = require('./../src/player')
const game = require('./../src/game')(
  players[0],
  players[1],
  {
    [players[0]]: 3000,
    [players[1]]: 3001,
  },
  'localhost'
)

describe('Game', () => {
  it('should send the play to the adversary', async () => {
    const stub = sinon.stub(axios, 'post')
    stub.resolves('OK')

    const winner = await game.play(60, 20)
      
    sinon.assert.called(stub)
    assert.deepEqual(stub.getCall(0).args[1], { number: 20 })
    assert.equal(winner, undefined)

    stub.restore()
  })

  it('should detect that me is the winner', async () => {
    const stub = sinon.stub(axios, 'post')
    stub.resolves('OK')

    const winner = await game.play(4, 1)
      
    sinon.assert.called(stub)
    assert.deepEqual(stub.getCall(0).args[1], { number: 1 })
    assert.equal(winner, players[0])

    stub.restore()
  })

  it('should detect that me is the loser', async () => {
    const winner = await game.play(1, undefined)
    assert.equal(winner, players[1])
  })
})