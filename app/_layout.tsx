import { DataProvider } from "@/context/DataContext";
import { Stack } from "expo-router";
/*
export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown: false}} />
  </Stack>
);
}

*/

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="stopSelector" options={{headerShown: false}}/>
        <Stack.Screen name="citySelector" options={{title: 'Select your city'}}/>
        <Stack.Screen name="downloadCity" options={{title: 'Downloading your city', }}/>
        <Stack.Screen name="alarm" options={{title: 'Set alarm'}} />
    </Stack>
    </DataProvider>
    
  )
}