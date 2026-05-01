import { DataProvider } from "@/context/DataContext";
import { Stack } from "expo-router";

import { Directory, File, Paths } from "expo-file-system";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";
import { View } from "react-native";


SplashScreen.preventAutoHideAsync()



export default function RootLayout() {

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    async function importGtfs() {
      try {
        const folder = new Directory(Paths.document, 'downloadedCities')
        if (!folder.exists) {folder.create()}

        const assets = require.context('../assets/cities', false)

        for (const key of assets.keys()) {
          const destinationFile = new File(folder, key.replace('./', ''))

          if (!destinationFile.exists) {
            console.log("Start coping", key)
            destinationFile.create()

            destinationFile.write(JSON.stringify(assets(key)))

          }
        }

        console.log("Succes")
      } catch (err) {
        console.error(err, 'migrating')
      } finally {
        setIsReady(true)
      }
    }
    importGtfs()
  }, [])

  const onLayout = () => {
    if (isReady) SplashScreen.hide()
  }

  if (!isReady) return null

  return (
    <View style={{flex: 1}} onLayout={onLayout}>
      <DataProvider>
        <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="stopSelector" options={{headerShown: false}}/>
            <Stack.Screen name="citySelector" options={{title: 'Select your city'}}/>
            <Stack.Screen name="downloadCity" options={{title: 'Downloading your city', }}/>
            <Stack.Screen name="alarm" options={{title: 'Set alarm'}} />
        </Stack>
      </DataProvider>
    </View>
    
    
  )
}