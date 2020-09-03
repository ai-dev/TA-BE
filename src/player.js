const readline = require('readline')
const e = require('express')

const helpers = require('./helpers')

const players = ['PLAYER_1', 'PLAYER_2']

const getBestMove = n => [0, -1, 1][n % 3]

const getUserMove = (number) => new Promise(resolve => {
  const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  prompt.question(`\nChoose a number (-1, 0, 1) that added to ${number} gives a multiple of 3: `, async (inputNumber) => {
    prompt.close()
    inputNumber = parseInt(inputNumber)

    const isMultipleOf3 = (inputNumber + number) % 3 === 0
    const isAllowed = [-1, 0, 1].includes(inputNumber)

    if (isMultipleOf3 && isAllowed) {
      resolve(inputNumber)
    } else {
      if (!isAllowed) {
        console.log(`${inputNumber} is not allowed. Choose an integer between -1 and 1`)
      } else {
        console.log(`${inputNumber} + ${number} = ${inputNumber + number}. This is not a multiple of 3`)
      }
      
      resolve(getUserMove(number)) // Retry
    }
  })
})

const player = async (number, interactiveMode) => {
  let move
  let responseNumber

  if (typeof number === 'undefined') {
    // Generate random number at the start of the game
    responseNumber = helpers.getRandomInt(50, 350)
  } else if (number > 1){
    move = interactiveMode ? await getUserMove(number) : getBestMove(number)
    responseNumber = (number + move) / 3
  }

  return { move, responseNumber }
}

module.exports = {
  players,
  player,
  getBestMove,
}