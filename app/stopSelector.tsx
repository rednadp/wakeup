import { Button } from "@/components/Button";
import MapViewer from "@/components/mapViewer";
import { StyleSheet, View } from "react-native";

export default function stopSelecter() {
    return (
        <View style={style.container}>
            <MapViewer />
            <View style={style.ui}>
                <Button label="Hola" />
                <Button label="Que pasa" />
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
        alignItems: 'center'
    }
})