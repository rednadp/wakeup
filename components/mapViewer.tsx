import stops from '@/assets/stops2.json'
import { useLocation } from '@/hooks/useLocation'
import { getDistanceInMeters } from '@/utils/distance'
import { Platform, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const latitude = 42.8617116
const longitude = -2.6879542

export default function MapViewer() {
    const {location, errorMsg} = useLocation()

    if (errorMsg) return <View><Text>{errorMsg}</Text></View>
    if (!location) return <View><Text>Gettig location</Text></View>


    if (Platform.OS === 'android') {
        return (
        <MapView style={style.map} showsUserLocation={true} initialRegion={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05}}>
            {stops.map(({id, name, lat, lon}, index) => {
                return (
                    <Marker 
                    id={id}
                    title={name}
                    coordinate={{latitude: lat, longitude: lon}}
                    key={index}
                    description={`Disctance: ${getDistanceInMeters(location.coords.latitude, location.coords.longitude, lat, lon)}`}
                    />
                )
            })}
            <Marker description={`Distance: ${getDistanceInMeters(location.coords.latitude, location.coords.longitude, latitude, longitude)}`} title='Hola' key={1} coordinate={{latitude: 42.8617116, longitude: -2.6879542}}></Marker>
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