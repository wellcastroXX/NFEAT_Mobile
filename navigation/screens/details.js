import React, { useState, useEffect, Component } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, FlatList, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import axios from "axios";
import * as yup from 'yup';
import { GetArt, GetLoginData, EthAddressAbbr, PublishCertificate } from "../environment/env";
import RNPickerSelect from "react-native-picker-select";
import { format } from 'date-fns';

const state = yup.object({
  items: [],
});

class DetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      item: [],
      artist: [],
      owner: [],
      itemLoaded: false,
      historyFilter: "",
      projetoNfeat: false,
      notFound: false,
      publishThisItem: false,
      loadingState: false,
      itemsData: [],
      allAttachments: [],
    };
    //
    this.state.id = props.route.params.id
    console.log(this.state.id);
  }

  componentDidMount = async () => {
    this.LoadArt();

    const [fontsLoaded] = useFonts({
      'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    });

    if (!fontsLoaded) {
      return null;
    }
  }

  delay = async (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  LoadArt = async () => {
    await this.delay(500);
    const itemRes = await GetArt(this.state.id);
    const data = itemRes;
    if (data.statusCode !== 404) {
      console.log(data)
      this.setState({ item: data, itemLoaded: true, itemsData: data.provenance, allAttachments: data.attachments });
      //Artist Object
      this.setState({ artist: data.artist });
      //Owner Object
      this.setState({ owner: data.owner });
    } else {
      this.setState({ itemLoaded: true, notFound: true });
      NfeatAlertMessage(`[${data.statusCode}] ${data.message}`, true)
    }
  }

  filterHistory = (res, filter) => {
    if (this.state.historyFilter !== "") {
      res = res.filter((f) => f.category === filter)
    }
    return res;
  }

  RestartArt = () => {
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 1000)
  }

  // Publicar Certificado
  PublishThisItem = async () => {
    this.setState({ loadingState: true })
    const publishItem = await PublishCertificate(this.state.item.id).then((res) => {
      this.setState({ loadingState: false })
      if (res.status === 201) {
        NfeatAlertMessage("Certificado publicado com sucesso!", false);
        window.location.href = window.location.href;
      } else {
        NfeatAlertMessage(res.message, true);
      }
    })
  }

  Back = () => {
    this.props.navigation.goBack();
  }

  render() {

    const pickerStyle = {
      inputIOS: {
        color: 'white',
        fontSize: 16,
        paddingTop: 0,
        paddingHorizontal: 10,
        paddingBottom: 12,
        marginLeft: 0, width: '100%', height: 50, marginTop: -10,
      },
      inputAndroid: {
        color: 'white',
      },
      placeholderColor: 'white',
      underline: { borderTopWidth: 0 },
      icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
      },
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ height: '100%', padding: 10 }}>
          <StatusBar style={styles.status}
            animated={true}
            barStyle={'light-content'} />
          <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')} />
          <TouchableOpacity style={styles.back} onPress={this.Back} >
            <Image source={require('../../assets/imgs/white/png/arrow-left.png')} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
          </View>

          <View style={styles.body}>
            <View style={styles.ArtFrame}>
              <View style={styles.Frame}>
                <Image style={styles.Art} source={{ uri: `${this.state.item.thumbnailUrl}` }} />
              </View>
            </View>
            <View style={styles.infoUser}>
              <View style={styles.UserPhoto}>
                {this.state.artist.profilePicture != null && <Image style={styles.UserPic} source={{ uri: `${this.state.artist.profilePicture}` }} />}
                {this.state.artist.profilePicture == null && <Image style={styles.UserPic} source={require('../../assets/imgs/avatar/4.jpg')} />}
              </View>
              <Text numberOfLines={1} style={styles.title}>{this.state.item.title}</Text>
              {this.state.item.verified == true && 
              <View style={styles.badgeCertified}>
                <Image  style={styles.iconCertified} source={require('../../assets/imgs/white/png/nfeat-project.png')} />
                <Text style={styles.titleCertified}>Registro Certificado</Text>
              </View>}
              <Text style={styles.by}>Por {this.state.item.artistName} <Image style={styles.checkedUser} source={require('../../assets/imgs/outros/check.png')} /></Text>
            </View>
            <View style={[styles.barDiv, {marginTop: 20}]}></View>

            <View style={styles.infoPossession}>
              <View style={styles.UserPossession}>
                {this.state.artist.profilePicture != null && <Image style={styles.UserPicPoss} source={{ uri: `${this.state.artist.profilePicture}` }} />}
                {this.state.artist.profilePicture == null && <Image style={styles.UserPicPoss} source={require('../../assets/imgs/avatar/4.jpg')} />}
              </View>
              <Text style={styles.possessionBy}>Em posse de:</Text>
              <Text style={styles.AddressPossession}>{this.state.owner.publicAddress || ''}</Text>
            </View>

            <View style={styles.barDiv}></View>

            <View style={styles.ArtDescription}>
              <Text style={styles.titleDescription}>Descrição</Text>
              <Text numberOfLines={4} style={styles.textDescription}>{this.state.item.description || ''}</Text>
            </View>

            <View style={styles.specifications}>
              <View style={[styles.arrayDetails]}>
                {this.state.item.height != 0 && <View style={styles.leftDetails}>
                  <Image style={styles.iconDetails} source={require('../../assets/imgs/white/png/dimension.png')} />
                  <Text style={[styles.textDetails, { fontFamily: 'Montserrat-Light', fontSize: 12 }]}>MEDIDAS</Text>
                  <Text style={[styles.valueDetails, { fontFamily: 'Montserrat-Regular', fontSize: 15 }]}>{this.state.item.height || ''}x{this.state.item.width || ''}</Text>
                </View>}
                {this.state.item.medium != null && <View style={styles.rightDetails}>
                  <Image style={styles.iconDetails} source={require('../../assets/imgs/white/png/brush.png')} />
                  <Text style={[styles.textDetails, { fontFamily: 'Montserrat-Light', fontSize: 12 }]}>TÉCNICA</Text>
                  <Text style={[styles.valueDetails, { fontFamily: 'Montserrat-Regular', fontSize: 15 }]}>{this.state.item.medium || ''}</Text>
                </View>}
              </View>
              <View style={styles.arrayDetails}>
                {this.state.item.creationDate != null && <View style={[styles.leftDetails, { marginTop: 20 }]}>
                  <Image style={styles.iconDetails} source={require('../../assets/imgs/white/png/calendar.png')} />
                  <Text style={[styles.textDetails, { fontFamily: 'Montserrat-Light', fontSize: 12 }]}>CRIAÇÃO</Text>
                  <Text style={[styles.valueDetails, { fontFamily: 'Montserrat-Regular', fontSize: 15 }]}>{this.state.item.creationDate || ''}</Text>
                </View>}
                {this.state.item.location != null && <View style={[styles.rightDetails, { marginTop: 20 }]}>
                  <Image style={styles.iconDetails} source={require('../../assets/imgs/white/png/location.png')} />
                  <Text style={[styles.textDetails, { fontFamily: 'Montserrat-Light', fontSize: 12 }]}>LOCALIZAÇÃO</Text>
                  <Text style={[styles.valueDetails, { fontFamily: 'Montserrat-Regular', fontSize: 15 }]}>{this.state.item.location || ''}</Text>
                </View>}
              </View>
              <View style={styles.arrayDetails}></View>
            </View>

            <View style={styles.areaDetails}>
              <View style={styles.badgeDetails}>
                <Text style={styles.textDetails}>DETALHES</Text>
              </View>

              <View style={styles.containerDetails}>
                <View style={[styles.row, { marginTop: 35 }]}>
                  <Text style={styles.titleSession}>Histórico</Text>
                  <View style={styles.divBar}></View>
                </View>

                <View style={styles.filterby}>
                  <View style={styles.filterPick}>
                    <RNPickerSelect style={pickerStyle}
                      placeholder={{ label: "Filtrar por: ", value: null }}
                      onValueChange={(value) => console.log(value)}
                      items={[
                        { label: "Filtrar por: Todos", value: "todos" },
                        { label: "Filtrar por: Mercado Primária", value: "mercadoprimario" },
                        { label: "Filtrar por: Mercado Secundário", value: "mercadosecundario" },
                        { label: "Filtrar por: Doações", value: "doacoes" },
                        { label: "Filtrar por: Outros", value: "outros" },
                        { label: "Filtrar por: Registros", value: "registros" },
                      ]}
                    />
                  </View>
                  <Image style={styles.iconPicker} source={require('../../assets/imgs/white/png/arrow-up.png')} />
                </View>

                <View style={styles.areaHistoric}>
                  <View>
                    {this.filterHistory(this.state.itemsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)), this.state.historyFilter).map((tr, i) =>
                      <View key={i} >
                        {tr.category === "REGISTRATION" && <View ><View style={styles.detailHistoryitem}>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/eth2.png')} />
                        </View>
                          <View>
                            <Text style={styles.tokenArt}>Arte tokenizada por {EthAddressAbbr(tr.from)}</Text>
                          </View>
                        </View>}
                        {tr.category === "PRIMARY_SALE" && <View ><View style={styles.detailHistoryitem}>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/listing.png')} /></View>
                          <View>
                            <Text style={styles.tokenArt}>Vendida (mercado primário) por {EthAddressAbbr(tr.from)} para {EthAddressAbbr(tr.to)}</Text>
                          </View>
                        </View>}
                        {tr.category === "SECONDARY_SALE" && <View ><View style={styles.detailHistoryitem}>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/listing.png')} /></View>
                          <View>
                            <Text style={styles.tokenArt}>Vendida (mercado secundário) por {EthAddressAbbr(tr.from)} para {EthAddressAbbr(tr.to)}</Text>
                          </View>
                        </View>}
                        {tr.category === "DONATION" && <View ><View style={styles.detailHistoryitem}>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/listing.png')} /></View>
                          <View>
                            <Text style={styles.tokenArt}>Doada por {EthAddressAbbr(tr.from)} para {EthAddressAbbr(tr.to)}</Text>
                          </View>
                        </View>}
                        {tr.category === "OTHER" && <View ><View style={styles.detailHistoryitem}>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/listing.png')} /></View>
                          <View>
                            <Text style={styles.tokenArt}>Transferida por {EthAddressAbbr(tr.from)} para {EthAddressAbbr(tr.to)}</Text>
                          </View>
                        </View>}
                        {/* {this.filterHistory(this.state.item.provenance).length > 0 && i+1 !== this.state.item.provenance.length && <View ></View>} */}
                      </View>
                    )}
                    {this.state.historyFilter === "" && <View >
                      <View style={styles.lineDotted}>
                        <View style={styles.itemDotted}></View>
                        <View style={styles.itemDotted}></View>
                        <View style={styles.itemDotted}></View>
                        <View style={styles.itemDotted}></View>
                      </View>
                      <View style={{marginTop: -20, marginBottom: 20}}>
                        <View>
                          <Image style={styles.icontokenArt} source={require('../../assets/imgs/black/png/brush2.png')} />
                        </View>
                        <View>
                          <Text style={styles.tokenArt}>{this.state.item.title} {"\n"}foi criada por {this.state.item.artistPublicAddress !== undefined ? 
                          <Text>{this.state.item.artistName}</Text> : <Text>{this.state.item.artistName}</Text> }</Text>
                          </View>
                      </View>
                    </View>}
                  </View>
                </View>

                <View style={[styles.row, { marginTop: 35 }]}> 
                  <Text style={styles.titleSession}>Marcadores e Documentos  <View style={styles.badgeQtd}><Text style={styles.qtdAttach}>{this.state.allAttachments.filter((e) => e.type !== "OWNER_BRIEFINGS").length}</Text></View></Text>
                  <View style={styles.divBar2}></View>
                </View>

                {this.state.allAttachments.filter((e) => e.type !== "OWNER_BRIEFINGS").length > 0 &&
                  this.state.allAttachments.filter((e) => e.type !== "OWNER_BRIEFINGS").map((am, i) =>
                    (<View style={styles.boxDocuments}>
                      <Image style={styles.iconDocuments} source={require('../../assets/imgs/white/png/images.png')} />
                      <Text style={styles.titleDocuments1}>{am.name}</Text>
                      <Text style={styles.addbyDocuments1}>Adicionado por {am.addedBy.substring(0,5)+"..."+am.addedBy.substring(36)}</Text>
                    </View>))}

              </View>

            </View>

            <View style={styles.bottomPage}></View>

          </View>

        </ScrollView>
      </SafeAreaView>
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
  header: { justifyContent: 'center', alignItems: 'center' },
  logo: { top: -55, width: 100, height: 55, position: 'absolute' },
  background: {
    position: 'absolute', width: '100%', height: '100%', right: -400, padding: 500, top: -50, opacity: 0.1,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  explore: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  head: { width: '90%', height: 65, marginTop: 85, borderBottomWidth: 4, borderColor: '#3f3f3f', },
  //
  infoUser: { height: 100, width: '100%', marginTop: 20 },
  UserPhoto: {
    height: 82, width: 82, borderRadius: 50, backgroundColor: "transparent", borderWidth: 2, borderColor: '#fff',
    marginTop: 20, marginLeft: 20,
  },
  UserPic: { height: 78, width: 78, borderRadius: 50 },
  body: { justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', top: 0, marginTop: 0, },
  ArtFrame: {
    width: '90%', height: 450, justifyContent: 'center', alignItems: 'center', borderWidth: 2,
    borderColor: '#666', borderRadius: 10, backgroundColor: 'transparent',
  },
  Frame: { height: '100%', width: '100%' },
  Art: { height: '100%', width: '100%', borderRadius: 8 },
  title: { fontFamily: 'Montserrat-Bold', left: 0, fontSize: 23, fontWeight: '800', color: '#FFF', textAlign: 'left', marginLeft: 120, marginTop: -80, width: '60%'},
  by: { fontFamily: 'Montserrat-Light', left: 0, fontSize: 14, fontWeight: '500', color: '#FFF', textAlign: 'left', marginLeft: 120, marginTop: 0 },
  checkedUser: { width: 14, height: 14, top: -50, },
  //
  barDiv: { width: '90%', borderWidth: 1.5, borderColor: '#3f3f3f', borderRadius: 6, marginTop: 4, marginBottom: 4 },
  infoPossession: { height: 50, width: '100%', marginTop: 20 },
  UserPossession: { height: 30, width: 30, borderWidth: 2, borderColor: '#FFF', borderRadius: 50, left: 0, marginLeft: 20 },
  UserPicPoss: { height: 26, width: 26, borderRadius: 50 },
  possessionBy: { fontSize: 14, color: '#FFF', opacity: 0.5, marginLeft: 65, marginTop: -34 },
  AddressPossession: { fontSize: 11, color: '#FFF', marginLeft: 65, marginTop: 3 },
  ArtDescription: { height: 100, width: '100%', marginTop: 5 },
  titleDescription: { fontSize: 16, color: "#FFFFFF", opacity: 0.5, marginLeft: 20, marginTop: 10 },
  textDescription: { textAlign: 'left', fontSize: 14, color: '#FFF', marginTop: 10, marginLeft: 22 },
  specifications: { borderWidth: 2, borderColor: '#3f3f3f', marginTop: 40, width: '90%', height: 186, borderRadius: 20 },
  arrayDetails: { width: '100%', height: 70, display: 'flex', flex: 1, flexDirection: 'row', marginTop: 10, marginBottom: 10 },
  iconDetails: { height: 30, width: 30, top: 6 },
  textDetails: { fontFamily: 'Montserrat-Light', color: '#FFFFFF50', fontSize: 9, },
  valueDetails: { fontFamily: 'Montserrat-Regular', color: '#FFFFFF', fontSize: 14, },
  leftDetails: { width: '50%', height: 70, left: 0, justifyContent: 'center', alignItems: 'center' },
  rightDetails: { width: '50%', height: 70, right: 0, justifyContent: 'center', alignItems: 'center' },
  back: {
    width: 50, height: 50, left: 0, marginLeft: 20, marginTop: 0, borderRadius: 50, backgroundColor: '#3f3f3f',
    justifyContent: 'center', alignItems: 'center'
  },
  iconBack: { width: 20, height: 20 },
  titleSession: { fontSize: 18, color: "#FFFFFF", left: 0, marginLeft: 65 },
  divBar: { width: '54%', height: 2, right: 0, marginTop: 3, marginLeft: 10, backgroundColor: "#fff", opacity: 0.2, borderRadius: 10 },
  divBar2: { width: '15%', height: 2, right: 0, marginTop: 3, marginLeft: 10, backgroundColor: "#fff", opacity: 0.2, borderRadius: 10  },
  divDetails: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', },
  areaDetails: { width: '125%', minHeight: 400, backgroundColor: '#000', marginTop: 80, borderWidth: 2, borderColor: '#3f3f3f', borderBottomColor: 'transparent', },
  badgeDetails: {
    width: 140, height: 45, backgroundColor: '#000', borderWidth: 2, borderColor: '#3f3f3f', marginLeft: 70, marginTop: -44, borderTopLeftRadius: 10,
    borderTopRightRadius: 10, borderBottomColor: 'transparent',
  }, textDetails: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: '300', marginTop: 10 },
  containerDetails: { alignItems: 'center', justifyContent: 'center' },
  filterby: { width: '72%', height: 50, borderRadius: 30, marginTop: 20, backgroundColor: '#333333' },
  filterPick: { marginLeft: 20, width: '80%', height: 50, marginTop: 15, color: '#fff' },
  pickerSelect: { textAlign: 'center', fontSize: 18, fontWeight: '400', color: '#fff' },
  iconPicker: { position: 'absolute', right: 0, width: 23, height: 23, marginRight: 10, marginTop: 14, transform: [{ rotate: '180deg' }] },
  areaHistoric: { backgroundColor: '#202020', width: '72%', borderRadius: 10, minHeight: 130, marginTop: 25, },
  detailHistoryitem: { height: 40, backgroundColor: 'transparent', width: '100%', marginTop: 10, flexDirection: 'row' },
  tokenArt: { color: '#fff', position: 'absolute', textAlign: 'left', fontSize: 14, marginLeft: 50, marginTop: -30, },
  icontokenArt: { width: 32, height: 32, marginLeft: 20, marginTop: 14 },
  lineDotted: { height: 50, width: 10, left: 34, marginTop: 16 },
  itemDotted: { width: 4, height: 4, borderRadius: 100, marginBottom: 5, backgroundColor: '#666', },
  badgeQtd: { backgroundColor: '#333', width: 30, height: 20, borderRadius: 30, top: 20, justifyContent: 'center', alignItems: 'center' },
  qtdAttach: { textAlign: 'center', fontSize: 14, fontWeight: 'bold', color: '#fff' },
  boxDocuments: { backgroundColor: 'transparent', width: '72%', height: 80, borderRadius: 10, borderWidth: 2, borderColor: '#333', marginTop: 15, },
  iconDocuments: { width: 32, height: 32, marginLeft: 20, marginTop: 15, },
  titleDocuments1: { marginLeft: 52, marginTop: -28, fontSize:20, fontWeight: 'bold', color: '#fff' },
  addbyDocuments1: { marginLeft: 52, fontSize: 14, fontWeight: '200', color: '#fff' },
  bottomPage: { height: 300, width: '100%', padding: 100, backgroundColor: 'transparent' },
  badgeCertified: { height: 30, width: '50%', marginLeft: 120, backgroundColor: '#B38326', borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 5 },
  titleCertified: { fontFamily: 'Montserrat-Light', color: '#fff', textAlign: 'center', fontSize: 14, left:10 },
  iconCertified: { width: 20, height: 20, position: 'absolute', left: 7 },
})

export default DetailsPage;