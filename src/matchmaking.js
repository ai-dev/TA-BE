const axios = require('axios')

const { exitApp } = require('./helpers')

module.exports = (ports, host, [PLAYER_1, PLAYER_2]) => ({
  getRoles: async () => {
    // Ask player1 if it is ready to play.
    // If the request fails, this is player1
    try {
        await axios.get(`http://${host}:${ports[PLAYER_1]}/ready`)
      } catch (error) {
        if (error.request) {
          return {
            me: PLAYER_1,
            adversary: PLAYER_2,
          }
        } else {
          // Exit for unhandled errors
          exitApp(1)
        }
      }
    
      return {
        me: PLAYER_2,
        adversary: PLAYER_1,
      }
  }
})