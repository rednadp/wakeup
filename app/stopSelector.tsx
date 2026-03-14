import stops from '@/assets/stopsv2.json';
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

    const changeSelectedId = (newStop: string) => {
        if (newStop == "0") {
            console.log("errrror")
        }
        selectedStop = stops.find((stop) => stop.id == newStop)
        setSelectedStopId(newStop)
    }


    const mapRef = useRef<MapView>(null)
    function changeStop(addition: number) {
    /*
mapRef.current?.fitToSuppliedMarkers([stop], {edgePadding: {
            top: 100, left: 100, right: 100, bottom: 100
        },
        animated: true
    */
        
        const changeFocus = () => {
            if (selectedLine != undefined || selectedStop != undefined) {
                mapRef.current?.animateToRegion({
                    latitude: selectedStop?.lat ?? 42,
                    longitude: selectedStop?.lon ?? -2,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }, 1000)
            }
        }

        if (selectedLine != null) {
            let newStop: number
            console.log(selectedStop, "linea", selectedLine, "id", selectedStopId)
            if (selectedStop != undefined) {
                newStop = (selectedStop?.lines.find((line) => line.name == selectedLine)?.order ?? 0) + addition
            } else {
                if (addition > 0) {
                    newStop = 1
                } else {
                    console.log(stops.filter((stop) => stop.lines.filter((line) => line.name == selectedLine)))
                    let lineStops = stops.filter((stop) => stop.lines.find((line) => line.name == selectedLine))
                    newStop = Math.max(...lineStops.map((stop) => {return (stop.lines.find((line) => line.name == selectedLine)?.order ?? 0)}))
                    // newStop = (stops.filter((stop) => stop.lines.find((line) => line.name == selectedLine))?.length ?? -2) + 1
                    console.log("Yendo a ultima", newStop)
                    if (newStop == -1) {
                        console.log(`new stop is invalid`, newStop)
                    }
                }
            }
            console.log(newStop, "cambio")
            changeSelectedId(stops.find((stop) => stop.lines.find((line) => line.name == selectedLine && line.order == newStop))?.id ?? "0")
            console.log(selectedStop)
            changeFocus()
            
        } else {
            console.log("No hay linea seleccionada")
        }
    } 
    return (
        <View style={style.container}>
            <MapViewer ref={mapRef} setStop={(stopId) => changeSelectedId(stopId)} selectedLine={selectedLine} />
            <View style={style.ui}>
                <Button onPress={() => setSelectedLine(null)} label={selectedLine ?? "No selected line"} />
                <View style={style.bottomRow}>
                    <Arrow onPress={() => changeStop(-1)} icon="arrow-back" />
                    <CenterButton onPress={() => setSelectedLine("A - BEI A / BOULEVARD")} label={selectedStop ? selectedStop.name : "No selecionado"} />
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