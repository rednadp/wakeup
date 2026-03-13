import stops from '@/assets/stops.json';
import { Arrow } from "@/components/arrow";
import { Button } from "@/components/Button";
import { CenterButton } from "@/components/CenterButton";
import MapViewer from "@/components/mapViewer";
import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from 'react-native-maps';

export default function stopSelecter() {
    const [selectedStopId, setSelectedStopId] = useState<string>("0")
    const [selectedLine, setSelectedLine] = useState<null | string>(null)

    let selectedStop = stops.find((stop) => stop.id == selectedStopId)

    const mapRef = useRef<MapView>(null)
    function changeStop(addition: number) {
    /*
mapRef.current?.fitToSuppliedMarkers([stop], {edgePadding: {
            top: 100, left: 100, right: 100, bottom: 100
        },
        animated: true
    */
        
        const changeFocus = () => {
        mapRef.current?.animateToRegion({
            latitude: selectedStop?.lat ?? 42.85032,
            longitude: selectedStop?.lon ?? -2.6612,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }, 1000)
    
    }
    

        if (selectedLine != null) {
            let newStop = (selectedStop?.lines.find((line) => line.shortName == selectedLine)?.order ?? 0) + addition
            setSelectedStopId(stops.find((stop) => stop.lines.find((line) => line.shortName == selectedLine && line.order == newStop))?.id ?? "0")
            selectedStop = stops.find((stop) => stop.id == selectedStopId)
            changeFocus()
        } else {
            console.log("No hay linea seleccionada")
        }
    } 
    return (
        <View style={style.container}>
            <MapViewer ref={mapRef} setStop={(stopId) => setSelectedStopId(stopId)} selectedLine={selectedLine} />
            <View style={style.ui}>
                <Button onPress={() => setSelectedLine(null)} label="Hola" />
                <View style={style.bottomRow}>
                    <Arrow onPress={() => changeStop(-1)} icon="arrow-back" />
                    <CenterButton onPress={() => setSelectedLine("1")} label={selectedStop ? selectedStop.name : "No selecionado"} />
                    <Arrow onPress={() => changeStop(1)} icon="arrow-forward" />
                </View>
            </View>
        </View>
    )
}



const style = StyleSheet.create({
    container: {
        backgroundColor: '#25292e',
        flex: 1,
        alignItems:'center'
    },
    ui: {
        position: 'absolute',
        bottom: 50,
        flex: 1 / 3,
        alignItems: 'center',
    },
    bottomRow: {
        flexDirection: 'row',
        paddingHorizontal: 100
    },
})