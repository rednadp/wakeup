import { useLocation } from '@/hooks/useLocation'
import { Platform, StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps'

export default function MapViewer() {
    const {location, errorMsg} = useLocation()

    if (errorMsg) return <View><Text>{errorMsg}</Text></View>
    if (!location) return <View><Text>Gettig location</Text></View>


    if (Platform.OS === 'android') {
        return (
        <MapView style={style.map} showsUserLocation={true} initialRegion={{latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.05, longitudeDelta: 0.05}}>

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