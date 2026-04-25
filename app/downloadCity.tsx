import { processGtfs } from '@/hooks/processGtfs'
import { Directory, File, Paths } from 'expo-file-system'
import { useLocalSearchParams } from "expo-router"
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { unzip } from 'react-native-zip-archive'


export default function downloadCity() {
    const [state, setState] = useState("")
    const {id} = useLocalSearchParams()


    const apiKey = process.env.EXPO_PUBLIC_TRANSIT_LAND_API_KEY

    const url = `https://transit.land/api/v2/rest/feeds/${id}/download_latest_feed_version?apikey=${apiKey}`
    
    
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

        const cleanId = (texto: string) => {
          return texto
            .toLowerCase()
            .normalize("NFD") // Separa las tildes de las letras
            .replace(/[\u0300-\u036f]/g, "") // Borra las tildes
            .replace(/[^a-z0-9]/g, '_') // Cambia cualquier cosa que no sea letra o número por "_"
            .substring(0, 20); // Lo cortamos para que no sea infinito
        }

        const safeId = cleanId(`${id}`)
        

        await processGtfs(gtfs, safeId) // Works :)

        setState("Succes")

        const newFile = new File(Paths.document, 'downloadedCities', `${safeId}.json`)
        
        console.log(newFile.textSync())
        console.log(newFile, 'esto si')

        console.log("exito", gtfs)

        await zipFolder.delete()
        await gtfsFolder.delete()

      } catch (err) {
        console.log(err)
        console.error("No, this way nop")
        setState(`${err}`)
      }
    }

    return (
        <View>
          <TouchableOpacity style={style.mainButton} onPress={download}><Text>Download</Text></TouchableOpacity>
          <Text>{state}</Text>
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