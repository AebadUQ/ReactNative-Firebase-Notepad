import {View,Text,TextInput,StyleSheet,StatusBar,Dimensions,FlatList, TouchableOpacity} from 'react-native';
import React , {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const {height,width} = Dimensions.get("screen")
export default function App(){
  const [note,setNote]=useState(null)
  const [list,setList]=useState(null)
  const [myData,setMyData]=useState(null)
  const [myDataTwo,setMyDataTwo]=useState(null)
  useEffect(()=>{
    getDatabase()
  },[])
  const getDatabase  =async()=>{
    try{
          const data =await database().ref('notes').on("value",(tempData)=>{
        setList(tempData.val()) 
      })

    }
    catch(err){
      console.log(err)
    } 
  }
  const handleAddData=async()=>{
    try{
      const index=list.length
      console.log("index",index)
      const response =await database().ref(`notes/${index}`).set([
        note
      ]);
      console.log(response)
      setNote(null)
    }
    catch(err){
      console.log("error=>",err)
    } 
  }
  console.log(list)
  return(
    <View style={styles.container}>
      <StatusBar hidden={true}/>
     <View>
      <Text style={{fontWeight:'bold',textAlign:'center',fontSize:24}}>Add Notes</Text>
     <TextInput style={styles.inputBox} placeholder="Enter any value" value={note}  onChangeText={(e)=>setNote(e)}/>

     <TouchableOpacity style={styles.addButton} onPress={()=>handleAddData( )}>
          <Text style={{color:'white'}}>Add</Text>
     </TouchableOpacity>
     </View>

     <View style={styles.cardCont}>
     <FlatList 
         data={list}
         renderItem={(item)=>{
         console.log(item)
          if(item.item !== null)
         {
          console.log(item.item[0])
          return(
            <View style={styles.card}>
              <Text style={{color:'black',height:30}}>{item.item[0]}</Text>
              </View>
          )
         }
         }}
         />
     
    </View>
      {/* <Text>
      {myData ? myData?.name : "loading"}
      </Text>
      <Text>
      {myData ? myData?.age : "loading"}
      </Text>
      <Text>
      {myData ? myData?.hobby.map((list)=>` ${list}`) : "loading"}
      </Text> */}
    </View>
  )
}
const styles=StyleSheet.create(
  {
    container:{
      flex:1,alignItems:'center'
    },
    inputBox:{
      width:width-30,
      borderRadius:15,
      borderWidth:2,
      marginTop:10,
      padding:10,
      marginVertical:10
    },
    addButton:{
      backgroundColor:'orange',
      alignItems:'center',
      padding:10
    },
    cardCont:{
      marginVertical:20,

    },
    card:{
      backgroundColor:'white',
      width:width-40,
      height:30,
      padding:20,
      borderRadius:30,
      marginVertical:10
    }
  }
)