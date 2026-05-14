import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    let subscriber: Location.LocationSubscription | null = null

    async function startGettingLocation() {
        

        async function getPermissions() {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync()

            if (status !== 'granted') {
                setErrorMsg("Foregound Location permission denied, we cannot located you")
                return
            }

            let backgoundStatus = await Location.requestBackgroundPermissionsAsync()

            if (backgoundStatus.status !== 'granted') {
                setErrorMsg("Backgound location denied")
            }

            let location = await Location.getCurrentPositionAsync({})
            console.log(location)

            setLocation(location)
            } catch (error) {
                setErrorMsg(`${error}`)
                console.log(error)
            }
            

            subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10
                },
                (newLocation) => {
                    setLocation(newLocation)
                }
            )

            
        }
        getPermissions()
        
    }

    function resetLocation () {
        if (subscriber) subscriber.remove()
        setLocation(null)
        setErrorMsg(null)
    }

    useEffect(() => {
        return () => {
            if (subscriber) subscriber.remove()
        }
    }, [])

    return {location, errorMsg, startGettingLocation, resetLocation}
}