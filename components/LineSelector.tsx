
import { Stop, useData } from '@/context/DataContext'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native"




function obtainLines(stops: Stop[]) {

    const repitedLines = stops.flatMap(stop => stop.lines)

    const unicLines = []
    const seenNames = new Set()

    for (const line of repitedLines) {
        if (!seenNames.has(line.name)) {
            seenNames.add(line.name)
            unicLines.push(line)
        }
    }
    return unicLines
}

type Props = {
    selectedLine: string,
    setLine: (line: string) => void
}

export default function LineSelector ({selectedLine, setLine}: Props) {
    const {stops, loading} = useData()


    //if (loading || !stops) return <ActivityIndicator />


    const lines = obtainLines(stops)
 //   console.log(lines)
    return (
        <ScrollView
            
            showsHorizontalScrollIndicator={false}
            style={style.container}
            contentContainerStyle={style.content}
        >
            {
                lines.map((line) => (
                    <TouchableOpacity 
                        key={line.name}
                        onPress={() => setLine(line.name)}
                        style={[
                            style.pill, 
                            { borderColor: line.color },
                            selectedLine === line.name && { backgroundColor: line.color }
                        ]}
                    >
                        <Text style={[
                            style.text, 
                            { color: line.color },
                            selectedLine === line.name && { color: '#fff' }
                        ]}>
                            {line.name}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const style = StyleSheet.create({
  container: {
    maxHeight: 300,
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    bottom: 200,
    zIndex: 10,
    borderRadius: 5 
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 2,
    height: 40,
    width: '100%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activePill: {
    backgroundColor: '#333',
    borderColor: '#333',
  },
  text: {
    fontWeight: 'bold',
  },
  activeText: {
    color: '#fff',
  }
})