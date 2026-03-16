import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    label: string,
    onPress: () => void
}

export default function ContinueButton({label, onPress}: Props) {


    return (
        <View style={style.contatiner}>
            <Pressable style={style.button} onPress={onPress}>
                <Text style={style.text}>{label}</Text>
                <MaterialIcons name="arrow-forward" size={16} color='#fff'/>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    contatiner : {
        position: 'absolute',
        bottom: 190,
        width: 200,
        height: 45,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        borderRadius: 20,
        backgroundColor: '#3cd5ff',
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
        color: '#ffffff'
    }
})