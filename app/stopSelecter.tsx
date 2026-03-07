import { Button } from "@/components/button";
import MapViewer from "@/components/mapViewer";
import { StyleSheet, View } from "react-native";

export function stopSelecter() {
    return (
        <View>
            <MapViewer />
            <Button label="Hola" />
        </View>
    )
}

const style = StyleSheet.create({
    constainer: {

    }
})