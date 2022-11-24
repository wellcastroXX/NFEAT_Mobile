import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import CheckBox from "expo-checkbox";
//import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { GetUsers,GetArtsFromUser } from "../environment/env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';

class ProfilePage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          load: false,
          loadingUser: true,
          menu: false,
          close: false,
          user: null,
          address: "",
          arts: "",
          artistsInGallery:[],
          itemLoaded : false,
          historyFilter:"",
          projetoNfeat:false,
          notFound:false,
          isLoading:false,
          artsAreLoaded:false,
          blurType: 'xlight'
        };
      }
    state = {
        ready: false,
        SlideInLeft: new Animated.Value(0),
        slideUpValue: new Animated.Value(0),
        fadeValue: new Animated.Value(0),
    };
    /* _start = () => {
        return Animated.parallel([
          Animated.timing(this.state.SlideInLeft, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(this.state.slideUpValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          })
        ]).start();
    }; */

    componentDidMount = async () => {
        await this.delay(500);
        this.LoadUser();

        const [fontsLoaded] = useFonts({
          'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
          'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
          'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
        });
  
        if (!fontsLoaded) {
          return null;
        }

        const tintColor = ['#ffffff', '#000000'];
        if (this.state.blurType === 'xlight') {
          tintColor.reverse();
        }
    }
    
    delay = async (time) => {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    
    LoadArts = async (orderBy, page) => {
        await this.delay(100);
        this.setState({isLoading:true})
        const artsLoaded = await GetArtsFromUser(this.state.address, orderBy, page);
        if(artsLoaded.data != undefined){
          this.setState({
            arts: artsLoaded,
            artsAreLoaded:true,
            isLoading:false
          })
        }
    
      }
    
      LoadUser = async () => {
        const itemRes = await GetUsers(await AsyncStorage.getItem('public-address'));
        console.log('line 92: ', itemRes);
        this.setState({address: itemRes})
        this.LoadArts("desc",1)
    
        const data = await itemRes;
        console.log(data);
        //If user is a gallery
        if(data.role === "GALLERY"){
          var artistsInGalleryTemp = []
          if(itemRes.artists.length > 0){
            itemRes.artists.forEach(artist => {
              var newArtist = {}
              newArtist.name = artist.stageName;
              newArtist.profilePicture = artist.profilePicture;
              newArtist.backgroundPicture = artist.backgroundPicture;
              newArtist.publicAddress = artist.publicAddress;
              artistsInGalleryTemp.push(newArtist);
            });
          }
          //TODO: wait for gallery API (carrousel of artists)
    
          this.setState({artistsInGallery:artistsInGalleryTemp})
        }
    
        if(data.statusCode !== 404){
          this.setState({user: data, itemLoaded:true, loadingUser: false});
          console.log('lines 118:', data);
        }
    
        if(data.statusCode === 404){
          this.setState({notFound: true, itemLoaded:true});
        }
      }

    LogOut = () => {
        console.log('log out user');
        this.load = true;
        setTimeout(() => {
            this.props.navigation.navigate('Login');
            AsyncStorage.clear();
            this.load = false;
        }, 2500)
    }

    openMenu = () => {
       //this._start();
        this.setState({menu: true});
        this.setState({close: true});
    }

    closeMenu = () => {
        this.setState({menu: false});
        this.setState({close: false});
    }

    render(){
        let { slideUpValue, fadeValue, SlideInLeft } = this.state;
        return(
          <ScrollView>
                {this.state.load && (<View style={styles.screenLoad}>
                    <ActivityIndicator style={styles.load} size="large" color="#A72698" />
                </View>)}
                {this.state.loadingUser && (<View style={styles.screenLoad}>
                    <ActivityIndicator style={styles.load} size="large" color="#A72698" />
                </View>)}
                {this.state.menu == true &&
                <View style={styles.ContainerMenu} >
                  <BlurView
                    style={{position: 'absolute', left: 0, right: 0, top: 0, height: '100%', width: '100%'}}
                    blurRadius={1}
                    blurType={this.state.blurType}
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
                      <Text style={styles.welcome}> </Text>
                      <Text style={styles.Visitor}>{this.state.user.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.close} onPress={this.closeMenu}>
                      <Image style={styles.iconMenu} source={require('../../assets/imgs/white/png/three-bars.png')} />
                    </TouchableOpacity>
                    <View style={styles.navMenu}>
                      <View style={styles.divBar}></View>
                      <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]}  >
                        <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/gallery.png')} />
                        <Text style={styles.menutext}>PERFIL</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]} onPress={() => {this.props.navigation.navigate('Account')}} >
                        <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/user.png')} />
                        <Text style={styles.menutext}>CONTA</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]} onPress={this.LogOut} >
                        <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                        <Text style={styles.menutext}>SAIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>}
               <ScrollView style={{backgroundColor: '#000', height: '100%', minHeight: 1200 }}>
                <StatusBar style={styles.status} 
                    animated={true} 
                    barStyle={'light-content'} />
                    <View style={[ styles.header ,{flex: 1 }]}>
                      <Image style={[styles.banner, {position: 'fixed', top: 0}]} blurRadius={2} source={require('../../assets/imgs/outros/default_bg.jpeg')}/>
                      <Image style={[styles.logo, {top: 38}]} source={require('../../assets/logo/logo_white.png')} />
                      <TouchableOpacity style={[styles.menu, {top: 38}]} onPress={this.openMenu}>
                      {!this.state.close && <Image style={styles.closeMenu} source={require('../../assets/imgs/white/png/three-bars.png')} />}
                      </TouchableOpacity>
                    </View>
                    <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                    {!this.state.loadingUser && <View style={styles.containerPage}>
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center', marginTop: 50}]}>
                            <View style={styles.profilePic}>
                                <Image style={styles.profilePhoto} source={require('../../assets/imgs/avatar/4.jpg')} />
                            </View>
                            <Text style={styles.name}>{this.state.user.name !== null ? this.state.user.name : this.state.user.publicAddress.substring(0,5)+"..."+this.state.user.publicAddress.substring(36)}{this.state.user.name !== null && this.state.user.isPrivate}</Text>
                        </View>
                        <View style={[styles.row, {top: 35, width: '70%', justifyContent: 'center', alignItems: 'center'}]}>
                            {this.state.user.role.toLowerCase() === "collector" && <View style={[styles.badge, {width: '48%',}]}>
                              <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/images.png')} />
                              <Text style={styles.titleBadge}>Colecionador</Text>
                            </View>}
                            {this.state.user.role.toLowerCase() === "artist" &&  <View style={[styles.badge, {width: '30%',}]}>
                              <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/brush.png')} />
                              <Text style={styles.titleBadge}>Artista</Text>
                            </View>}
                            {this.state.user.role.toLowerCase() === "gallery" && <View style={[styles.badge, {width: '30%',}]}>
                              <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/gallery.png')} />
                              <Text style={styles.titleBadge}>Galeria</Text>
                            </View>}
                            {this.state.user.role.toLowerCase() === "museum" && <View style={[styles.badge, {width: '28%',}]}>
                              <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/images.png')} />
                              <Text style={styles.titleBadge}>Museu</Text>
                            </View>}
                            <View style={styles.views}>
                                <Image style={styles.iconView}  source={require('../../assets/imgs/white/png/user.png')}/><Text style={styles.titleView}>{this.state.user.followersCount} Seguidores</Text>
                            </View>
                        </View>
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',top: 60}]}>
                            <TouchableOpacity style={styles.btnCrypt}>
                                <Text style={styles.idCrypt} >Endereco cripto: {this.state.user.publicAddress.substring(0,5)+"..."+this.state.user.publicAddress.substring(36)}</Text>
                                <Image style={styles.iconCopyPaste} source={require('../../assets/imgs/white/png/copy.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',top: 60}]}>
                            <View style={styles.aboutMe}>
                                <Text style={styles.textAbout}>Sobre</Text>
                            </View>
                        </View>
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center',top: 100}]}>
                            <View style={[styles.collection, {marginLeft: 15}]}>
                                <Text style={[styles.textAbout, {left: -5}]}>Coleção</Text><View style={styles.badgCollection}><Text>0</Text></View>
                            </View>
                        </View>
        
                        <View style={[styles.row, {justifyContent: 'center', alignItems: 'center'}]}>
                            <TouchableOpacity style={styles.btnLogout} onPress={this.LogOut}>
                                <Text style={styles.textExit}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                    <View style={{height: 500, marginTop: 100}}></View>
               </ScrollView>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
status: {
  height: 20, backgroundColor: 'transparent'
 },
 containerPage: { position: 'absolute', width: '100%', marginTop: 100, justifyContent: 'center', 
  alignItems: 'center', zIndex: 1001, height: 600,
 },
 container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  shadowHead: {  },
  header: { 
    width: '100%', height: 160, backgroundColor: '#141414', top: 0, borderBottomWidth: 0.2, borderColor: '#ccc', zIndex: 1000,
    alignItems: 'center', justifyContent: 'center', resizeMode: 'contain',
  },
  logo: { position: 'absolute', left: 20, top: 0, width: 100, height: 55, zIndex: 1001 },
  background: {
    position: 'absolute', width: '100%', height: '100%', right: -70, padding: 500, top: -200, opacity: 0.1, zIndex: 999
  },
  banner: { width: '100%', height: 160,top: 0, opacity: 1, zIndex: 999,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  menu: { position: 'absolute', right: 5, top: 5},
  profilePic: { width: 100, height: 100, borderRadius: 100, borderColor: '#ccc', borderWidth: 4, backgroundColor: '#fff', top: -30, justifyContent: 'center', alignItems: 'center' },
  profilePhoto: { height: '100%', width: '100%', borderRadius: 100, flexDirection: 'row', flexWrap: 'wrap' },
  name: { fontFamily: 'Montserrat-Bold', fontSize: 28, color: '#FFF', textAlign: 'center', position: 'absolute', top: 80, justifyContent: 'center', fontWeight: 'bold' },
  badge: { height: 35, borderRadius: 30, borderWidth: 1, borderColor: '#fff', }, 
  views: { width: '50%', height: 35, borderRadius: 30, borderWidth: 1, borderColor: '#fff', left: 5 }, 
  titleBadge: { fontFamily: 'Montserrat-Regular', color: '#fff', left: 30, fontSize: 14, top: -18, }, iconBadge: { width: 25, height: 25, left: 5, top: 3 },
  titleView: { color: '#fff', left: 20, fontSize: 14, top: -18, left: 35 }, iconView: { width: 25, height: 25, left: 5, top: 3 },
  btnCrypt: { backgroundColor: '#313131', width: '76%', height: 45, borderRadius: 30, justifyContent: 'center', flexDirection: 'row', },
  idCrypt: { fontFamily: 'Montserrat-Bold', marginLeft: '-8%', left: 0, color: '#fff', fontSize: 13, fontWeight: 'bold', marginTop: 14, },
  iconCopyPaste: { width: 20, height: 20, right: 0, marginRight: 10, position: 'absolute', marginTop: 12 },
  iconFav: { left: 0, right: 0, width: 28, height: 28,  },
  aboutMe: { width: '20%', borderBottomWidth: 2, borderColor: '#313131', marginBottom: 10, marginTop: 40 },
  textAbout: { color: '#FFF', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, },
  collection: { width: '30%', borderBottomWidth: 2, borderColor: '#313131', marginBottom: 10, marginTop: 40 },
  badgCollection: { backgroundColor: '#313131', width: 30, height: 20, borderRadius: 10, color: '#fff', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0, marginRight: -5, marginTop: 1 },
  btnLogout: { width: '34%', height: 45, backgroundColor: '#fff', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 140, },
  textExit: { color: '#101010', fontSize: 14, fontWeight: '600', },
  screenLoad: { width: '100%', height: '100%', backgroundColor: '#00000020', position: 'absolute', zIndex: 2000, justifyContent: 'center', alignItems: 'center' },
  load: { position: 'absolute', zIndex: 2001, top: '40%', },
  menu: { position: 'absolute', right: 5, top: 10, zIndex: 1005 },
  btnMenu: { backgroundColor: 'transparent', position: 'absolute', height: 52, width: 52, right: 5, top: -5, zIndex: 5000 },
  menuHamburger: { width: 52, height: 52 },
  ContainerMenu: { height: '115%', width: '100%', position: 'absolute', top:0, zIndex: 2000, backgroundColor: '#ffffff40' },
  sidemenu: { height: '100%', width: '55%', position: 'absolute', top: 0, right: 0, backgroundColor: '#000000',},
  divBar: { width: '34%', height: 0.3, backgroundColor: '#ccc', marginTop: 15, marginBottom: 15 },
  navMenu: { top: 5, justifyContent: 'center', alignItems: 'center', },
  iteMenu: { backgroundColor: 'transparent', borderRadius: 30, width: '80%', height: 46,flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, },
  menuicon: { position: 'absolute', left: 5, width: 35, height: 35, top: 3 },
  menutext: { fontFamily: 'Montserrat-Light', color: '#fff', fontSize: 14, fontWeight: '400', marginLeft: 44, marginTop: 12, textAlign: 'left' },
  close: { backgroundColor: '#000', width: 70, height: 50, position: 'absolute', right: 192, zIndex: 1001, top: 58, borderRadius: 8 },
  borderphoto: { height: 50, width: 50, borderRadius: 100, borderColor: '#fff', borderWidth: 1, marginTop: 60, justifyContent: 'center', alignItems: 'center' },
  containerphoto: { width: 40, height: 40, borderRadius: 100, backgroundColor: '#ddd', },
  photouser: { width: 40, height: 40, borderRadius: 100, },
  welcome: { fontFamily: 'Montserrat-Light', fontSize: 18, textAlign: 'center', color: '#fff', marginTop: 10 },
  Visitor: { fontFamily: 'Montserrat-Regular', fontSize: 18, textAlign: 'center', color: '#fff' },
}) 

export default ProfilePage;