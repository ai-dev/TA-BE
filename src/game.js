const axios = require('axios')

const { exitApp } = require('./helpers')

module.exports = (me, adversary, ports, host) => ({
  // Returns the winner if there is any
  play: async (receivedNumber, responseNumber) => {
    try {

      if (receivedNumber === 1) {
        return adversary
      } else {
        await axios.post(`http://${host}:${ports[adversary]}/play`, { number: responseNumber })
        if (responseNumber === 1) {
          return me
        }
      }

    } catch (error) {
      console.log({ error })
      exitApp(1)
    }
  }
})