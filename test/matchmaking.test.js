const assert = require('assert')
const sinon = require('sinon')
const axios = require('axios')

const { players } = require('./../src/player')
const matchmaking = require('./../src/matchmaking')({
  [players[0]]: 3000,
  [players[1]]: 3001,
}, 'localhost', players)

describe('Matchmaking', () => {
  it('should return the correct roles for the players (me = player1)', async () => {
    const stub = sinon.stub(axios, 'get')
    stub.throws({
      request: true,
    })

    const roles = await matchmaking.getRoles()
    assert.deepEqual(roles, { me: players[0], adversary: players[1] })

    stub.restore()
  })

  it('should return the correct roles for the players (me = player2)', async () => {
    const stub = sinon.stub(axios, 'get')
    stub.resolves('OK')

    const roles = await matchmaking.getRoles()
    assert.deepEqual(roles, { me: players[1], adversary: players[0] })

    stub.restore()
  })

  it('should exit the service if the error returned by the endpoint is not a "request" kind', async () => {
    const exitAppStub = sinon.stub(process, 'exit')
    const axiosStub = sinon.stub(axios, 'get')

    axiosStub.throws({
      response: true,
    })

    await matchmaking.getRoles()
  
    sinon.assert.called(exitAppStub)
    assert.equal(exitAppStub.getCall(0).args[0], 1)

    exitAppStub.restore()
    axiosStub.restore()
  })
})