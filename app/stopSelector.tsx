import { Arrow } from "@/components/arrow";
import { Button } from "@/components/Button";
import { CenterButton } from "@/components/CenterButton";
import MapViewer from "@/components/mapViewer";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function stopSelecter() {
    const [selectedStop, setSelectedStop] = useState(null)
    const [selectedLine, setSelectedLine] = useState(null)


    return (
        <View style={style.container}>
            <MapViewer />
            <View style={style.ui}>
                <Button label="Hola" />
                <View style={style.bottomRow}>
                    <Arrow icon="arrow-back" />
                    <CenterButton label="Que pasa" />
                    <Arrow icon="arrow-forward" />
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