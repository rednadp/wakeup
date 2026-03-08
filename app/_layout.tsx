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
      <Stack.Screen name="stopSelector" />
    </Stack>
  )
}