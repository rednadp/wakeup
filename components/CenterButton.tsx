import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    label: string
}

export function CenterButton({label}: Props) {


    return (
        <View style={style.contatiner}>
            <Pressable style={style.button} onPress={() => {alert("Pulsado")}}>
                <Text style={style.text}>{label}</Text>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contatiner : {
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
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
    },
    text: {
        fontSize: 16,
        color: '#ff5b5b'
    }
})