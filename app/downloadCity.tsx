import { useData } from '@/context/DataContext'
import { processGtfs } from '@/hooks/processGtfs'
import { Directory, File, Paths } from 'expo-file-system'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { unzip } from 'react-native-zip-archive'


export default function DownloadCity() {
    const { loadCity } = useData()

    

    const [state, setState] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useLocalSearchParams()

    const [givenName, setGivenName] = useState(`${id}`)

    const router = useRouter()

    const apiKey = process.env.EXPO_PUBLIC_TRANSIT_LAND_API_KEY

    const url = `https://transit.land/api/v2/rest/feeds/${id}/download_latest_feed_version?apikey=${apiKey}`
    
    
    const cleanId = (texto: string) => {
      return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, '_') 
        .substring(0, 20); 
    }

    const download = async () => {
      try {
        setState("Downloading the zip")
        const zipFolder = new Directory(Paths.cache, 'zip')
        if (zipFolder.exists) {
          await zipFolder.delete()
        }
        

        zipFolder.create()
        const zip = new File(zipFolder, 'dowloaded')

        const data = await File.downloadFileAsync(url, zip)
        
        const gtfsFolder = new Directory(Paths.cache, 'gtfs')

        if (gtfsFolder.exists) {
          await gtfsFolder.delete()
        }
        gtfsFolder.create()
        setState("Unziping")


        const gtfs = await unzip(data.uri, gtfsFolder.uri)
        setState("Importing")

        

        const safeName = cleanId(`${givenName}`)
        
        const {isSuccessful, err} = await processGtfs(gtfs, safeName)
        
        if (!isSuccessful) {
          throw new Error(err)
        }

        setState("Succes")

        const newFile = new File(Paths.document, 'downloadedCities', `${safeName}.json`)
        
        await loadCity(safeName)

        console.log(newFile.textSync())
        console.log(newFile, 'esto si')

        console.log("exito", gtfs)

        await zipFolder.delete()
        await gtfsFolder.delete()

        setIsLoading(false)

        router.push('/')

      } catch (err) {
        console.log(err)
        console.error("No, this way nop")
        setState(`${err}`)
      }
    }

    const startDownload = () => {
      if (givenName.length <= 3) {
        Alert.alert('Minimum of 3 liters is required')
      } else {
        download()
        setIsLoading(true)
      }
    }

    return (
        <View style={style.container}>
          {isLoading === false ? 
          <View>
            <Text style={style.text}>Which name do you want to give it?</Text>
            <TextInput style={style.searchBar} value={givenName} onChangeText={(newText) => setGivenName(newText)}></TextInput>
            <Text style={style.bottomText}>{`It will be saved as: ${cleanId(givenName)}.json`}</Text>
            <TouchableOpacity style={style.mainButton} onPress={startDownload}><Text>Download</Text></TouchableOpacity>
            
          </View>
          : 
          <View style={style.mainUi}>
            <Text style={style.status}>{state}</Text>
            <ActivityIndicator size={'large'} />
          </View>
          }
        </View>
    )
}

const style = StyleSheet.create({
    status: {
      marginTop: 20,
      fontWeight: 'bold',
      color: '#b2b2b2',
      marginBottom: 5
    },
    container: {
        backgroundColor: '#F8F9FA',
        flex: 1,
        padding: 20,
    },
    mainUi: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'left',
        color: '#2d2d2d',
        fontWeight: 'bold',
        marginHorizontal: 15
    },
    bottomText: {
        marginHorizontal: 20,
        color: '#ababab'
        
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        margin: 15,
        borderColor: '#007396'
        
    },
  mainButton: {
    height: 65,
    width: '85%',
    alignSelf: 'center',
    marginHorizontal: 60,
    marginVertical: 20,
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
  },
  cityContainer: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10
  },
  cityName: {
    fontWeight: 'bold'
  },
  cityId: {

  }
})