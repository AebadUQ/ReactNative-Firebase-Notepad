import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Dimensions, FlatList, TouchableOpacity, Image ,ScrollView} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker'
import Moment from "moment-timezone";;
const { height, width } = Dimensions.get("screen")
export default function App() {
  const [note, setNote] = useState(null)
  const [list, setList] = useState([])
  
  const [isUpdateData, setIsUpdateData] = useState(false)
  const [selectedCardIndex, setSelectedCardIndex] = useState(null)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [food, setFood] = useState(false)
  const [cloths, setCloths] = useState(false)
  const [others, setOthers] = useState(false)
const [selectedDate,setSelectedDate]=useState()
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
            expense: note,
            date: selectedDate,
            food:food,
            cloth:cloths,
            other:others
            
          }

          );
          console.log(response)
          setNote(null)
          setSelectedDate(null)
          setFood(null)
          setCloths(null)
          setOthers(null)
        }
        else {

          const index = list.length

          const response = await database().ref(`notes/${index}`).set({
            expense: note,
            date: selectedDate,
            food:food,
            cloth:cloths,
            other:others
          }

          );
          console.log(response)
          setNote(null)
          setSelectedDate(null)
          setFood(null)
          setCloths(null)
          setOthers(null)
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
          expense: note,
          date:selectedDate,
          food:food,
          cloth:cloths,
          other:others
        })
        console.log(response)
        setNote(null)
        setIsUpdateData(false)
        setSelectedDate(null)
        setFood(null)
        setCloths(null)
        setOthers(null)
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
   
   console.log(cardValue?.date)
      setIsUpdateData(true)
      setSelectedCardIndex(cardIndex)
      setNote(cardValue?.expense)
      setSelectedDate(cardValue?.date)
      setFood(cardValue?.food)
      setCloths(cardValue?.cloth)
      setOthers(cardValue?.other)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCardLongPress = (cardIndex, cardValue) => {
    try {

      Alert.alert("Title", `Are your sure you want to delete ${cardValue?.expense} ?`, [

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
  console.log("selected date", selectedDate)
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <Text style={{    marginTop: 10,
     
      fontSize: 32,
      fontWeight: 'bold',
      marginLeft: 10,
      marginBottom: 10 }}>Add Notes</Text>
        <TextInput style={styles.inputBox} placeholder="Enter Expense" value={note} onChangeText={(e) => setNote(e)} placeholderTextColor="#A0A0A0" color="#A0A0A0"/>
        <TouchableOpacity onPress={() => setOpen(true)} style={{ borderWidth: 1, borderColor: '#7e8d8b', height: 50, borderRadius: 5, justifyContent: 'center', paddingLeft: 10 }} >
          <Text style={{ color: '#A0A0A0' }}>{selectedDate ? Moment.tz(selectedDate,"Asia/Karachi").format("Do-MMM-YY")  :"Select Date"}</Text>

        </TouchableOpacity>
        <DatePicker
          maxDate={new Date()}
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
            setSelectedDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
          title="Select Date"
          textColor='#7e8d8b'

        />
        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
          <View style={{  display: 'flex', flexDirection: 'row',marginRight:5 }}>
            <View>
              <CheckBox
                disabled={false}
                value={food }
                onValueChange={(newValue) => setFood(newValue)}

              />
            </View>
            <View style={{justifyContent:'center'}}>
              <Text >Food</Text>
            </View>
          </View>
          <View style={{  display: 'flex', flexDirection: 'row',marginRight:5 }}>
            <View>
              <CheckBox
                disabled={false}
                value={cloths}
                onValueChange={(newValue) => setCloths(newValue)}

              />
            </View>
            <View style={{justifyContent:'center'}}>
              <Text >Cloths</Text>
            </View>
          </View>

          <View style={{  display: 'flex', flexDirection: 'row',marginRight:5 }}>
            <View>
              <CheckBox
                disabled={false}
                value={others}
                onValueChange={(newValue) => setOthers(newValue)}

              />
            </View>
            <View style={{justifyContent:'center'}}>
              <Text >Other</Text>
            </View>
          </View>
        </View>
        

        {!isUpdateData ?
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddData()}>
            <Image
              source={require('../../assets/add.png')} />
            <Text style={{ color: '#7e8d8b', fontWeight: 'bold', marginLeft: 5, textTransform: 'uppercase' }}>Add</Text>
          </TouchableOpacity> :
          <TouchableOpacity style={styles.addButton} onPress={() => handleUpdateData()}>
            <Image
              source={require('../../assets/updating.png')} />
            <Text style={{ color: '#7e8d8b', fontWeight: 'bold', marginLeft: 5, textTransform: 'uppercase' }}>Update</Text>
          </TouchableOpacity>

        }
      </View>

      <ScrollView style={styles.cardCont} showsVerticalScrollIndicator={false}>
        <FlatList
          data={list}
          renderItem={(item) => {
            console.log(item)
            if (item.item !== null) {
              console.log(item)
              const cardIndex = item.index
              return (
            
                <TouchableOpacity style={styles.card}
                  onPress={() => handleCardPress(cardIndex, item.item)}
                 
                  onLongPress={() => { handleCardLongPress(cardIndex, item.item) }}

                >
                  <Text style={{ color: 'black', height: 30, textAlignVertical: 'center',width:'100%' ,color:'#7e8d8b',fontWeight:'600'}}>{item.item.expense}</Text>
                  <Text style={{ color: 'black', height: 30, textAlignVertical: 'center',textAlign:'right',width:'100%',color:'#A0A0A0' }}>{Moment.tz(item.item.date,"Asia/Karachi").format("Do-MMM-YY")}</Text>
                </TouchableOpacity>
              )
            }
          }}
        />

      </ScrollView>

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
      borderRadius: 5,
      borderWidth: 1,
      marginTop: 10,
      padding: 10,
      marginVertical: 10,
      borderColor: '#7e8d8b'
    },
    addButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#deecea',
      alignItems: 'center',
      padding: 15,
      borderRadius: 5
    },
    cardCont: {
      marginVertical: 20,

    },
    card: {
      backgroundColor: 'white',
      width: width *0.9,
      margin:10,
      height: 50,
      paddingTop: 30,
      paddingBottom:30,
      paddingHorizontal:5,
      borderRadius: 10,
      marginVertical: 10,
      justifyContent: 'center',

    }
  }
)