import { View, Text, TextInput, StyleSheet, StatusBar, Alert, Dimensions, FlatList, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Adding from './src/screens/Adding'
const { width, height } = Dimensions.get("screen")
import Home from './src/screens/Home'
import Graph from './src/screens/Graph'
export default function App() {

  return (
    <Graph/>
  )
}
const styles = StyleSheet.create(
  {
    


  }
)