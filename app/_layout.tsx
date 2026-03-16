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
    <Stack>
      <Stack.Screen name="stopSelector" options={{headerShown: false}}/>
      <Stack.Screen name="Alarm" options={{title: 'Set alarm'}} />
    </Stack>
  )
}