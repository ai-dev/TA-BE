const assert = require('assert')
const sinon = require('sinon')

const { getBestMove, player } = require('./../src/player')
const helpers = require('./../src/helpers')

describe('Player', () => {
  describe('player', () => {
    it('should return the best move and responseNumber', async () => {
      assert.deepEqual(await player(46), {
        move: -1,
        responseNumber: 15
      })
    })

    it('should return undefined if the number provided is not acceptable', async () => {
      assert.deepEqual(await player(1), {
        move: undefined,
        responseNumber: undefined
      })
    })

    it('should generate a random number if no one is provided at the start of the game', async () => {
      const stub = sinon.stub(helpers, 'getRandomInt')
      stub.returns(300)

      const { responseNumber, move } = await player()

      sinon.assert.called(stub)
      assert(Number.isInteger(responseNumber))
      assert(typeof move === 'undefined')

      stub.restore()
    })
  })

  describe('getBestMove', () => {
    it('should return the addend that summed with the number returns a multiple of 3', () => {
      assert.equal(getBestMove(46), -1)
      assert.equal(getBestMove(27), 0)
      assert.equal(getBestMove(6), 0)
      assert.equal(getBestMove(10), -1)
      assert.equal(getBestMove(11), 1)
      assert.equal(getBestMove(2), 1)
      assert.equal(getBestMove(4), -1)
    })
  })
})