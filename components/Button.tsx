import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    label: string
}

export function Button({label}: Props) {


    return (
        <View>
            <Pressable onPress={() => {alert("Pulsado")}}>
                <Text>Touch me</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({

})