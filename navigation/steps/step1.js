import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
//import useFonts from '../useFonts';
import { useNavigation } from '@react-navigation/native';
/* const LoadFonts = async () => {
  await useFonts();
}; */

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Step1Page = () => {

  const navigation = useNavigation(); 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={styles.status}
        animated={true}
        backgroundColor="#ccc"
        barStyle={'light-content'} />
      <View style={styles.buttonsContainer}>
      <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_10.png')}/>
      <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
       <Text style={styles.title}>Bem-Vindo a NFEAT</Text>
       <Text style={styles.subtitle }>Em nosso painel de controle, você aprenderá rapidamente como tudo irá funcionar.
       </Text>
       <View style={styles.element}>
          <Image style={styles.elementstep1} source={require('../../assets/imgs/elements/Twist_12.png')}/>
       </View>
      <View style={styles.bottomControl}>
        <TouchableOpacity onPress={ () => navigation.navigate('MainContainer')}>
          <Text style={styles.textControl}>PULAR</Text>
        </TouchableOpacity>
        <View style={styles.points}>
          <View style={styles.pt1}></View><View style={styles.pt2}></View><View style={styles.pt3}></View>
        </View>
        <TouchableOpacity onPress={ () => navigation.navigate('StepTwo')}>
          <Image style={styles.arrow} source={require('../../assets/imgs/white/png/long-arrow-right.png')}/>
        </TouchableOpacity>
      </View> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  status: {
    height: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  background: {
    position: 'absolute', width: 100,
  },
  buttonsContainer: {
    padding: 10
  },
  logo: {
    position: 'absolute', left: 30, top: -320, width: 100, height: 55,
  },
  title: {
    fontWeight: 'bold', fontSize: 30, marginLeft: 5, left: 15, color: "#FFF", top: -240,
  },
  subtitle: {
    fontWeight: '300', fontSize: 16, marginLeft: 5, left: 15, color: "#FFF", top: -225, width: 210
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#FFF'
  },
  element: {
    top: 100, 
    justifyContent: 'center', 
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  elementstep1: { 
    position:'absolute', 
    width: '50%', 
    height: '50%', 
    padding: 160, 
  },
  bottomControl: { 
    position: 'absolute', top: 420, width: '100%', left: 10
  },
  textControl: { 
    color: '#A72698', fontWeight: 'bold', fontSize: 16, alignItems: 'flex-start', textAlign: 'left', left: 10, top: 5
  },
  points: {
    justifyContent: 'center', alignItems: 'center', flexGrow: 1, 
    flexDirection: 'row', top: -10
  },
  pt1: { width: 9, height: 9, backgroundColor: '#A72698', borderRadius: '100%', left: -20 },
  pt2: { width: 9, height: 9, backgroundColor: '#CCC', borderRadius: '100%',  },
  pt3: { width: 9, height: 9, backgroundColor: '#CCC', borderRadius: '100%', left: 20 },
  arrow: { alignItems: 'flex-end' , right: 0, top: -40, position: 'absolute'}
});

export default Step1Page;