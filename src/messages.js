module.exports = {
  youWin: () => console.log("You win! :)"),
  youLose: () => console.log("You lose! :("),
  presentation: (me, ports) => console.log(`Hi, I'm  ${me} and I'm listening on port ${ports[me]}`),
  playDescription: (numberReceived, responseNumber, move) => {
    console.log('\n')
    
    if (typeof numberReceived === 'undefined') {
      console.log('Let\'s start this game')
    } else if (numberReceived > 1) {
      console.log(`Number Received: ${numberReceived}`)
    }
    
    typeof move !== 'undefined' && console.log(`My move: ${move}`)
    responseNumber && console.log(`Number sent to the other player: ${responseNumber}`)
  }
}