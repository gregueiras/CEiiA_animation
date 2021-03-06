function inputHandler({ name, shift }, sendData, clients) {
  const buoys = ['B2582', 'B4242']

  let location, data
  const type = shift ? 'O2MG' : 'O2P'
  switch (name) {
  case 'q': {
    location = 'S. Miguel'
    data = 8
    break
  }
  case 'a': {
    location = 'S. Miguel'
    data = 5
    break
  }
  case 'z': {
    location = 'S. Miguel'
    data = 2
    break
  }
  case 'w': {
    location = 'Terceira'
    data = 8
    break
  }
  case 's': {
    location = 'Terceira'
    data = 5
    break
  }
  case 'x': {
    location = 'Terceira'
    data = 2
    break
  }
  case 'c': {
    process.exit()
    break
  }

  case 'd': {
    console.log(
      Object.keys(clients).map(location => [
        location,
        clients[location].length,
      ])
    )
    break
  }
  default:
    break
  }
  location += type

  if (location && data) {
    const receivingClients = clients[location]
    const buoy = buoys[Math.floor(Math.random() * buoys.length)]
    const newData = JSON.stringify([buoy, null, data]) //BuoyID, Timestamp, Value

    if (receivingClients) {
      receivingClients.forEach(client => sendData(client, location, newData))
      console.log(
        `Message Sent to ${location}: ${newData} ${receivingClients.length}x`
      )
    } else {
      console.log(`No clients for ${location}`)
    }
  }
}

function fakeDataSetup(locations, sendData, clients) {
  locations.push('S. MiguelO2P')
  locations.push('S. MiguelO2MG')
  locations.push('TerceiraO2P')
  locations.push('TerceiraO2MG')

  console.log(sendData, clients)
  console.log(inputHandler)

}

module.exports = {
  fakeDataSetup,
}
