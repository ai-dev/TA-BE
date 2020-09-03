module.exports = {
  exitApp: (exitcode) => {
    process.exit(exitcode || 0)
  },
  getRandomInt: (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }
}