import { useState } from "react"
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
export default function citySelector() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")

    const apiKey = process.env.EXPO_PUBLIC_TRANSIT_LAND_API_KEY

    const getCities = async () => {
        try {
            const response = await fetch(`https://transit.land/api/v2/rest/feeds?apikey=${apiKey}&search=${search}`)
            const json = await response.json()
            setData(json)
            console.log(json)
        }   catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const chageSearch = (text: string) => {
        setSearch(text)
    }

    return (
        <View style={style.container}>
            <TextInput style={style.searchBar} value={search} onChangeText={(text) => chageSearch(text)} placeholder="Buscar ciudad" underlineColorAndroid="transparent"></TextInput>
            {search.length < 3 ? 
            <View style={style.mainUi}>
                <View style={style.aplogizeText}>
                    <Text style={style.text}>Please, write at least 3 letters</Text>
                    <Text>Sorry for the inconvinience, but we run in a limited api usage. This is done like this to avoid doing a lot of api calls</Text>
                </View>
            </View>
            : 
            <View style={style.mainUi}>
                <TouchableOpacity style={style.mainButton} onPress={getCities}>
                <Text>Search {search}</Text>
                </TouchableOpacity>
                <Text>Loading...</Text>
                <ActivityIndicator />
            </View>
            }
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#F8F9FA',
        flex: 1,
        padding: 20
    },
    mainUi: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#c1c1c1',
        fontWeight: 'bold'
    },
    aplogizeText: {
        marginHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        margin: 15,
        borderColor: '#007396'
        
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