import stops from '@/assets/stopsv2.json'
import { useLocation } from '@/hooks/useLocation'
import { getDistanceInMeters } from '@/utils/distance'
import { Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

type Props = {
    selectedLine: string | null,
    setStop: (stopId: string) => void,
    ref?: React.Ref<MapView>
}

export default function MapViewer({selectedLine, setStop, ref}: Props) {
    const {location, errorMsg} = useLocation()

    

    if (errorMsg) return <View><Text>{errorMsg}</Text></View>
    if (!location) return <View><Text>Gettig location</Text></View>


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
                    description={`Disctance: ${getDistanceInMeters(location.coords.latitude, location.coords.longitude, lat, lon)}`}
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
    }
})