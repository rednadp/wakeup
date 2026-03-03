import { StyleSheet, Text, View } from "react-native";

export default function About() {
    return(
        <View>
            <Text style={styles.container}>Hola</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: '#aaa'
    }
})