
import { useData } from '@/context/DataContext'
import { useContextLocation } from '@/context/UseLocationContext'
import { getDistanceInMeters } from '@/utils/distance'
import { useEffect } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

type Props = {
    selectedLine: string | null,
    setStop: (stopId: string) => void,
    ref?: React.Ref<MapView>
}

export default function MapViewer({selectedLine, setStop, ref}: Props) {
    const {stops, loading} = useData()

    const {location, errorMsg, startGettingLocation, resetLocation} = useContextLocation()

    useEffect(() => {
        if (!location && !errorMsg) {
            startGettingLocation()
        } else if (!location) {
            resetLocation()
            startGettingLocation()
        }
    }, [])

    if (loading || !stops) return <ActivityIndicator />
    

    if (errorMsg) return <View style={style.errContainer}><Text style={style.errText}>{errorMsg}</Text></View>
    if (!location) return <View style={style.errContainer}><Text style={style.errText}>Getting location</Text></View>


    if (Platform.OS === 'android') {
        function isThisStopInTheLine(currentStop: { lines: any[] }) {
            let yesItIs = false
            if (selectedLine == null) {
                return true
            }
            currentStop.lines.map((line) => {
                if (line.name == selectedLine) {
                    yesItIs = true
                }
            })
            return (
                yesItIs
            )
        }


        return (
        <MapView ref={ref} style={style.map} showsUserLocation={true} initialRegion={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05}}>
            {stops.filter(isThisStopInTheLine).map(({id, name, lat, lon}, index) => {
                return (
                    <Marker
                    identifier={id}
                    onPress={() => setStop(id)}
                    id={id}
                    title={name}
                    coordinate={{latitude: lat, longitude: lon}}
                    key={index}
                    description={`Disctance: ${location ? getDistanceInMeters(location.coords.latitude, location.coords.longitude, lat, lon): 'err'}`} // Esto no se por que hay que hacerlo, si no me dice que puede ser undefind
                    />
                )
            })}
        </MapView>
    )
    } else {
        return (
            <Text>Maps is not supported in this plataform</Text>
        )
    }
    
}

const style = StyleSheet.create({
    map:
    {
        width: '100%',
        height: '100%'
    },
    errContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    errText: {
        fontSize: 24,
        margin: 20
    }
})