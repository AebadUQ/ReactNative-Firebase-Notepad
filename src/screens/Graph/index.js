import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Dimensions, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
const { width, height } = Dimensions.get("screen")
import { PieChart } from "react-native-svg-charts";
import database from '@react-native-firebase/database';
import Moment from "moment-timezone";;

export default function Home() {
    const [list, setList] = useState([])
    const [date, setDate] = useState(new Date())
    var today = new Date();
    let currentMonth = Moment.tz(today, "Asia/Karachi").format("MMM")
    console.log("currentDate",currentMonth)
  
    useEffect(() => {
        getDatabase()
    }, [])


    const getDatabase = async () => {
        try {
            const data = await database().ref('notes').on("value", (tempData) => {
                setList(tempData.val())
            })

        }
        catch (err) {
            console.log(err)
        }
    }
    const todayData = list?.filter(x =>Moment.tz(x?.date, "Asia/Karachi").format("MMM") === currentMonth )
    
    const food = todayData?.filter(x =>x?.food === true )
    const cloths = todayData?.filter(x =>x?.cloth === true )
    
    const others = todayData?.filter(x =>x?.other === true )
    console.log(todayData.length)
    console.log(cloths.length)
    console.log( todayData)
    const pieChartData = [
        {
            key: 1,
            amount: food.length,
            svg: { fill: "#002f49" },
        },
        {
            key: 2,
            amount: cloths.length,
            svg: { fill: "#108ab1" },
        },
        {
            key: 3,
            amount:others.length,
            svg: { fill: "#f67f00" },
        },

    ];
    const ChartsUsersLabelComponent = () => {
        return (
            <View >
                <View style={styles.chartLegendsColumn}>
                    <View style={[styles.chartLegendsText]}>
                        <View
                            style={[styles.circle, { backgroundColor: "#133f57" }]}
                        ></View>

                        <Text style={styles.txtMile}>{`Food`} {(food.length/todayData.length)*100}%</Text>
                    </View>

                </View>

                <View style={styles.chartLegendsColumn}>
                <View style={[styles.chartLegendsText]}>
                        <View
                            style={[styles.circle, { backgroundColor: "#108ab1" }]}
                        ></View>

                        <Text style={styles.txtMile}>{`Cloths`} {(cloths.length/todayData.length)*100}%</Text>
                    </View>
                    


                </View>
                <View style={styles.chartLegendsColumn}>
                <View style={[styles.chartLegendsText]}>
                        <View
                            style={[styles.circle, { backgroundColor: "#f67f00" }]}
                        ></View>

                        <Text style={styles.txtMile}>{`Others`} {(others.length/todayData.length)*100}%</Text>
                    </View>
                </View>
                </View>
        );
    };
    return (
        <SafeAreaView style={styles.container} >
            <StatusBar
                animated={true}
                backgroundColor={"#ffffff"}
                barStyle="dark-content"
            />

            <ScrollView>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <PieChart
                            style={{ height: 150, width: '100%' }}
                            valueAccessor={({ item }) => item.amount}
                            data={pieChartData}
                        >

                        </PieChart>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ChartsUsersLabelComponent />
                    </View>
                </View>

                
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        card: {
            padding: 20,
            borderWidth: 1,
            borderColor: "#e4e6e5",
            margin: 20,
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
        },
        txtHeading: {
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
        },
        txtPara: {
            fontSize: 12,
            fontWeight: "700",
            textAlign: "center",
        },
        logoImg: {
            width: 20,
            height: 20,
            alignSelf: "center",
        },
        chartLegendsColumn: {
            alignItems: "center",
            flexDirection: "row",
            width: "100%",


            marginTop: 5,
        },
        chartLegendsText: {
            flexDirection: "row",

            flex: 1,
            paddingLeft: '10%'
            // justifyContent:'center'
        },
        txtMile: {
            fontSize: 14,
        },
        circle: {
            height: 18,
            width: 18,
            borderRadius: 36,
            marginRight: 10,
        },

    }
)