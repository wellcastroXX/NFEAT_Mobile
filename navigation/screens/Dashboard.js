import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUsers, GetLoginData, GetArtsFromUser, GetDraftsFromUser, GetArtsFromArtist } from '../environment/env';
import { useFonts } from 'expo-font';
import {BlurView} from '@react-native-community/blur';

class DashboardPage extends React.Component{
    
  constructor(props) {
    super(props);
    this.state = {
      userData:null,
      items: [],
      itemTotalCounter: 0,
      Items: true,
      Drafts: false,
      drafItems: [],
      draftTotalCounter:0,
      creationItems:[],
      creationItemsTotalCounter:0,
      artistItems:[],
      artistsTotalCounter:0,
      order:"desc",
      page: 1,
      filter: "",
      Empty: true,
      loadingData: false,
      checkboxVerificados: false,
      loadingState:false,
      dashboardTab:"my-items",
      enterIsAvailable:true,
      menu: false,
      blurType: 'xlight'
    };
  }
    
    pressEnter = async (event) => {
        if (event.keyCode === 13) {
          const dash = await this.LoadDashboardItems("desc", 1, true)
        }
    }
    
    delay = async (time) => {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  
    RecordLoginStates = async () => {
      if(GetLoginData() != null){
        console.log(await AsyncStorage.getItem('public-address'));
        const itemRes = await GetUsers(await AsyncStorage.getItem('public-address'));
        const data = await itemRes;
        console.log(data);
        this.setState({
          userData : data,
          loadingData: false
        })
        console.log('line 88: ', this.state.userData);
        await this.LoadDashboardItems("desc", 1, true, true);
  
      } else {
        console.log('without user logged');
        this.props.navigation.navigate('Login')
      }
    }

    MyDraft = () => {
      this.setState({Items: false});
      this.setState({Drafts: true});
      console.log('Changed to Drafts itens');
    }
    
    MyItens = () => {
      this.setState({Drafts: false});
      this.setState({Items: true});
      console.log('Changed to Itens');
    }
  
    //      this.LoadDashboardItems("desc", 1, true);
    componentDidMount = async () => {
      this.RecordLoginStates()

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

      if(this.props.query["area"] != undefined) {
        if(this.props.query["area"] === "my-drafts" || this.props.query["area"] === "my-artists" || this.props.query["area"] === "my-creations")
        this.setState({dashboardTab:this.props.query["area"]})
      }
    }
    
    ResetArtists = async () => {
      this.setState({artistItems:[], loadingState:true}) 
      await GetArtistsFromGallery().then((res) => {
        this.setState({artistItems: res.artists,
          artistsTotalCounter:res.artists.length,
          loadingState:false
        })
      });
    }
  
  componentWillUnmount() {
  }

  LoadDashboardItems = async (orderBy, page, forceLoading = true, recordTotals = false) => {

    if (orderBy === "") {
      orderBy = this.state.order
    } else {
      this.setState({ order: orderBy })
    }

    this.setState({ loadingState: forceLoading, items: [], drafItems: [], creationItems: [], artistItems: [] })
    var loadingProgress = 0;

    //LOAD ITEMS
    await GetArtsFromUser(await AsyncStorage.getItem('public-address'), orderBy, page, 12, this.state.filter).then((res) => {
      this.setState({ items: res });
      loadingProgress++;
      if (recordTotals) {
        //RecordTotalValues
        this.setState({
          itemTotalCounter: res.totalCount,
        })
      }
    });

    //LOAD CREATIONS
    if (this.state.userData.role === "ARTIST") {
      await GetArtsFromArtist(this.state.userData.publicAddress, orderBy, page, 12, this.state.filter).then((res) => {
        this.setState({ creationItems: res });
        loadingProgress++;
        if (recordTotals) {
          //RecordTotalValues
          this.setState({
            creationItemsCounter: res.totalCount,
          })
        }

      });
    } else {
      loadingProgress++;
    }

    //LOAD ARTISTS (Gallery)
    if (this.state.userData.role === "GALLERY") {
      console.log(this.state.filter)
      await GetArtistsFromGallery(this.state.filter, page).then((res) => {
        this.setState({ artistItems: res.artists });
        loadingProgress++;
        if (recordTotals) {
          //RecordTotalValues
          this.setState({
            artistsTotalCounter: res.artists.length,
          })
        }
      });
    } else {
      loadingProgress++;
    }

    //LOAD DRAFTS
    await GetDraftsFromUser(orderBy, page, 12, this.state.filter).then((res) => {
      this.setState({ drafItems: res });
      if (recordTotals) {
        //RecordTotalValues
        this.setState({
          draftTotalCounter: res.totalCount,
        })
      }
      loadingProgress++;
    });
    if (loadingProgress === 4) {
      this.setState({ loadingState: false })
    }
  }

  Uniq(a) {
    var prims = { "boolean": {}, "number": {}, "string": {} }, objs = [];
    return a.filter(function (item) {
      var type = typeof item;
      if (type in prims)
        return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
      else
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
  }

  openMenu = () => {
   this.setState({ menu: true });
  }

  closeMenu = () => {
    this.setState({ menu: false });
  }
  
  render() {
    return(
      <ScrollView style={{backgroundColor: '#000'}}>
          <StatusBar style={styles.status} 
              animated={true} 
              barStyle={'light-content'} />
              <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
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
                    <Text style={styles.welcome}>Bem Vindo(a),</Text>
                    <Text style={styles.Visitor}>{this.state.userData.name}</Text>
                  </View>
                  <TouchableOpacity style={styles.close} onPress={this.closeMenu}>
                    <Image style={styles.iconMenu} source={require('../../assets/imgs/white/png/three-bars.png')} />
                  </TouchableOpacity>
                  <View style={styles.navMenu}>
                    <View style={styles.divBar}></View>
                    <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]} >
                      <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/info.png')} />
                      <Text style={styles.menutext}>SOBRE-NÓS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]}  >
                      <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/locked.png')} />
                      <Text style={styles.menutext}>TOKEN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iteMenu, {borderColor: '#ccc', borderWidth: 1}]}  >
                      <Image style={[styles.menuicon]} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                      <Text style={styles.menutext}>SAIR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>}
              {this.state.Items && <View style={{minHeight: 800, height: '100%', top: 42}}>
                  <View style={{flex: 1, width: '100%', height: 100, zIndex: 5000, position: 'absolute' }}>
                    <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                    <TouchableOpacity style={styles.btnMenu} onPress={this.openMenu}>
                      <Image style={styles.menuHamburger} source={require('../../assets/imgs/white/png/three-bars.png')} />
                    </TouchableOpacity>
                    <Text style={[styles.titlePage, { flexGrow: 1, flexDirection: 'row' }]}>Meu Painel de Controle</Text>

                    {this.state.loadingData && this.state.userData.role.toLowerCase() === "collector" && 
                    <View style={[styles.badge, { width: 120 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/images.png')} /><Text style={styles.textBadge}>Colecionador</Text>
                    </View>}
                    {this.state.loadingData && this.state.userData.role.toLowerCase() === "artist" && 
                    <View style={[styles.badge, { width: 80 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/brush.png')} /><Text style={styles.textBadge}>Artista</Text>
                    </View>}
                    {this.state.loadingData && this.state.userData.role.toLowerCase() === "gallery" && 
                    <View style={[styles.badge, { width: 80 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/gallery.png')} /><Text style={styles.textBadge}>Galeria</Text>
                    </View>}
                    <View style={styles.row}>
                        <View style={styles.topbtns}>
                          <TouchableOpacity style={styles.items} >
                            <Text style={styles.textTopbtns}>MEUS ITEMS</Text><View style={styles.draftQts}><Text style={styles.textQts}>0</Text></View>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.draftsDisabled} onPress={this.MyDraft}>
                            <Text style={styles.textTopbtns}>RASCUNHOS</Text>
                              <View style={styles.draftQts}>
                                {!this.state.notif && <Text style={styles.textQts}>0</Text>}
                                {this.state.notif && <Text style={styles.textQts}>1</Text>}
                              </View>
                          </TouchableOpacity>
                        </View>
                    </View>
                  </View> 
                  <View style={styles.box}>
                      <View style={[styles.row, { flexGrow: 1, flexDirection: 'row', top: -385 }]}>
                          <TextInput style={styles.inputFilter} placeholder="Filtro por nomes" placeholderTextColor="#ccc" />
                          <TouchableOpacity>
                              <Image style={styles.iconFilter} source={require('../../assets/imgs/white/png/switch.png')} />
                          </TouchableOpacity>
                      </View>
                      <View style={[styles.row, { flexGrow: 1, flexDirection: 'row', position: 'absolute', top: 70, width: '100%', }]}>
                         <View style={styles.checkItemLeft}>
                              <CheckBox
                                  value={this.state.checkboxVerificados} style={styles.checkboxFilter}
                                  onValueChange={() => setVerify(!this.state.checkboxVerificados)}
                                  color={this.state.checkboxVerificados ? "#9B1397" : undefined}
                              /><Text style={[styles.titleCheck, {left: 30}]}>VERIFICADOS</Text>
                         </View>
                      </View>
                      <View style={{width:'86%', borderBottomColor: '#578F88', borderBottomWidth: StyleSheet.hairlineWidth, top: 108, position: 'absolute' ,left: 25 }}/>

                      {this.state.Empty && <View style={styles.areaNoItens}>
                           <Image style={styles.iconArtEmpty} source={require('../../assets/imgs/outros/painting.png')}/>
                           <Text style={styles.text1ArtEmpty}>NADA POR AQUI</Text>
                           <Text style={styles.text2ArtEmpty}>Seus itens aparecerão aqui quando forem transferidos para sua conta</Text>
                      </View>}

                  </View>
              </View>}
              {this.state.Drafts && <View style={{minHeight: 800, height: '100%', top:42}}>
                  <View style={{flex: 1, width: '100%', height: 100, zIndex: 5000, position: 'absolute' }}>
                    <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                    <TouchableOpacity style={styles.btnMenu} onPress={this.openMenu}>
                      <Image style={styles.menuHamburger} source={require('../../assets/imgs/white/png/three-bars.png')} />
                    </TouchableOpacity>
                    <Text style={[styles.titlePage, { flexGrow: 1, flexDirection: 'row' }]}>Meu Painel de Controle</Text>
                    {this.state.loadingData && <View style={styles.row}>
                    {this.state.userData.role == "COLLECTOR" && 
                    <View style={[styles.badge, { width: 120 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/images.png')} /><Text style={styles.textBadge}>Colecionador</Text>
                    </View>}
                    {this.state.userData.role == "ARTIST" && 
                    <View style={[styles.badge, { width: 80 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/brush.png')} /><Text style={styles.textBadge}>Artista</Text>
                    </View>}
                    {this.state.userData.role == "GALLERY" && 
                    <View style={[styles.badge, { width: 80 }]}>
                      <Image style={styles.iconBadge} source={require('../../assets/imgs/white/png/gallery.png')} /><Text style={styles.textBadge}>Galeria</Text>
                    </View>}
                  </View>}
                  <View style={styles.row}>
                      <View style={styles.topbtns}>
                        <TouchableOpacity style={styles.itemsDisabled} onPress={this.MyItens}>
                          <Text style={styles.textTopbtns}>MEUS ITEMS</Text><View style={styles.draftQts}><Text style={styles.textQts}>0</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.drafts}>
                          <Text style={styles.textTopbtns}>RASCUNHOS</Text>
                             <View style={styles.draftQts}>
                               {!this.state.notif && <Text style={styles.textQts}>0</Text>}
                               {this.state.notif && <Text style={styles.textQts}>1</Text>}
                             </View>
                        </TouchableOpacity>
                      </View>
                  </View>
                  </View> 

                  <View style={styles.box}>
                      <View>

                      </View>
                  </View>
              </View>}
         </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
status: {
  height: 20, backgroundColor: 'transparent'
 },
 container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  logo: { position: 'absolute', left: 20, top: -10, width: 100, height: 55, },
  background: {
    position: 'absolute', width: '100%', height: '100%', right: -400, padding: 500, top: -50, opacity: 0.1,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  badge: { height: 30, borderRadius: 30, borderWidth: 1, borderColor: '#fff', right: 10, justifyContent: 'flex-end', top: -50 },
  iconBadge: { width: 22, height: 22, left: 5, top: 12 }, textBadge: { fontFamily: 'Montserrat-Regular', color: '#fff', fontSize: 11, right: -35, top: -7 },
  titlePage: { fontFamily: 'Montserrat-Regular', textAlign: 'left', color: '#FFF', fontSize: 22, left: 20, top: 70, },
  box: { width:"100%", height: '100%', minHeight: 850, backgroundColor: '#3F3F3F', justifyContent: 'center', top: 160,
    alignItems: 'center', position: 'absolute', zIndex: 1000
  },
  inputFilter: { backgroundColor: '#2B2B2B', borderRadius: 12, width: '75%', height: 34, left: 20, color: '#fff', fontSize: 13, fontStyle: 'italic' , paddingLeft: 5, },
  iconFilter: { left: 35, width: 34, height: 34 },
  checkItemLeft: { left: 0, alignItems: 'flex-start', width: '30%', marginLeft: 20 }, checkItemCenter: { alignItems: 'center', width: '30%', marginLeft: -50 }, checkItemRight: { right: 20, alignItems: 'flex-end', width: '30%', },
  checkbox: { alignSelf: "center",},
  checkboxFilter: { borderRadius: 8, width: 25, height: 25, backgroundColor: '#222222', borderWidth: 0, },
  titleCheck: { fontFamily: 'Montserrat-Regular', color: '#FFF', fontSize: 13, left: 35, top: -20 },
  areaNoItens: { top: '22%', justifyContent: 'center', alignItems: 'center', width: '100%', height: 200, position: 'absolute'},
  iconArtEmpty: { width: 120, height: 120, opacity: 0.2, },
  text1ArtEmpty: { fontFamily: 'Montserrat-Regular', fontSize: 20, textAlign:'center', marginTop: 5, opacity: 0.6, color: '#FFF' },
  text2ArtEmpty: { fontFamily: 'Montserrat-Regular', fontSize: 12, textAlign:'center', marginTop: 5, opacity: 0.6, width: '45%', color: '#FFF' },
  topbtns: { flex: 1, flexDirection: 'row', width: '100%', height: 40, position: 'absolute', top: 30, zIndex: 10002, },
  items: { width: 140, height: 35, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#3F3F3F', marginTop: 0, marginLeft: 20 },
  itemsDisabled: { width: 140, height: 35, borderTopLeftRadius: 14, borderTopRightRadius: 10, backgroundColor: '#3F3F3F60', marginTop: 0, marginLeft: 20 },
  drafts: { width: 140, height: 35, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#3F3F3F', marginTop: 0, marginLeft: 10  }, 
  draftsDisabled: { width: 140, height: 35, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#3F3F3F60', marginTop: 0, marginLeft: 10 },
  textTopbtns: { fontFamily: 'Montserrat-Regular', color: '#FFF', textAlign: 'left', fontSize: 14, marginTop: 5, marginLeft: 15 },
  draftQts: { backgroundColor: '#222222', borderRadius: 30, width: 20, height: 20, position: 'absolute', right: 0, marginTop: 4, marginRight: 8, opacity: 0.8, textAlign: 'center' },
  draftQtsActive: { backgroundColor: 'red', borderRadius: 30, width: 20, height: 20, position: 'absolute', right: 0, marginTop: 4, marginRight: 8, opacity: 0.8, textAlign: 'center' },
  textQts: { color: '#FFF', textAlign: 'center', top:1 },
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

export default DashboardPage;