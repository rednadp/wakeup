import { File, Paths } from "expo-file-system";
import { createContext, useContext, useState } from "react";


export interface TransitLine {
  name: string,
  shortName: string,
  color: string,
  order: number,
}


export interface Stop {
  id: string,
  name: string,
  lat: number,
  lon: number,
  lines: TransitLine[]
}

interface DataContextType {
  stops: Stop[],
  loadCity: (cityName: string) => Promise<void>,
  loading: boolean,
  selectedCity: string
}

const DataContext = createContext<DataContextType>({
    stops: [],
    loadCity: async () => {},
    loading: true,
    selectedCity: ""
} as DataContextType)

export const DataProvider = ({children}: any) => {
    const [stops, setStops] = useState<Stop[]>([])
    const [loading, setLoading] = useState(false)
    const [selectedCity, setSelectedCity] = useState("")

    const loadCity = async (cityName: string) => {
        setLoading(true)

        try {
            const file = new File(Paths.document, 'downloadedCities', `${cityName}.json`)
            if (file.exists) {
                const text = await file.text()
                setStops(JSON.parse(text))
                setSelectedCity(cityName)
            }
        } catch (err) {
            console.log(err, 'context error')

        } finally {
            setLoading(false)
        }

    }
    return (
        <DataContext.Provider value={{stops, loadCity, loading, selectedCity}}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error('useData must be used in a data provider')
        
        
    }
    return context
}