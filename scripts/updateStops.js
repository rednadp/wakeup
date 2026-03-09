const fs = require('fs');
const csv = require('csv-parser');
const { resolve } = require('dns');

const routes = {}
const trip = {}
const results = {};

async function crossData() {
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
    trip[data.trip_id] = data.route_id
  }).on('end', resolve)
})

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
    const routeId = trip[data.trip_id]
    const infoRoute = routes[routeId]
    const stop = results[data.stop_id]

    if (stop && infoRoute) {
      const alreadyExist = stop.lines.find(l => l.name === infoRoute.name)
      if (!alreadyExist) {
        stop.lines.push({
          name: infoRoute.name,
          shortName: infoRoute.shortName,
          color: infoRoute.color,
          order: parseInt(data.stop_sequence)
        })
      }
    }
  }).on('end', resolve)
})

const dataExport = Object.values(results)
fs.writeFileSync('./assets/stops2.json', JSON.stringify(dataExport, null, 2))
}

crossData()


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