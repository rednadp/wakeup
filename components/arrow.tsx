import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, View } from "react-native"

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap
}

export function Arrow({icon}: Props) {


    return (
        <View style={style.contatiner}>
            <Pressable style={style.button} onPress={() => {alert("arrow")}}>
                <MaterialIcons name={icon} size={48} color="#fff" />
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contatiner : {
        width: 68,
        height: 68,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#25292e'
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    }
})