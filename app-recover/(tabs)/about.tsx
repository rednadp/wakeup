import { StyleSheet, Text, View } from "react-native";

export default function About() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Hola</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: '#aaa',
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    text: {
        color: '#fff'
    }
})