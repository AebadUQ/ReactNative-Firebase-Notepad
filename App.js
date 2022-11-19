import {View,Text} from 'react-native';
import React , {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function App(){
  const [myData,setMyData]=useState(null)
  useEffect(()=>{
    getDatabase(  )
  },[])
  const getDatabase  =async()=>{
    try{
      
      const userDocument =await firestore().collection('testing').doc('GJmk1ztSx2Wbveo2C2xK').get();
    
      console.log(userDocument?._data)
      setMyData(userDocument?._data)
    }
    catch(err){
      console.log(err)
    }
  }
  return(
    <View>
      <Text>
      {myData ? myData?.name : "loading"}
      </Text>
      <Text>
      {myData ? myData?.age : "loading"}
      </Text>
      <Text>
      {myData ? myData?.hobby.map((list)=>` ${list}`) : "loading"}
      </Text>
    </View>
  )
}