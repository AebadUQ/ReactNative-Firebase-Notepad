import {View,Text,TextInput,StyleSheet,StatusBar,Dimensions,TouchableOpacity} from 'react-native';
import React , {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
const {height,width} = Dimensions.get("screen")
export default function App(){
  const [note,setNote]=useState(null)
  const [list,setList]=useState(null)
  // const [myData,setMyData]=useState(null)
  // const [myDataTwo,setMyDataTwo]=useState(null)
  // useEffect(()=>{
  //   getDatabase(  )
  // },[])
  // const getDatabase  =async()=>{
  //   try{
      
  //     const userDocument =await firestore().collection('testing').doc('GJmk1ztSx2Wbveo2C2xK').get();
  //     const data =await database().ref('users/1').once("value")
  //     console.log(data?.val())
  //     console.log(userDocument?._data)
  //     setMyData(userDocument?._data)
  //   }
  //   catch(err){
  //     console.log(err)
  //   } 
  // }
  const handleAddData=async()=>{
    try{
      const response =await database().ref("notes/2").set([
        note
      ]);
      console.log(response)
    }
    catch(err){
      console.log("error=>",err)
    } 
  }
  console.log(note)
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
    }
  }
)