const fs = require('fs');
const csv = require('csv-parser');

const results = [];

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