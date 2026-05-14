import { useLocation } from "@/hooks/useLocation";
import { LocationObject } from "expo-location";
import { createContext, useContext } from "react";


interface DataContextType {
  errorMsg: string | null,
  location: LocationObject | null,
  startGettingLocation: () => Promise<void>,
  resetLocation: () => void
}

const DataContext = createContext<DataContextType>({
    errorMsg: null,
    location: null
} as DataContextType)


export const LocationProvider = ({children}: any) => {
    const {location, errorMsg, startGettingLocation, resetLocation} = useLocation()

    return (
        <DataContext.Provider value={{location, errorMsg, startGettingLocation, resetLocation}}>
            {children}
        </DataContext.Provider>
    )
}

export const useContextLocation = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useData must be used in a data provider')
        
        
    }
    return context
}

