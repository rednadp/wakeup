import { useData } from "@/context/DataContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
    const {selectedCity} = useData()
    
    const isCitySelected = () => {
        if (selectedCity === "") {
            return false
        } else {
            return true
        }
    }
    return (
        <View style={style.container}>
        <Text style={style.text}>Wake up</Text>
        <Link asChild href='/citySelector'>
            <TouchableOpacity style={style.selectedCity}>
                <Text style={style.selectedCityText}>{`Selected city: ${isCitySelected() ? selectedCity : "None"}`}</Text>
                <Ionicons name="settings" size={18} />
            </TouchableOpacity>
        </Link>
        {
            isCitySelected() ? 
            <Link asChild href={{pathname: '/stopSelector', params: {cityName: null}}}>
                <TouchableOpacity style={style.mainButton}>
                    <Ionicons name="arrow-forward" size={24} color={'#fff'} />
                    <Text style={style.mainButtonText}>Select stop</Text>
                </TouchableOpacity>  
            </Link> :
            <TouchableOpacity style={style.mainButton} onPress={() => Alert.alert("No city selected")}>
                <Ionicons name="arrow-forward" size={24} color={'#fff'} />
                <Text style={style.mainButtonText}>Select stop</Text>
            </TouchableOpacity>  
        }
        
        </View>
    )
}



const style = StyleSheet.create({
    selectedCity: {
        marginTop: 50,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedCityText: {
        marginRight: 5
    },
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