import React, { useState } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {BlurView} from '@react-native-community/blur';
import { SvgUri } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const StartPage = () => { 
  const navigation = useNavigation(); 
  const [menu, SetMenu] = useState(false);
  const [loadingUser, SetLoadingUser] = useState(false);
  const [load, SetLoad] = useState(false);
  const [close, SetClose] = useState(false);
  const [isLoading, SetisLoading] = useState(false);
  const [loadToken, setLoadToken] = useState(false);
  const [blurType, setBlurType] = useState('light');

  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  
  const openMenu = () => {
    const allow = true;
    SetMenu(allow);
    const viewClose = true;
    SetClose(viewClose);
  }

  const closeMenu = () => {
    const allow = false;
    SetMenu(allow);
    const viewClose = false;
    SetClose(viewClose);
  }

  const ModalToken = () => {
    const allowModal = true;
    setLoadToken(allowModal);
    const allow = false;
    SetMenu(allow);
    const viewClose = false;
    SetClose(viewClose);
  }

  const GoToLogin = () => {
    navigation.navigate('Login')
    const allow = false;
    SetMenu(allow);
    const viewClose = false;
    SetClose(viewClose);
  }

  const GoToRegister = () => {
    navigation.navigate('Register')
    const allow = false;
    SetMenu(allow);
    const viewClose = false;
    SetClose(viewClose);
  }
  
  const CloseModalToken = () => {
    const disableModal = false;
    setLoadToken(disableModal);
  }

  const GoTODash = () => {
    navigation.navigate('MainContainer')
  }

  const tintColor = ['#ffffff', '#000000'];
  if (blurType === 'xlight') {
    tintColor.reverse();
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={styles.status}
        animated={true}
        backgroundColor="#000"
        barStyle={'light-content'} />
        {menu &&
          <View style={styles.ContainerMenu} >
            <BlurView
              style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%'}}
              blurRadius={1}
              blurType={blurType}
              // Additional available on Android
              // blurRadius={20}
              // downsampleFactor={10}
              // overlayColor={'rgba(255, 255, 255, .6)'}
            />
            <View
              style={styles.sidemenu}>
              
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.borderphoto}>
                  <View style={styles.containerphoto}>
                    <Image style={styles.photouser} source={require('../../assets/imgs/avatar/2.jpg')}/> 
                  </View>
                </View>
                <Text style={styles.welcome}>Bem Vindo(a),</Text>
                <Text style={styles.Visitor}>Visitante!</Text>
              </View>
              <TouchableOpacity style={styles.close} onPress={closeMenu}>
                <Image style={styles.iconMenu} source={require('../../assets/imgs/white/png/three-bars.png')} />
              </TouchableOpacity>
              <View style={styles.navMenu}>
                <View style={styles.divBar}></View>
                <TouchableOpacity style={[styles.iteMenu, {backgroundColor: '#9b1296'}]} onPress={GoToRegister}>
                  <Image style={[styles.menuicon, {top: 4}]} source={require('../../assets/imgs/white/png/nfeat-project.png')} />
                  <Text style={[styles.menutext, {top: 1}]}>CADASTRAR-SE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 2}]} onPress={GoToLogin}>
                  <Image style={styles.menuicon} source={require('../../assets/imgs/white/png/user.png')} />
                  <Text style={styles.menutext}>LOGIN</Text>
                </TouchableOpacity>
                <View style={styles.divBar}></View>
                <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]} onPress={GoToLogin}>
                  <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/info.png')} />
                  <Text style={styles.menutext}>SOBRE-NÓS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]} onPress={ModalToken} >
                  <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/locked.png')} />
                  <Text style={styles.menutext}>TOKEN</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.version}>Versão 1.0.3</Text>
            </View>
          </View>}
      <View style={{height: '100%'}}>
        <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
        {!menu && <TouchableOpacity style={{zIndex: 1001}} onPress={openMenu}>
          <Image style={styles.menuHamburger} source={require('../../assets/imgs/white/png/three-bars.png')} />
        </TouchableOpacity>}
        <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_10.png')}/>
        <Text style={styles.title}>FAÇA PARTE {"\n"}DO <Text style={{fontFamily: 'Montserrat-Bold'}}>PRÓXIMO</Text>{"\n"}<Text style={{fontFamily: 'Montserrat-Bold'}}>ESTÁGIO</Text> DA {"\n"}ARTE</Text>

        <Text style={styles.description}>
          A NFEAT é uma plataforma de gestão de coleções que conecta artistas, colecionadores, galerias e museus a partir 
          da tecnologia blockchain. Queremos manter viva a história da arte unindo as inovações tecnológicas com aquilo 
          que o mercado da tradicional da arte tem de melhor.
        </Text>
        <TouchableOpacity
        onPress={ () => navigation.navigate('Login')}
          style={styles.btn} >
          <Text style={styles.titleAbout}>SAIBA MAIS</Text>
        </TouchableOpacity>

        <View style={{width: '100%', height: 100, position: 'absolute', bottom: 5, marginLeft: 3, zIndex: 1000}}>
           <Text style={styles.titletoken}>Token</Text>
           <Text style={styles.tokennumber}>84560</Text>
           <Image style={styles.viewEyes} source={require('../../assets/imgs/white/png/view.png')}/>
           <LottieView style={styles.loadbar} source={require('../../assets/json/load.json')} autoPlay loop />
        </View>

        {loadToken && <View style={styles.ContainerMenu}>
          <View style={styles.ModalToken}>
            <Text style={styles.titlemodal}>NFEAToken</Text>
            <TouchableOpacity style={styles.closemodal} onPress={CloseModalToken}>
                <Image style={styles.closeiconmodal} source={require('../../assets/imgs/white/png/close.png')} />
            </TouchableOpacity>
            <View style={styles.modalarea}>
              <Text style={styles.tokenModal}>93463</Text>
              <LottieView style={styles.loadbarmodal} source={require('../../assets/json/load.json')} autoPlay loop />
            </View>
          </View>
        </View>}
      </View>
    </SafeAreaView>
  );
};
const width_proportion = '100%';
const height_proportion = '100%';
const styles = StyleSheet.create({
  status: {
    height: 50
  },
  container: {
    /* flex: 1,
    justifyContent: 'center', */
    backgroundColor: '#000000', height: '100%'
  },
  background: {
    position: 'absolute', width: width_proportion, height: height_proportion, padding: 620, top: -300, opacity: 0.2,
  },
  buttonsContainer: {
    padding: 10
  },
  logo: {
    left: 30, width: 100, height: 55, zIndex: 1000
  },
  menuHamburger: {
    position: 'absolute', right: 2, top: -52, width: 52, height: 52
  },
  title: {
    fontFamily: 'Montserrat-Light', fontSize: 40, marginLeft: 5, left: 25, color: "#FFF", top: 35,
  },
  description: { fontFamily: 'Montserrat-Light', fontSize: 14, marginLeft: 5, left: 25, color: "#FFF", width: '80%', top: 50 },
  btn: {
    width: 150,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center', fontWeight: 'light',
    left:30,
    top:80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#FFF'
  },
  borderphoto: { height: 50, width: 50, borderRadius: 100, borderColor: '#fff', borderWidth: 1, marginTop: 60, justifyContent: 'center', alignItems: 'center' },
  containerphoto: { width: 40, height: 40, borderRadius: 100, backgroundColor: '#ddd', },
  photouser: { width: 40, height: 40, borderRadius: 100, },
  welcome: { fontFamily: 'Montserrat-Light', fontSize: 18, textAlign: 'center', color: '#fff', marginTop: 10 },
  Visitor: { fontFamily: 'Montserrat-Regular', fontSize: 18, textAlign: 'center', color: '#fff' },
  titleAbout: { fontFamily: 'Montserrat-Light', fontSize: 14, textAlign: 'center' },
  screenLoad: { width: '100%', height: '100%', backgroundColor: '#00000020', position: 'absolute', zIndex: 2000, justifyContent: 'center', alignItems: 'center' },
  load: { position: 'absolute', zIndex: 2001, top: '40%', },
  iconMenu: { width: 48, height: 48 }, closeMenu: { width: 42, height: 42 },
  ContainerMenu: { height: '115%', width: '100%', position: 'absolute', top:0, zIndex: 2000, backgroundColor: '#ffffff40' },
  sidemenu: { height: '100%', width: '55%', position: 'absolute', top: 0, right: 0, borderRadius: 30, backgroundColor: '#000000',},
  divBar: { width: '34%', height: 0.3, backgroundColor: '#ccc', marginTop: 15, marginBottom: 15 },
  navMenu: { top: 5, justifyContent: 'center', alignItems: 'center', },
  iteMenu: { backgroundColor: 'transparent', borderRadius: 30, width: '80%', height: 46,flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, },
  menuicon: { position: 'absolute', left: 5, width: 35, height: 35, top: 3 },
  menutext: { fontFamily: 'Montserrat-Light', color: '#fff', fontSize: 14, fontWeight: '400', marginLeft: 44, marginTop: 12, textAlign: 'left' },
  close: { backgroundColor: '#000', width: 70, height: 50, position: 'absolute', right: 192, zIndex: 1001, top: 58, borderRadius: 8 },
  titletoken: { fontFamily: 'Montserrat-Light', fontSize: 14, color: '#fff', marginLeft: 28 },
  tokennumber: { fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#fff', marginLeft: 28, top: 12 },
  viewEyes: { width: 23, height: 23, marginTop: 26, marginLeft: 80, position: 'absolute' },
  loadbar: { height: 80, width: 150, marginTop: -18.5, marginLeft: -3 },
  ModalToken: { position: 'absolute', bottom: 0, width: '100%', height: 180, borderTopLeftRadius: 20, borderTopRightRadius: 20 ,backgroundColor: '#fff', },
  titlemodal: { marginLeft: 25, marginTop: 20, fontFamily: 'Montserrat-Bold',  fontSize: 16, color: '#141414' },
  closemodal: { backgroundColor:'#141414', width: 24, height: 24, position: 'absolute', right: 0, zIndex: 10000, marginRight: 20, marginTop: 15, borderRadius: 100, justifyContent: 'center', alignItems: 'center'},
  closeiconmodal: { height: 20, width: 20 },
  modalarea: { justifyContent: 'center', alignItems: 'center', width: '100%' },
  tokenModal: {  fontFamily: 'Montserrat-Bold',  fontSize: 25, color: '#141414', textAlign: 'center', marginTop: 50 },
  loadbarmodal: { width: '100%', marginTop: -40, },
  version: { position: 'absolute', left: 0, right: 0, bottom: 50, color: '#fff', fontSize: 10, fontFamily: 'Montserrat-Bold', textAlign: 'center', zIndex: 10001 },
});

export default StartPage;