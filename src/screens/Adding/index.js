import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const { height, width } = Dimensions.get("screen")
export default function App() {
  const [note, setNote] = useState(null)
  const [list, setList] = useState([])
  const [myData, setMyData] = useState(null)
  const [myDataTwo, setMyDataTwo] = useState(null)
  const [isUpdateData, setIsUpdateData] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
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
  const handleAddData = async () => {
    try {
      if (note.length > 0) {
        if (!list) {

          const response = await database().ref(`notes/${1}`).set({
            value: note
          }

          );
          console.log(response)
          setNote(null)

        }
        else {

          const index = list.length

          const response = await database().ref(`notes/${index}`).set({
            value: note
          }

          );
          console.log(response)
          setNote(null)
        }


      }
      else {
        alert("Enter value")
      }
    }
    catch (err) {
      console.log("error", err)
    }
  }
  console.log(list)
  const handleUpdateData = async () => {
    try {
      if (note.length > 0) {
        const response = await database().ref(`notes/${selectedCardIndex}`).update({
          value: note
        })
        console.log(response)
        setNote(null)
        setIsUpdateData(false)
      }
      else {
        alert("enter value")
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handleCardPress = (cardIndex, cardValue) => {
    try {

    } catch (error) {
      console.log(err)
    }
  }
  const handleCardLongPress = (cardIndex, cardValue) => {
    try {

      Alert.alert("Title", `Are your sure you want to delete ${cardValue} ?`, [

        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel is pressed")
          }
        },
        {
          text: "Ok",
          onPress: async () => {
            try {
              const response = await database().ref(`notes/${cardIndex}`).remove();
              console.log(response)
            } catch (error) {

            }
          }
        },
      ])

    } catch (error) {
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 24 }}>Add Notes</Text>
        <TextInput style={styles.inputBox} placeholder="Enter any value" value={note} onChangeText={(e) => setNote(e)} />

        {!isUpdateData ? <TouchableOpacity style={styles.addButton} onPress={() => handleAddData()}>
          <Text style={{ color: 'white' }}>Add</Text>
        </TouchableOpacity> :
          <TouchableOpacity style={styles.addButton} onPress={() => handleUpdateData()}>
            <Text style={{ color: 'white' }}>Update</Text>
          </TouchableOpacity>

        }
      </View>

      <View style={styles.cardCont}>
        <FlatList
          data={list}
          renderItem={(item) => {
            console.log(item)
            if (item.item !== null) {
              console.log(item)
              const cardIndex = item.index
              return (
                <TouchableOpacity style={styles.card}
                  onPress={() => handleCardPress(cardIndex, item.item.value)}
                  onLongPress={() => { handleCardLongPress(cardIndex, item.item.value) }}

                >
                  <Text style={{ color: 'black', height: 30, textAlignVertical: 'center', }}>{item.item.value}</Text>
                </TouchableOpacity>
              )
            }
          }}
        />

      </View>

    </View>
  )
}
const styles = StyleSheet.create(
  {
    container: {
      flex: 1, alignItems: 'center'
    },
    inputBox: {
      width: width - 30,
      borderRadius: 15,
      borderWidth: 2,
      marginTop: 10,
      padding: 10,
      marginVertical: 10
    },
    addButton: {
      backgroundColor: 'orange',
      alignItems: 'center',
      padding: 10
    },
    cardCont: {
      marginVertical: 20,

    },
    card: {
      backgroundColor: 'white',
      width: width - 40,
      height: 30,
      padding: 20,
      borderRadius: 30,
      marginVertical: 10,
      justifyContent:'center',
     
    }
  }
)