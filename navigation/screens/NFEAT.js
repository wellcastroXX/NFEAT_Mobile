import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import axios from "axios";
import * as yup from 'yup';

const state = yup.object({
  items: [],
})

const NFEATPage = () =>{
    
    return(
        <SafeAreaView style={styles.container}>
           <ScrollView>
            <StatusBar style={styles.status} 
                animated={true} 
                barStyle={'light-content'} />
                <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                <View style={{flex: 1 }}>
                  <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                </View> 

           </ScrollView>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
status: {
  height: 20, backgroundColor: 'transparent'
 },
 container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  logo: { position: 'absolute', left: 20, top: 0, width: 100, height: 55, },
  background: {
    position: 'absolute', width: '100%', height: '100%', right: -400, padding: 500, top: -50, opacity: 0.1,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  explore: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  head: { width: '90%', height: 65, marginTop: 85, borderBottomWidth: 4, borderColor: '#FFFFFF40', },
  title: { left: 0, fontSize: 26, fontWeight: '500', color: '#FFF',  },
 
})

export default NFEATPage;