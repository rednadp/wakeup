import { Directory, File, Paths } from "expo-file-system";
import Papa from 'papaparse';

export async function processGtfs(uri: string, name: string) {

    const routes: any = {}
    const trip: any = {}
    const results: any = {}
    const routeMainTrip: any = {}
    const tripStopCount: any = {}
    const usedOrders: any = {}

    const fixedUri = `file://${uri}`

    const gtfsFolder = new Directory(fixedUri)
    console.log(uri)

    
    const parseCsv = async (fileName: string) => {
        const file = new File(gtfsFolder, fileName)
        const fileContent = await file.text()
        return new Promise((resolve, reject) => {
            Papa.parse(fileContent, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => resolve(result.data),
                error: (err: any) => reject(err)
            })
        })
    }
    try {
        const routesData = (await parseCsv('routes.txt')) as any[]
        routesData.forEach((data) => {
            routes[data.route_id] = {
            name: data.route_long_name,
            shortName: data.route_short_name,
            color:  data.route_color ? `#${data.route_color}` : '#dadada'
            }
        })

        const tripsData = (await parseCsv('trips.txt')) as any[]
        tripsData.forEach((data) => {
            trip[data.trip_id] = {
            routeId: data.route_id,
            headsign: data.trip_headsign,
            direction: data.direction_id
            }
        })

        const stopTimesData = (await parseCsv('stop_times.txt')) as any[]
        stopTimesData.forEach((data) => {
            const tripId = data.trip_id
            tripStopCount[tripId] = (tripStopCount[tripId] || 0) + 1
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

        const stopsData = (await parseCsv('stops.txt')) as any[]
        stopsData.forEach((data) => {
            results[data.stop_id] = {
                id: data.stop_id,
                name: data.stop_name,
                lat: parseFloat(data.stop_lat),
                lon: parseFloat(data.stop_lon),
                lines: []
            }
        })

        stopTimesData.forEach((data) => {
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
        })

        stopTimesData.forEach((data) => {
            const tripInfo = trip[data.trip_id]
            if (!tripInfo) return
            const infoRoute = routes[tripInfo.routeId]
            const stop = results[data.stop_id]

            if (stop && infoRoute) {
                const lineKey = `${infoRoute.shortName}_${tripInfo.headsign}`
                const order = parseInt(data.stop_sequence)
                const alreadyExist = stop.lines.find((l: any) => l.name === `${tripInfo.shortName} - ${tripInfo.headsign}`)
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
        })

        const dataExport = Object.values(results)
        const downloadedCities = new Directory(Paths.document, 'downloadedCities')
        
        if (!downloadedCities.exists) {
            downloadedCities.create()
        }

        const file = new File(downloadedCities, `${name}.json`)
        if (file.exists) {
            await file.delete()
        }
        await file.create()
        await file.write(JSON.stringify(dataExport, null, 2))

    } catch (err) {
        console.log('error', err)
    }
}