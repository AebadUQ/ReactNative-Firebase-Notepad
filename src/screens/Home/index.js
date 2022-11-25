import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Dimensions, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
const { width, height } = Dimensions.get("screen")
export default function Home() {

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar
        animated={true}
        backgroundColor={"#ffffff"}
        barStyle="dark-content"
      />

      <ScrollView>
        <View>
          <Text style={styles.topHeading}>Welcome Back!</Text>
        </View>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>

            <TouchableOpacity style={[styles.card, { backgroundColor: '#d3ece8' }]}>
              <View style={styles.subCardOne}>
                <Image
                  source={require('../../assets/food.png')}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardText, { color: '#28a197' }]}>Food</Text>

              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.card, { backgroundColor: '#fef1ce' }]}>
              <View style={styles.subCardOne}>
                <Image
                  source={require('../../assets/cloths.png')}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardText, { color: '#bf8e92' }]}>Cloths</Text>

              </View>
            </TouchableOpacity>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
            <TouchableOpacity style={[styles.card, { backgroundColor: '#fdd4d7' }]}>
              <View style={styles.subCardOne}>
                <Image
                  source={require('../../assets/others.png')}
                  style={{
                    alignSelf: 'center',


                  }}
                />
              </View>
              <View style={{ flex: 1, backgroundColor: '#fdd4d7', borderBottomLeftRadius: 25, borderBottomRightRadius: 25 }}>

                <Text style={[styles.cardText, { color: '#DCA3A8' }]}>Others</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textTransform: 'uppercase', fontSize: 15, fontWeight: '600' }}>Today</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textTransform: 'uppercase', fontSize: 15, textAlign: 'right', color: '#404f4f', fontWeight: 'bold' }}>View all</Text>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10,}}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                source={require('../../assets/circle.png')}
                style={{
                  alignSelf: 'center',
                  marginRight:10

                }}
              /></View>
            <View style={styles.todayText}><Text >Spent $200 at Burget Lab</Text></View>

          </TouchableOpacity>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10,}}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                source={require('../../assets/circle.png')}
                style={{
                  alignSelf: 'center',
                  marginRight:10

                }}
              /></View>
            <View style={styles.todayText}><Text >Spent $200 at Lucky one</Text></View>

          </TouchableOpacity>
          <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', padding: 10,}}>
            <View style={{ justifyContent: 'center' }}>
              <Image
                source={require('../../assets/circle.png')}
                style={{
                  alignSelf: 'center',
                  marginRight:10

                }}
              /></View>
            <View style={styles.todayText}><Text >Kitchen accessories</Text></View>

          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      padding: 10
    },
    topHeading: {
      marginTop: 10,
    
      fontSize: 32,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: 10
    },
    card: {
      width: 165,
      height: 140,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: 25, borderBottomRightRadius: 25,
      backgroundColor: 'white',

    },
    subCardOne: {
      flex: 4,
      display: 'flex',
      justifyContent: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    cardText: {
      fontWeight: 'bold', textAlign: 'center'
    },
todayText:{
  justifyContent:'center',flex:1,borderWidth:1,borderBottomColor:'#b9bcbc',borderLeftColor:'white',borderRightColor:'white',borderTopColor:'white',paddingBottom:10
}


  }
)