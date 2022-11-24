import React, { useState, useEffect, Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import { ListItem, SearchBar } from 'react-native-elements';
import axios from "axios";
import * as yup from 'yup';
import { UseExplorer, GetArtsFromUser } from '../environment/env';
import { useFonts } from 'expo-font';
import { List } from 'react-native-paper';

const state = yup.object({
  items: [],
})

class ExplorePage extends Component {

  //undefined is not an object (evaluating 'this.state.userData.role.toLowerCase

  constructor(props){
    super(props);
    this.state = {
      arts: [],
      items:[],
      page:1,
      totalItems:0,
      isLoading: false,
      messages:[],
      searchField:"",
      processingMoreImages:false,
    }
  }
    /* const [font, fontsLoaded] = useState(true);
    const loadFonts = () => {
      async (dispatch) => {
        await Font.loadAsync({
          'Montserrat_Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        });
      }
      fontsLoaded(true);
    } */
    
    fetchData = async () => {
      const query = "";
      const loadItems = await UseExplorer(query,30,1);
      //const loadItems = await GetArtsFromUser("","desc",1,30);
      console.log(loadItems);
      if(loadItems.data.length > 0){
        this.setState({items:loadItems.data,isLoading:false, totalItems:loadItems.totalCount})
      } else {
        //lOAD EMPTY explorer message
        this.setState({isLoading:false});
      }
    };

    componentDidMount = async() => {
      //old = await this.fetchData();
      await this.Explore();

      const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
      });

      if (!fontsLoaded) {
        return null;
      }
      //document.addEventListener("keydown", this.pressEnter, false);
      //window.addEventListener("scroll", this.handleScroll);
      //this.handleScroll();

    }

    componentWillUnmount() {
      //window.removeEventListener('scroll', this.handleScroll);
      //document.removeEventListener("keydown", this.pressEnter, false);
    }

    pressEnter = async (event) => {
      if (event.keyCode === 13) {
         await this.Explore(this.state.searchField);
      }
    }
  
    Explore = async(query = "") => {
      this.setState({items:[], isLoading:true});
      const loadItems = await UseExplorer(query,30,1);
      //const loadItems = await GetArtsFromUser("","desc",1,30);
      console.log('lines 81: ', loadItems);
      if(loadItems.data.length > 0){
        this.setState({items:loadItems.data,isLoading:false, totalItems:loadItems.totalCount})
      } else {
        //NfeatAlertMessage(loadItems.message, true)
        this.setState({isLoading:false});
      }
    }
  
    LoadMoreItems = async() => {
        this.setState({page: this.state.page+1});
        await this.delay(1200);
        const newItems = await UseExplorer(this.state.searchField,30,this.state.page);
        //const newItems = await GetArtsFromUser("","desc",this.state.page,30);
  
      this.setState({
        items: this.state.items.concat(newItems.data),
        processingMoreImages:false
      });
    }
  
  
    handleScroll = async () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight-500;
      if (bottom && !this.state.processingMoreImages) {
        if(this.state.page <= Math.ceil(this.state.totalItems/30)){
          this.setState({processingMoreImages:true});
          await this.LoadMoreItems();
          await this.delay(1000);
          document.getElementById("mainAreaExplorer").style.width = document.getElementById("mainAreaExplorer").clientWidth-100 +"px";
          document.getElementById("mainAreaExplorer").style.width = document.getElementById("mainAreaExplorer").clientWidth+100 +"px";
        }
      }
    }
  
    delay = async (time) => {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    ViewArt = (art) => {
      navigation.navigate('Details');
    }
    
    render(){
      return(
        <ScrollView style={{backgroundColor: '#000'}}>
            <StatusBar style={styles.status} 
                animated={true} 
                barStyle={'light-content'} />
                <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                <View style={{flex: 1, top: 42}}>
                  <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                </View> 
                <View style={[styles.explore, {top: 40}]}>
                    <View style={styles.head}>
                      <Text style={styles.title}>EXPLORER</Text>
                    </View>
                    <View style={{width: '95%', marginTop: 5}}>

                    <View style={[styles.centerSearch, {marginTop: 10}]}>
                       <Image style={styles.searchicon} source={require('../../assets/imgs/black/png/loupe.png')} />
                       <TextInput style={styles.searchbar} placeholder="Buscar artes, artistas e galerias..." placeholderTextColor="#30303080" nChangeEvent={(e) => this.setState({searchField:e.target.value})} />
                    </View>
                    
                    </View>
                    <View style={styles.areaItens}>
                    {this.state.items.length > 0 && this.state.items.map((art,i) =>
                      <TouchableOpacity key={i} style={styles.card} onPress={() => this.props.navigation.navigate('Details', { id: art.id })}>
                        <Image style={styles.card_art} source={{ uri: `${art.thumbnailUrl}` }} />
                        <View style={styles.card_footer}></View>
                        <View style={styles.card_profile}>
                          {art.artist.profilePicture != null && <Image style={styles.card_profilePic} source={{ uri: `${art.artist.profilePicture}` }} />}
                          {art.artist.profilePicture == null && <Image style={styles.card_profilePic} source={require('../../assets/imgs/avatar/4.jpg')} />}
                        </View>
                        <Text numberOfLines={1} style={styles.card_title}>{art.title}</Text>
                        <View style={styles.byArtist}>
                          <Text style={styles.card_artist}>Por {art.artist.name}</Text>{art.artist.verified && <Image style={styles.card_verified} source={require('../../assets/imgs/outros/check.png')} />}
                        </View>
                      </TouchableOpacity>
                    )}
                    </View>
                    <View style={{justifyContent:'center', alignItems: 'center'}}>
                      <TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', height: 120, justifyContent: 'center', alignItems: 'center' }} onPress={this.LoadMoreItems} >
                        <Image style={{ width: 60, height: 60, marginTop: 5 }} source={require('../../assets/scroll.gif')} />
                        <Text style={styles.titleLoadMore}>Carregar mais</Text>  
                      </TouchableOpacity> 
                    </View>
                </View>
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
    backgroundColor: '#000000'
  },
  logo: { position: 'absolute', left: 20, top: 0, width: 100, height: 55, },
  background: {
    position: 'absolute', width: '100%', height: '60%', right: -400, padding: 400, top: -50, opacity: 0.1,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  explore: { height: '100%', justifyContent: 'center', alignItems: 'center', minHeight: 800 },
  head: { width: '90%', height: 65, marginTop: 85, borderBottomWidth: 4, borderColor: '#FFFFFF40', },
  title: { fontFamily: 'Montserrat-Light', left: 0, fontSize: 26, fontWeight: '500', color: '#FFF', },
  areaItens: { width: "96%", flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 15 },
  card: { width: '46%', margin: 5, minHeight: 260, backgroundColor:"#CCC", borderRadius: 14 },
  card_art: { width: '100%', height: 260, borderRadius: 14 },
  card_footer: { width: '100%', height: 50, position: 'absolute', bottom: 0, backgroundColor: '#000', opacity: 0.5 },
  card_profile: { height: 40, width: 40, borderRadius: 50, left: 0, marginLeft: 5, borderColor: '#FFF', borderWidth: 1, 
    backgroundColor: '#000', marginBottom: 5, position: 'absolute', bottom: 0,  
  },
  card_profilePic: { width: '100%', height: '100%', borderRadius: 50 },
  card_title: { fontSize: 13, marginLeft: 52, color: '#FFF', marginBottom: 25, position: 'absolute', bottom: 0, },
  byArtist: { position: 'absolute', bottom: 0, marginBottom: 7, width: '100%'},
  card_artist: { fontSize: 10, marginLeft: 52, color: '#FFF', },
  card_verified: { width: 15, height: 15, right: 0, top: -3, position: 'absolute', marginRight: 10},
  centerSearch: { justifyContent: 'center', alignItems: 'center' },
  searchbar: { backgroundColor: '#fff', width: '96%', height:60, borderRadius: 15, color: '#303030', fontSize: 15, paddingLeft: 40, },
  searchicon: { width: 22, height: 22, left: 0, position: 'absolute', marginLeft: 15, zIndex: 1000 },
  titleLoadMore: { fontFamily: 'Montserrat-Regular', textAlignd: 'center', color: '#fff', textAlign: 'center', fontSize: 14, top: 2 }
})

export default ExplorePage;