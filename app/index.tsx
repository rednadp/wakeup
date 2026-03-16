import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    
    

    return (
        <View style={style.container}>
        <Text style={style.text}>Wake up</Text>
        <Link asChild href='/stopSelector'>
            <TouchableOpacity style={style.mainButton}>
                <Ionicons name="arrow-forward" size={24} color={'#fff'} />
                <Text style={style.mainButtonText}>Select stop</Text>
            </TouchableOpacity>  
        </Link>
        </View>
    )
}



const style = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FA',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20

    },
    text: {
        fontSize: 68,
        fontWeight: '900',
        justifyContent: 'center',
        alignItems: 'center'
    },
  mainButton: {
    height: 65,
    width: '85%',
    alignSelf: 'center',
    marginHorizontal: 60,
    marginVertical: 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#ff9a60'
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 10
  }
})