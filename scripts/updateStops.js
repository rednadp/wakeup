const fs = require('fs');
const csv = require('csv-parser');
const { info } = require('console');

const readline = require('readline/promises')
const {stdin: input, stdout: output} = require('process')

const routes = {}
const trip = {}
const results = {}
const routeMainTrip = {}
const tripStopCount = {}
const usedOrders = {}

async function crossData(givenName) {
  await new Promise(resolve => {
  fs.createReadStream('./gtfs/routes.txt')
  .pipe(csv())
  .on('data', (data) => {
    routes[data.route_id] = {
      name: data.route_long_name,
      shortName: data.route_short_name,
      color:  data.route_color ? `#${data.route_color}` : '#fff'
    }
  }).on('end', resolve)
})


await new Promise(resolve => {
  fs.createReadStream('./gtfs/trips.txt')
  .pipe(csv())
  .on('data', (data) => {
    trip[data.trip_id] = {
      routeId: data.route_id,
      headsign: data.trip_headsign,
      direction: data.direction_id
    }
  }).on('end', resolve)
})


await new Promise(resolve => {
  fs.createReadStream('./gtfs/stop_times.txt')
    .pipe(csv())
    .on('data', (data) => {
      const tripId = data.trip_id
      tripStopCount[tripId] = (tripStopCount[tripId] || 0) + 1
    }).on('end', resolve)
})

for (const tripId in tripStopCount) {
  const tripInfo = trip[tripId]
  if (!tripInfo) continue
  const infoRoute = routes[tripInfo.routeId]
  if (!infoRoute) continue
  const lineKey = `${infoRoute.shortName}_${tripInfo.headsign}`

  if (!routeMainTrip[lineKey] || tripStopCount[tripId] > tripStopCount[routeMainTrip[lineKey]]) {
    routeMainTrip[lineKey] = tripId
  }
}


await new Promise(resolve => {
  fs.createReadStream('./gtfs/stops.txt')
  .pipe(csv())
  .on('data', (data) => {
    results[data.stop_id] = {
      id: data.stop_id,
      name: data.stop_name,
      lat: parseFloat(data.stop_lat),
      lon: parseFloat(data.stop_lon),
      lines: []
    }
  }).on('end', resolve)
})

await new Promise(resolve => {
  fs.createReadStream('./gtfs/stop_times.txt')
  .pipe(csv())
  .on('data', (data) => {
    const tripInfo = trip[data.trip_id]
    if (!tripInfo) return
    const infoRoute = routes[tripInfo.routeId]
    const stop = results[data.stop_id]

    if (stop && infoRoute) {
      const lineKey = `${infoRoute.shortName}_${infoRoute.headsign}`
      
      if (data.trip_id === routeMainTrip[lineKey]) {
        const order = parseInt(data.stop_sequence)
        if (!usedOrders[lineKey]) usedOrders[lineKey] = new Set()
        usedOrders[lineKey].add(order)
        stop.lines.push({
          name: `${infoRoute.shortName} - ${infoRoute.headsign}`,
          shortName: infoRoute.shortName,
          color: infoRoute.color,
          order: order
        })
      }
      
    }
    
  }).on('end', resolve)
})

await new Promise(resolve => {
  fs.createReadStream('./gtfs/stop_times.txt')
    .pipe(csv())
    .on('data', (data) => {
      const tripInfo = trip[data.trip_id]
      if (!tripInfo) return
      const infoRoute = routes[tripInfo.routeId]
      const stop = results[data.stop_id]

      if (stop && infoRoute) {
        const lineKey = `${infoRoute.shortName}_${tripInfo.headsign}`
        const order = parseInt(data.stop_sequence)
        const alreadyExist = stop.lines.find(l => l.name === `${tripInfo.shortName} - ${tripInfo.headsign}`)
        const alreadyUsedInLine = usedOrders[lineKey] && usedOrders[lineKey].has(order)

        if (!alreadyExist && !alreadyUsedInLine) {
          if (!usedOrders[lineKey]) usedOrders[lineKey] = new Set()
          usedOrders[lineKey].add(order)

          stop.lines.push({
            name: `${infoRoute.shortName} - ${tripInfo.headsign}`,
            shortName: infoRoute.shortName,
            color: infoRoute.color,
            order: order
        })
      }
    }
  }).on('end', resolve)
})

const dataExport = Object.values(results)
fs.writeFileSync(`./assets/cities/${givenName}.json`, JSON.stringify(dataExport, null, 2))
}

const cleanId = (texto) => {
      return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, '_') 
        .substring(0, 20); 
    }

async function askName() {
  const rl = readline.createInterface({input, output})
  const answare = await rl.question('How would you like to name your city?\n')
  const name = cleanId(answare)
  console.log(`Your city will be saved as ${name}.json in assets/cities`)
  rl.close()
  return name
}

async function main() {
  console.log("Hello, please verify that your gtfs is in the root and in a folder named gtfs")
  console.log("Please write the name for your city")
  const name = await askName()
  console.log('Please wait, your gtfs is being processed')
  await crossData(name)
  console.log("terminado")
}

main()


/*
fs.createReadStream('./gtfs/routes.txt')
  .pipe(csv())
  .on('data', (data) => {
    routes[data.route_id] = data.route_short_name || row.route_long_name
  })

  fs.createReadStream('./gtfs/stop_times.txt')
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      stop_id: data.stop_id,
      sequence: parseInt(data.stop_sequence),
      trip_id: data.trip_id
    });
  })
  .on('end', () => {
    
  })



fs.createReadStream('./gtfs/stops.txt')
  .pipe(csv())
  .on('data', (data) => {
    results.push({
      id: data.stop_id,
      name: data.stop_name,
      lat: parseFloat(data.stop_lat),
      lon: parseFloat(data.stop_lon),
    });
  })
  .on('end', () => {
    fs.writeFileSync(
      './assets/stops.json', 
      JSON.stringify(results, null, 2)
    );
    console.log(`Éxito! ${results.length} paradas procesadas.`);
  });

  */