import stops from '@/assets/stopsv2.json';
import { Arrow } from "@/components/arrow";
import { Button } from "@/components/Button";
import { CenterButton } from "@/components/CenterButton";
import ContinueButton from '@/components/ContinueButton';
import LineSelector from '@/components/LineSelector';
import MapViewer from "@/components/mapViewer";
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from 'react-native-maps';

export default function stopSelecter() {
    const [selectedStopId, setSelectedStopId] = useState<string>("0")
    const [selectedLine, setSelectedLine] = useState<null | string>(null)
    const [isLineSelectorVisible, setIsLineSelectorVisible] = useState(false)
    const router = useRouter()
    const [forceUpdate, setForceUpdate] = useState(0)

    

    const selectedStop = useMemo(() => {
        console.log("Valor actualizado")
        return stops.find((stop) => stop.id == selectedStopId)
    }, [selectedStopId])

    useEffect(() => {
        changeFocus()
    }, [selectedStopId, selectedLine, forceUpdate])


    const mapRef = useRef<MapView>(null)

    const updateLine = () => {
//        if (selectedStop?.lines.find((line) => line.name == newLine) == undefined) {
//            setSelectedStopId("0")    
//        }
        if (selectedStopId == "0") {
            setForceUpdate(forceUpdate + 1)
        } else {
            setSelectedStopId("0")
        }
        
    }

        const changeFocus = () => {
            console.log(selectedStop, "EPA")
            if (selectedLine != undefined && selectedStop != undefined) {
                console.log("NOP")
                mapRef.current?.animateToRegion({
                    latitude: selectedStop?.lat,
                    longitude: selectedStop?.lon,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }, 1000)
            } else {
                let lineStops = stops.filter((stop) => stop.lines.find((line) => line.name == selectedLine)).map((stop) => stop.id)
                console.log(lineStops)
                setTimeout(() => { // This is quite strange but  works :)
                    mapRef.current?.fitToSuppliedMarkers(lineStops, {edgePadding : {
                        top: 50, left: 50, right: 50, bottom: 50
                    }})
                }, 150)
                
            }
        }

    function changeStop(addition: number) {
    /*
mapRef.current?.fitToSuppliedMarkers([stop], {edgePadding: {
            top: 100, left: 100, right: 100, bottom: 100
        },
        animated: true
    */
        


        

        if (selectedLine != null) {
            let newStop: number
            console.log(selectedStop, "linea", selectedLine, "id", selectedStopId)
            if (selectedStop != undefined) {
                newStop = (selectedStop?.lines.find((line) => line.name == selectedLine)?.order ?? 0) + addition
            } else {
                if (addition > 0) {
                    newStop = 1
                } 
                else if (addition < 0) {
                    console.log(stops.filter((stop) => stop.lines.filter((line) => line.name == selectedLine)))
                    let lineStops = stops.filter((stop) => stop.lines.find((line) => line.name == selectedLine))
                    newStop = Math.max(...lineStops.map((stop) => {return (stop.lines.find((line) => line.name == selectedLine)?.order ?? 0)}))
                    // newStop = (stops.filter((stop) => stop.lines.find((line) => line.name == selectedLine))?.length ?? -2) + 1
                    console.log("Yendo a ultima", newStop)
                    if (newStop == -1) {
                        console.log(`new stop is invalid`, newStop)
                    }
                } else {
                    newStop = 0
                }
            }
            console.log(newStop, "cambio")
            setSelectedStopId(stops.find((stop) => stop.lines.find((line) => line.name == selectedLine && line.order == newStop))?.id ?? "0")
            console.log(selectedStop)
            
        } else {
            console.log("No hay linea seleccionada")
        }
    } 
    return (
        <View style={style.container}>
            <MapViewer ref={mapRef} setStop={(stopId) => setSelectedStopId(stopId)} selectedLine={selectedLine} />
            {isLineSelectorVisible && <LineSelector selectedLine={selectedLine ?? "No selected line"} setLine={(line) => {setSelectedLine(line); setIsLineSelectorVisible(false); updateLine()}} />}
            {(!isLineSelectorVisible && selectedStop) && <ContinueButton label='Select ' onPress={() => router.push({pathname: '/alarm', params: {id: selectedStop?.id, stopName: selectedStop?.name, shortName: selectedStop?.lines.find((line) => line.name == selectedLine)?.shortName, lineColor: selectedStop?.lines.find((line) => line.name == selectedLine)?.color, lineName: selectedLine, order: selectedStop?.lines.find((line) => line.name == selectedLine)?.order, lat: selectedStop?.lat, lon: selectedStop?.lon}})}/>}
            <View style={style.ui}>
                <Button onPress={() => setIsLineSelectorVisible((isLineSelectorVisible ? false: true))} label={selectedLine ?? "No selected line"} />
                <View style={style.bottomRow}>
                    <Arrow onPress={() => changeStop(-1)} icon="arrow-back" />
                    <CenterButton onPress={() => null} label={selectedStop ? selectedStop.name : "No selecionado"} />
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