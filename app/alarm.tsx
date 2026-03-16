import { useLocation } from "@/hooks/useLocation";
import { getDistanceInMeters } from "@/utils/distance";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createAudioPlayer } from 'expo-audio';
import * as Notifications from 'expo-notifications';
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Alarm() {
    const {id, stopName, lineName, lineColor, order, shortName, lat, lon} = useLocalSearchParams()
    const {location, errorMsg} = useLocation()
    const [activeAlarm, setActiveAlarm] = useState(false)

    if (errorMsg) return <View><Text>{errorMsg}</Text></View>
    if (!location) return <View><Text>Getting location</Text></View>

    const triggerWakeUp = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Wake up!',
                body: `You are arriving at ${stopName}`,
                sound: true,
                priority: 'max'
            }, trigger: null
        })

        const player = createAudioPlayer(require('@/assets/alarm.mp3'))
        player.play()
        setActiveAlarm(false)
        console.log("Alarm activated")
    }

    if (activeAlarm) {
        const distance = getDistanceInMeters(location.coords.latitude, location.coords.longitude, parseFloat(Array.isArray(lat) ? lat[0] : lat), parseFloat(Array.isArray(lon) ? lon[0] : lon))

        if (distance < 80) {
            triggerWakeUp()
        }
    }

    

    return (
        <View style={style.container}>
            <View style={style.ui}>
                <View style={style.header}>
                    <View style={[style.line, {backgroundColor: (Array.isArray(lineColor) ? lineColor[0] : lineColor) || '#007aff'}]}>
                        <Text style={style.lineText}>{shortName || '?'}</Text>
                    </View>
                    <Text style={style.stopTitle}>{stopName || 'Selected stop'}</Text>
                    <Text style={style.lineSubtitle}>{lineName || 'Line'}</Text>
                </View>
            </View>

            <View style={style.mainCircleContainer}>
                <View style={[style.outerCircle, {borderColor: lineColor + '33'}]}>
                    <View style={[style.innerCircle, {backgroundColor: '#fff'}]}>
                        <Text style={style.orderText}>Meters</Text>
                        <Text style={style.orderNumber}>{getDistanceInMeters(location.coords.latitude, location.coords.longitude, parseFloat(Array.isArray(lat) ? lat[0] : lat), parseFloat(Array.isArray(lon) ? lon[0] : lon))}</Text>
                    </View>
                </View>
            </View>

        <TouchableOpacity style={[style.mainButton, {backgroundColor: (Array.isArray(lineColor) ? lineColor[0] : lineColor) || '#007aff'}]} onPress={() => setActiveAlarm(true)}>
            <Ionicons name="notifications-outline" size={24} color={'#fff'} />
            {!activeAlarm ? <Text style={style.mainButtonText}>Wake me up!</Text> : <Text style={style.mainButtonText}>Alarm activated</Text>}
        </TouchableOpacity>

        </View>
    )
}



const style = StyleSheet.create({   
    container: {
        backgroundColor: '#F8F9FA',
        flex: 1,
    },
    ui: {
        flex: 1,
        marginVertical: 40,
        paddingHorizontal: 25,
        paddingBottom: 40,
        justifyContent: 'space-between'
    },
    line: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    lineText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 900
    },
    header: {
        alignItems: 'center',
        marginTop: 10
    },
    stopTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    lineSubtitle: {
        fontSize: 16,
        marginTop: 5
    },
    mainCircleContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    outerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3ea87f'
  },
  orderText: {
    fontSize: 14
  },
  orderNumber: {
    fontSize: 40,
    fontWeight: 900
  },
  mainButton: {
    height: 65,
    marginHorizontal: 20,
    marginVertical: 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,

  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10
  }
})