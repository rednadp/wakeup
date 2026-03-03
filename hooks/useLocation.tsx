import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    useEffect(() => {
        async function getPermissions() {
            let {status} = await Location.requestBackgroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMsg("Location permission denied, we cannot located you")
                return
            }

            let location = await Location.getCurrentPositionAsync({})

            setLocation(location)

            const subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10
                },
                (newLocation) => {
                    setLocation(newLocation)
                }
            )

            return () => {
                if (subscriber) subscriber.remove()
            }
        }
        getPermissions()
    }, [])
    return {location, errorMsg}
}