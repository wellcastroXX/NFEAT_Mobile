import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, 
  StyleSheet, FlatList, TextInput, Button, Image, Switch, 
  TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import CheckBox from "expo-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { useFonts } from 'expo-font';
import axios from "axios";
import * as yup from 'yup';
import { CreateArt, AddAttachments, GetLoginData, AddCertificateImage, GetUsers } from "../environment/env";

const schema = yup.object({
  title: yup.string().required("Digite o título"),
  description: yup.string(),
  thumbnailUrl: yup.string(),
  width: yup.string().required("Digite o comprimento"),
  height: yup.string().required("Digite a altura"),
  depth: yup.string(),
  unit: yup.string(),
  medium: yup.string(),
  location: yup.string(),
  creationDate: yup.string(),
  isDigital: yup.boolean(),
  artistName: yup.string(),
  isPrivate: yup.string(),
});

class NewPage extends React.Component{
    /* const navigation = useNavigation(); 
    const [resourcePath, setResourcePath] = useState({});
    const [image, setImage] = useState(null);
    const [isSwitchOn, setPrivate] = useState(false);
    const [medium, setTechnique] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [artLocation, setLocation] = useState('');
    const [condition, setCondition] = useState('');
    const [token_markers, setMarkers] = useState('');

    const [load, setLoad] = useState(false);
    const [registering, setRegisterLoad] = useState(false);
    const [success, setSuccessfull] = useState(false); */
    //

    constructor(props) {
      super(props);
      this.state = {
        userData: null,
        accountAddress: "",
        accountDetails: null,
        load: false,
        registering: false,
        success: false,
        modalVisible: false,
        image: null,
        image2: null,
        imageFileData: "",
        imageFileDataPreview:"",
        token_type: "Registro em Blockchain",
        token_title: "",
        token_title2: "",
        token_artist: "",
        token_creation_date: "",
        token_creation_date2: "",
        token_description: "",
        token_description2: "",
        token_art_medium: "",
        token_altura: "",
        token_largura: "",
        token_status: "",
        token_art_provenance: "",
        token_art_location: "",
        token_art_condition: "",
        token_is_private: false,
        isModalOpen: false,
        //Markers
        token_markers: [],
        errorMessage: "",
        requestSent: false,
        requestProgress: "",
        searchArtists: [],
        createAsArtistId: "",
        isLoading: false,
        changeAccountModal: false,
        artistsOfThisGallery: [],
        galleryMode: false,
        isFancyCreatorModeOn: true,
        fancyCreatorSteps: 1
      };
    }

    componentDidMount = async () => {
      const [fontsLoaded] = useFonts({
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
      });
    
      if (!fontsLoaded) {
        return null;
      }
    }

    //Function Take Photo or Select of Gallery
    selectFile = () => {
      var options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose file from Custom Option'
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, res => {
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          let source = res;
          setResourcePath(source);
        }
      });
    };

    pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };

    removeImage = () => {
      setImage(null);
    }

    submit(data){
      data.isPrivate = isSwitchOn;
      data.depth = 0,
      data.unit = "cm",
      data.isDigital = false,
      data.medium = medium,
      data.location = artLocation,
      console.log(data);
      SendRequest(data)
    }

    SendRequest = async (data) => {
      //Request Arte
      var bodyRequest = {
        "title": this.state.token_title,
        "description": this.state.token_description,
        "thumbnailUrl": this.state.imageFileData,
        "width": parseInt(this.state.token_largura),
        "height": parseInt(this.state.token_altura),
        "depth": 0,
        "unit": "cm",
        "medium": this.state.token_art_medium,
        "location": this.state.token_art_location,
        "creationDate": this.state.token_creation_date,
        "isDigital": false,
        "artistName": this.state.token_artist,
        "isPrivate": this.state.token_is_private
      }
      var bodyRequest = data;
  
      //request Marcadores
      var boddyAttachment = [];
      if (token_markers.length > 0) {
        boddyAttachment = token_markers;
      }
  
      // Registrando arte
      //this.setState({ requestProgress: "Registrando..." })

      try {
        //Fazendo solicitação de registro
        const loading = true;
        setLoad(loading);
        //Registering Art >>>

        setTimeout(function(){
          const registering = true;
          setRegisterLoad(registering)
        }, 2000);

        setTimeout(function(){
          const registering = false;
          const successRegister = true;
          setRegisterLoad(registering);
          setSuccessfull(successRegister);
          AsyncStorage.setItem('NewNotification', '1');
          //
        }, 5500);
        //const registerArt = await CreateArt(bodyRequest);
        //const ArtId = await registerArt.data.id;
        console.log(ArtId);
  
        //Fazendo upload da imagem
        try {
          //this.setState({ requestProgress: "Fazendo upload da imagem..." })
          // const formData = new FormData();
          // formData.append("file", this.state.imageFileData)
          const addCertificate = await AddCertificateImage(ArtId, image);
  
          //Se Existirem marcadores para cadastro
          if (boddyAttachment.length > 0) {
            //tentando adicionar marcadores
            //this.setState({ requestProgress: "Adicionando marcadores..." })
            console.log("Adicionando marcadores...");
            try {
              const registerAttachments = await AddAttachments(registerArt.data.id, boddyAttachment);
              //this.setState({ requestProgress: "", requestSent: true })
              console.log("Request progress = true");
            } catch (e) {
              //this.setState({ errorMessage: e })
              console.log(e);
            }
          } else {
            //this.setState({ requestProgress: "", requestSent: true })
            console.log("Request progress = true, request else");
          }
  
        } catch (e) {
          //sthis.setState({ errorMessage: e })
          console.log(e);
        }
      } catch (e) {
        console.log('fatal error:', e);
      }
  
    }

    BackToDash = () => {
      navigation.navigate('MainContainer'); //MainContainer
    }

    openModal = () => {
      this.state.modalVisible = true;
    }
    closeModal = () => {
      this.state.modalVisible = false;
    }
    
    render(){

      const countries = [{label:"Afghanistan", value:"Afghanistan"},
      {label:"Åland Islands", value:"Åland Islands"},
      {label:"Albania", value:"Albania"},
      {label:"Algeria", value:"Algeria"},
      {label:"American Samoa", value:"American Samoa"},
      {label:"Andorra", value:"Andorra"},
      {label:"Angola", value:"Angola"},
      {label:"Anguilla", value:"Anguilla"},
      {label:"Antarctica", value:"Antarctica"},
      {label:"Antigua and Barbuda", value:"Antigua and Barbuda"},
      {label:"Argentina", value:"Argentina"},
      {label:"Armenia", value:"Armenia"},
      {label:"Aruba", value:"Aruba"},
      {label:"Australia", value:"Australia"},
      {label:"Austria", value:"Austria"},
      {label:"Azerbaijan", value:"Azerbaijan"},
      {label:"Bahamas", value:"Bahamas"},
      {label:"Bahrain", value:"Bahrain"},
      {label:"Bangladesh", value:"Bangladesh"},
      {label:"Barbados", value:"Barbados"},
      {label:"Belarus", value:"Belarus"},
      {label:"Belgium", value:"Belgium"},
      {label:"Belize", value:"Belize"},
      {label:"Benin", value:"Benin"},
      {label:"Bermuda", value:"Bermuda"},
      {label:"Bhutan", value:"Bhutan"},
      {label:"Bolivia", value:"Bolivia"},
      {label:"Bosnia and Herzegovina", value:"Bosnia and Herzegovina"},
      {label:"Botswana", value:"Botswana"},
      {label:"Bouvet Island", value:"Bouvet Island"},
      {label:"Brazil", value:"Brazil"},
      {label:"British Indian Ocean Territory", value:"British Indian Ocean Territory"},
      {label:"Brunei Darussalam", value:"Brunei Darussalam"},
      {label:"Bulgaria", value:"Bulgaria"},
      {label:"Burkina Faso", value:"Burkina Faso"},
      {label:"Burundi", value:"Burundi"},
      {label:"Cambodia", value:"Cambodia"},
      {label:"Cameroon", value:"Cameroon"},
      {label:"Canada", value:"Canada"},
      {label:"Cape Verde", value:"Cape Verde"},
      {label:"Cayman Islands", value:"Cayman Islands"},
      {label:"Central African Republic", value:"Central African Republic"},
      {label:"Chad", value:"Chad"},
      {label:"Chile", value:"Chile"},
      {label:"China", value:"China"},
      {label:"Christmas Island", value:"Christmas Island"},
      {label:"Cocos (Keeling) Islands", value:"Cocos (Keeling) Islands"},
      {label:"Colombia", value:"Colombia"},
      {label:"Comoros", value:"Comoros"},
      {label:"Congo", value:"Congo"},
      {label:"Congo, The Democratic Republic of The", value:"Congo, The Democratic Republic of The"},
      {label:"Cook Islands", value:"Cook Islands"},
      {label:"Costa Rica", value:"Costa Rica"},
      {label:"Cote D'ivoire", value:"Cote D'ivoire"},
      {label:"Croatia", value:"Croatia"},
      {label:"Cuba", value:"Cuba"},
      {label:"Cyprus", value:"Cyprus"},
      {label:"Czech Republic", value:"Czech Republic"},
      {label:"Denmark", value:"Denmark"},
      {label:"Djibouti", value:"Djibouti"},
      {label:"Dominica", value:"Dominica"},
      {label:"Dominican Republic", value:"Dominican Republic"},
      {label:"Ecuador", value:"Ecuador"},
      {label:"Egypt", value:"Egypt"},
      {label:"El Salvador", value:"El Salvador"},
      {label:"Equatorial Guinea", value:"Equatorial Guinea"},
      {label:"Eritrea", value:"Eritrea"},
      {label:"Estonia", value:"Estonia"},
      {label:"Ethiopia", value:"Ethiopia"},
      {label:"Falkland Islands (Malvinas)", value:"Falkland Islands (Malvinas)"},
      {label:"Faroe Islands", value:"Faroe Islands"},
      {label:"Fiji", value:"Fiji"},
      {label:"Finland", value:"Finland"},
      {label:"France", value:"France"},
      {label:"French Guiana", value:"French Guiana"},
      {label:"French Polynesia", value:"French Polynesia"},
      {label:"French Southern Territories", value:"French Southern Territories"},
      {label:"Gabon", value:"Gabon"},
      {label:"Gambia", value:"Gambia"},
      {label:"Georgia", value:"Georgia"},
      {label:"Germany", value:"Germany"},
      {label:"Ghana", value:"Ghana"},
      {label:"Gibraltar", value:"Gibraltar"},
      {label:"Greece", value:"Greece"},
      {label:"Greenland", value:"Greenland"},
      {label:"Grenada", value:"Grenada"},
      {label:"Guadeloupe", value:"Guadeloupe"},
      {label:"Guam", value:"Guam"},
      {label:"Guatemala", value:"Guatemala"},
      {label:"Guernsey", value:"Guernsey"},
      {label:"Guinea", value:"Guinea"},
      {label:"Guinea-bissau", value:"Guinea-bissau"},
      {label:"Guyana", value:"Guyana"},
      {label:"Haiti", value:"Haiti"},
      {label:"Heard Island and Mcdonald Islands", value:"Heard Island and Mcdonald Islands"},
      {label:"Holy See (Vatican City State)", value:"Holy See (Vatican City State)"},
      {label:"Honduras", value:"Honduras"},
      {label:"Hong Kong", value:"Hong Kong"},
      {label:"Hungary", value:"Hungary"},
      {label:"Iceland", value:"Iceland"},
      {label:"India", value:"India"},
      {label:"Indonesia", value:"Indonesia"},
      {label:"Iran, Islamic Republic of", value:"Iran, Islamic Republic of"},
      {label:"Iraq", value:"Iraq"},
      {label:"Ireland", value:"Ireland"},
      {label:"Isle of Man", value:"Isle of Man"},
      {label:"Israel", value:"Israel"},
      {label:"Italy", value:"Italy"},
      {label:"Jamaica", value:"Jamaica"},
      {label:"Japan", value:"Japan"},
      {label:"Jersey", value:"Jersey"},
      {label:"Jordan", value:"Jordan"},
      {label:"Kazakhstan", value:"Kazakhstan"},
      {label:"Kenya", value:"Kenya"},
      {label:"Kiribati", value:"Kiribati"},
      {label:"Korea, Democratic People's Republic of", value:"Korea, Democratic People's Republic of"},
      {label:"Korea, Republic of", value:"Korea, Republic of"},
      {label:"Kuwait", value:"Kuwait"},
      {label:"Kyrgyzstan", value:"Kyrgyzstan"},
      {label:"Lao People's Democratic Republic", value:"Lao People's Democratic Republic"},
      {label:"Latvia", value:"Latvia"},
      {label:"Lebanon", value:"Lebanon"},
      {label:"Lesotho", value:"Lesotho"},
      {label:"Liberia", value:"Liberia"},
      {label:"Libyan Arab Jamahiriya", value:"Libyan Arab Jamahiriya"},
      {label:"Liechtenstein", value:"Liechtenstein"},
      {label:"Lithuania", value:"Lithuania"},
      {label:"Luxembourg", value:"Luxembourg"},
      {label:"Macao", value:"Macao"},
      {label:"Macedonia, The Former Yugoslav Republic of", value:"Macedonia, The Former Yugoslav Republic of"},
      {label:"Madagascar", value:"Madagascar"},
      {label:"Malawi", value:"Malawi"},
      {label:"Malaysia", value:"Malaysia"},
      {label:"Maldives", value:"Maldives"},
      {label:"Mali", value:"Mali"},
      {label:"Malta", value:"Malta"},
      {label:"Marshall Islands", value:"Marshall Islands"},
      {label:"Martinique", value:"Martinique"},
      {label:"Mauritania", value:"Mauritania"},
      {label:"Mauritius", value:"Mauritius"},
      {label:"Mayotte", value:"Mayotte"},
      {label:"Mexico", value:"Mexico"},
      {label:"Micronesia, Federated States of", value:"Micronesia, Federated States of"},
      {label:"Moldova, Republic of", value:"Moldova, Republic of"},
      {label:"Monaco", value:"Monaco"},
      {label:"Mongolia", value:"Mongolia"},
      {label:"Montenegro", value:"Montenegro"},
      {label:"Montserrat", value:"Montserrat"},
      {label:"Morocco", value:"Morocco"},
      {label:"Mozambique", value:"Mozambique"},
      {label:"Myanmar", value:"Myanmar"},
      {label:"Namibia", value:"Namibia"},
      {label:"Nauru", value:"Nauru"},
      {label:"Nepal", value:"Nepal"},
      {label:"Netherlands", value:"Netherlands"},
      {label:"Netherlands Antilles", value:"Netherlands Antilles"},
      {label:"New Caledonia", value:"New Caledonia"},
      {label:"New Zealand", value:"New Zealand"},
      {label:"Nicaragua", value:"Nicaragua"},
      {label:"Niger", value:"Niger"},
      {label:"Nigeria", value:"Nigeria"},
      {label:"Niue", value:"Niue"},
      {label:"Norfolk Island", value:"Norfolk Island"},
      {label:"Northern Mariana Islands", value:"Northern Mariana Islands"},
      {label:"Norway", value:"Norway"},
      {label:"Oman", value:"Oman"},
      {label:"Pakistan", value:"Pakistan"},
      {label:"Palau", value:"Palau"},
      {label:"Palestinian Territory, Occupied", value:"Palestinian Territory, Occupied"},
      {label:"Panama", value:"Panama"},
      {label:"Papua New Guinea", value:"Papua New Guinea"},
      {label:"Paraguay", value:"Paraguay"},
      {label:"Peru", value:"Peru"},
      {label:"Philippines", value:"Philippines"},
      {label:"Pitcairn", value:"Pitcairn"},
      {label:"Poland", value:"Poland"},
      {label:"Portugal", value:"Portugal"},
      {label:"Puerto Rico", value:"Puerto Rico"},
      {label:"Qatar", value:"Qatar"},
      {label:"Reunion", value:"Reunion"},
      {label:"Romania", value:"Romania"},
      {label:"Russian Federation", value:"Russian Federation"},
      {label:"Rwanda", value:"Rwanda"},
      {label:"Saint Helena", value:"Saint Helena"},
      {label:"Saint Kitts and Nevis", value:"Saint Kitts and Nevis"},
      {label:"Saint Lucia", value:"Saint Lucia"},
      {label:"Saint Pierre and Miquelon", value:"Saint Pierre and Miquelon"},
      {label:"Saint Vincent and The Grenadines", value:"Saint Vincent and The Grenadines"},
      {label:"Samoa", value:"Samoa"},
      {label:"San Marino", value:"San Marino"},
      {label:"Sao Tome and Principe", value:"Sao Tome and Principe"},
      {label:"Saudi Arabia", value:"Saudi Arabia"},
      {label:"Senegal", value:"Senegal"},
      {label:"Serbia", value:"Serbia"},
      {label:"Seychelles", value:"Seychelles"},
      {label:"Sierra Leone", value:"Sierra Leone"},
      {label:"Singapore", value:"Singapore"},
      {label:"Slovakia", value:"Slovakia"},
      {label:"Slovenia", value:"Slovenia"},
      {label:"Solomon Islands", value:"Solomon Islands"},
      {label:"Somalia", value:"Somalia"},
      {label:"South Africa", value:"South Africa"},
      {label:"South Georgia and The South Sandwich Islands", value:"South Georgia and The South Sandwich Islands"},
      {label:"Spain", value:"Spain"},
      {label:"Sri Lanka", value:"Sri Lanka"},
      {label:"Sudan", value:"Sudan"},
      {label:"Suriname", value:"Suriname"},
      {label:"Svalbard and Jan Mayen", value:"Svalbard and Jan Mayen"},
      {label:"Swaziland", value:"Swaziland"},
      {label:"Sweden", value:"Sweden"},
      {label:"Switzerland", value:"Switzerland"},
      {label:"Syrian Arab Republic", value:"Syrian Arab Republic"},
      {label:"Taiwan", value:"Taiwan"},
      {label:"Tajikistan", value:"Tajikistan"},
      {label:"Tanzania, United Republic of", value:"Tanzania, United Republic of"},
      {label:"Thailand", value:"Thailand"},
      {label:"Timor-leste", value:"Timor-leste"},
      {label:"Togo", value:"Togo"},
      {label:"Tokelau", value:"Tokelau"},
      {label:"Tonga", value:"Tonga"},
      {label:"Trinidad and Tobago", value:"Trinidad and Tobago"},
      {label:"Tunisia", value:"Tunisia"},
      {label:"Turkey", value:"Turkey"},
      {label:"Turkmenistan", value:"Turkmenistan"},
      {label:"Turks and Caicos Islands", value:"Turks and Caicos Islands"},
      {label:"Tuvalu", value:"Tuvalu"},
      {label:"Uganda", value:"Uganda"},
      {label:"Ukraine", value:"Ukraine"},
      {label:"United Arab Emirates", value:"United Arab Emirates"},
      {label:"United Kingdom", value:"United Kingdom"},
      {label:"United States", value:"United States"},
      {label:"United States Minor Outlying Islands", value:"United States Minor Outlying Islands"},
      {label:"Uruguay", value:"Uruguay"},
      {label:"Uzbekistan", value:"Uzbekistan"},
      {label:"Vanuatu", value:"Vanuatu"},
      {label:"Venezuela", value:"Venezuela"},
      {label:"Viet Nam", value:"Viet Nam"},
      {label:"Virgin Islands, British", value:"Virgin Islands, British"},
      {label:"Virgin Islands, U.S.", value:"Virgin Islands, U.S."},
      {label:"Wallis and Futuna", value:"Wallis and Futuna"},
      {label:"Western Sahara", value:"Western Sahara"},
      {label:"Yemen", value:"Yemen"},
      {label:"Zambia", value:"Zambia"},
      {label:"Zimbabwe", value:"Zimbabwe"}];

      return(
        <SafeAreaView style={styles.container}>
          {this.load && (<View style={styles.screenLoad}>       
            {this.registering && <ActivityIndicator style={styles.load} size="large" color="#A72698" />}
            {this.success && <View style={styles.screenLoad}>
              <View>
                <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                <View style={{flex: 1 }}>
                  <Image style={[styles.logo, {position: 'absolute', left: 0, marginLeft: -15}]} source={require('../../assets/logo/logo_white.png')} />
                </View> 
                <View style={{height: '100%', width:'100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Image style={styles.ElementSuccessfull} source={require('../../assets/imgs/elements/Twist_11.png')}/>
                  <Text style={styles.titleSuccess}>SEU CERTIFICADO FOI {"\n"} CRIADO COM SUCESSO!</Text>
                  <View style={styles.badgeInWait}><Text style={styles.titlebadge}>PENDENTE DE ENVIO</Text></View>
                  <Text style={styles.descriptionSucessfull}>Por segurança, armazenamos seu certificado{"\n"}na aba rascunho em seu dashboard. Você{"\n"}poderá editá-lo a vontade antes de publicá-lo.</Text>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.BtnFinish} onPress={BackToDash}>
                      <Image style={styles.iconBtnFinish} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                      <Text style={styles.textBtnFinish}>VOLTAR PARA O DASHBOARD</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View> }
           </View>)}
           {!this.success && <ScrollView>
            <StatusBar style={styles.status} 
                animated={true} 
                barStyle={'light-content'} />
                <Modal
                    animationType="slide"
                    transparent={true} 
                    visible={this.state.modalVisible}
                    onRequestClose={this.closeModal}
                    >
                    <View style={styles.centeredView}>
                      <ScrollView>
                        <View style={styles.modalView}>
                          <Text style={styles.modalText}>Novo Marcador em</Text>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => !this.state.modalVisible}
                          >
                          <Image style={styles.closemodal} source={require('../../assets/imgs/white/png/close.png')} />
                          </Pressable>
                          <View style={styles.box}>
                            <View style={styles.area}>
                              {!this.image2 && <TouchableOpacity style={styles.areaFile} onPress={this.pickImage}>
                                <Text style={styles.text1area}><Text style={styles.text2area}>Selecione</Text> o arquivo <Text style={styles.text3area}>de mídia aqui</Text></Text>
                                <View style={styles.badgeAreaFile}>
                                  <Text style={[styles.titlebadge, {color:'#fff'}]}>PROCURAR...</Text> 
                                  <Image style={styles.iconbadge} source={require('../../assets/imgs/white/png/search.png')} />
                                </View>
                              </TouchableOpacity>}
                              {this.image2 && <View style={styles.areaFile}>
                                <Image source={{ uri: this.image2 }} style={styles.pickImage} />
                                <TouchableOpacity style={styles.removeFile} onPress={this.removeImage}>
                                  <Text style={styles.titleremove}>REMOVER</Text> 
                                  <Image style={styles.iconremove} source={require('../../assets/imgs/white/png/close.png')} />
                                </TouchableOpacity>
                              </View>}
                              
                            </View>
                          </View>
                          <View style={{marginLeft: 20, width: '88%'}}>
                            <View style={styles.areaModalInput}>
                              <Text style={styles.titleModalInput}>TÍTULO</Text> 
                              <View style={styles.boxinput}>
                                <TextInput style={styles.input} onChangeText={(token_title2) => this.setState({token_title2})} value={this.state.token_title2} onBlur={(token_title2) => this.setState({token_title2})} />
                              </View>
                            </View>
                            <View style={{marginTop: 0}}>
                              <View style={styles.areaModalInput}>
                                <Text style={styles.titleModalInput}>DESCRIÇÃO</Text>
                                <View style={styles.boxinputDescription}>  
                                  <TextInput style={styles.input} onChangeText={(token_description2) => this.setState({token_description2})} value={this.state.token_description2} onBlur={(token_description2) => this.setState({token_description2})}/>
                                </View>
                              </View>
                            </View>
                            <View style={[styles.inputArrayDuo, {marginTop: -50}]}>
                              <View style={styles.areaInputDuo}>
                                <Text style={styles.titleModalInputDuo}>CATEGORIA</Text>
                                <View style={[styles.boxinput, {marginTop: 100}]}> 
                                  <RNPickerSelect onValueChange={(value) => console.log(value)}
                                    placeholder={{
                                      label: 'Selo',
                                      value: 'selo',
                                    }} placeholderTextColor="red"
                                    items={[{ label: "Documento", value: "documento" }, { label: "Depoimento", value: "depoimento" }, ]}
                                  />
                                </View>
                              </View>
                              <View style={[styles.areaInputDuo, {marginTop: 0}]}>
                                <Text style={styles.titleModalInputDuo}>DATA</Text>
                                <View style={[styles.boxinput, {marginTop: 100}]}> 
                                  <TextInput style={styles.input} onChangeText={(token_creation_date2) => this.setState({token_creation_date2})} value={this.state.token_creation_date2} onBlur={(token_creation_date2) => this.setState({token_creation_date2})}/>
                                </View>
                              </View>
                            </View>
                          </View> 
                        </View>
                      </ScrollView>
                    </View>
                </Modal>
                <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                <View style={{flex: 1 }}>
                  <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                </View> 
                <View style={styles.head}>
                  <Text style={styles.title}>NOVO REGISTRO EM BLOCKCHAIN</Text>
                </View>
                <View style={styles.box}>
                  <View style={styles.area}>
                    {!this.image && <TouchableOpacity style={styles.areaFile} onPress={this.pickImage}>
                      <Text style={styles.text1area}><Text style={styles.text2area}>Selecione</Text> o arquivo <Text style={styles.text3area}>de mídia aqui</Text></Text>
                      <View style={styles.badgeAreaFile}>
                        <Text style={[styles.titlebadge, {color: '#fff', marginTop: 8}]}>PROCURAR...</Text> 
                        <Image style={styles.iconbadge} source={require('../../assets/imgs/white/png/search.png')} />
                      </View>
                    </TouchableOpacity>}
                    {this.image && <View style={styles.areaFile}>
                      <Image source={{ uri: this.image }} style={styles.pickImage} />
                      <TouchableOpacity style={styles.removeFile} onPress={removeImage}>
                        <Text style={styles.titleremove}>REMOVER</Text> 
                        <Image style={styles.iconremove} source={require('../../assets/imgs/white/png/close.png')} />
                      </TouchableOpacity>
                    </View>}
                    
                  </View>
                </View>
                <View style={styles.option}>
                  <Text style={styles.titleOption}>TIPO DE REGISTRO</Text>
                  <View style={styles.selectPicker}>
                    <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(value) => console.log(value)}
                          placeholder={{
                            label: 'Selecione',
                            value: 0,
                          }} placeholderTextColor="red"
                          items={[{ label: "Certificado", value: "certificado" }, { label: "Registro em Blockchain", value: "blockchain" }, ]}
                        />
                    </View>
                    <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                  </View>
                </View>
                <View style={styles.text}>
                  <Text style={styles.description}>Descrição: Novo certificado de autenticidade digital da obra. Esses dados serão
                    armazenados em blockchain e serão colocados em sua posse, no endereço cadastrado em sua conta.
                  </Text>
                  <View style={styles.barDiv}></View>
                </View>
                
                <View style={styles.areaInput}>
                  <Text style={styles.titleInput}>TÍTULO</Text>
                  <View style={styles.boxinput}>
                    <TextInput style={styles.input} onChangeText={(token_title) => this.setState({token_title})} value={this.state.token_title} onBlur={(token_title) => this.setState({token_title})} />
                  </View>
                </View>
                <View style={styles.inputArrayDuo}>
                  <View style={styles.areaInputDuo}>
                    <Text style={styles.titleInputDuo}>ARTISTA</Text>
                    <View style={styles.boxinput}>
                      {this.state.userData !== null && this.state.userData.accountDetails.role.toLowerCase() !== "artist" && this.state.createAsArtistId === "" && <Text></Text> }
                      {this.state.userData !== null && this.state.userData.accountDetails.role.toLowerCase() === "artist" && <Text></Text>}
                      {this.state.userData !== null && this.state.createAsArtistId !== "" && <Text></Text> }
                    </View>
                  </View>
                  <View style={styles.areaInputDuo}>
                    <Text style={styles.titleInputDuo}>DATA DE CRIAÇÃO</Text>
                    <View style={styles.boxinput}> 
                      <TextInput style={styles.input} onChangeText={(token_creation_date) => this.setState({token_creation_date})} value={this.state.token_creation_date} onBlur={(token_creation_date) => this.setState({token_creation_date})} />
                    </View>
                  </View>
                </View>

                <View style={{width: '100%'}}><Text style={styles.TextBarDiv}>Detalhes</Text><View style={styles.barDivWithText}></View></View>

                <View style={{marginTop: 40}}>
                  <View style={styles.areaInput}>
                    <Text style={styles.titleInput}>DESCRIÇÃO</Text>
                    <View style={styles.boxinputDescription}>
                       <TextInput style={styles.input} onChangeText={(token_description) => this.setState({token_description})} value={this.state.token_description} onBlur={(token_description) => this.setState({token_description})} />
                    </View>
                  </View>
                  <View style={styles.option}>
                    <Text style={styles.titleOption}>TÉCNICA</Text>
                    <View style={styles.selectPicker}>
                      <View style={styles.picker}>
                        <RNPickerSelect onValueChange={(medium) => setTechnique(medium)}
                              placeholder={{
                                label: 'Selecione',
                                value: 0,
                              }} placeholderTextColor="red"
                              items={[
                                { label: "Painting", value: "painting" },
                                { label: "Photography", value: "photography" },
                                { label: "Sculpture", value: "sculpture" },
                                { label: "Prints", value: "prints" },
                                { label: "Work on Paper", value: "work_on_paper" },
                                { label: "NFT", value: "nft" },
                                { label: "Design", value: "design" },
                                { label: "Drawing", value: "drawing" },
                                { label: "Installation", value: "installation" },
                                { label: "Film/Video", value: "film/video" },
                                { label: "Jewelry", value: "jewelry" },
                                { label: "Perfomance Art", value: "perfomance_art" },
                                { label: "Reproduction", value: "reproduction" },
                                { label: "Ephemera or Merchandise", value: "ephemera_merchandise" },
                              ]}
                         />
                      </View>
                      <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                    </View>
                  </View>
                  <View style={styles.inputArrayDuo}>
                  
                  <View style={styles.areaInputDuo}>
                    <Text style={styles.titleInputDuo}>LARGURA</Text>
                    <View style={styles.boxinput}>
                      <View>
                        <TextInput style={styles.input} placeholder="(cm)" onChangeText={(token_largura) => this.setState({token_largura})} value={this.state.token_largura} onBlur={(token_largura) => this.setState({token_largura})} />
                      </View>
                    </View>
                  </View>
                  <View style={styles.areaInputDuo}>
                    <Text style={styles.titleInputDuo}>ALTURA</Text>
                    <View style={styles.boxinput}> 
                      <View>
                        <TextInput style={styles.input} placeholder="(cm)" onChangeText={(token_altura) => this.setState({token_altura})} value={this.state.token_altura} onBlur={(token_altura) => this.setState({token_altura})}/>
                      </View>
                    </View>
                  </View>
                  </View>
                  <View style={styles.areaInput}>
                    <Text style={styles.titleInput}>PROVENIÊNCIA</Text>
                    <View style={styles.boxinput}> 
                      <TextInput style={styles.input} onChangeText={(token_art_provenance) => this.setState({token_art_provenance})} value={this.state.token_art_provenance} onBlur={(token_art_provenance) => this.setState({token_art_provenance})}/>
                    </View>
                  </View>
                  <View style={styles.option}>
                    <Text style={styles.titleOption}>LOCALIZAÇÃO</Text>
                    <View style={styles.selectPicker}>
                      <View style={styles.picker}>
                          <RNPickerSelect onValueChange={(artLocation) => setLocation(artLocation)} 
                            placeholder={{
                              label: 'Selecione',
                              value: 0,
                            }} placeholderTextColor="red"
                            items={countries}
                          />
                      </View>
                      <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                    </View>
                  </View>
                  <View style={styles.option}>
                    <Text style={styles.titleOption}>CONDIÇÃO</Text>
                    <View style={styles.selectPicker}>
                      <View style={styles.picker}>
                          <RNPickerSelect onValueChange={(token_art_condition) => setCondition(this.state.token_art_condition = token_art_condition)} 
                            placeholder={{
                              label: 'Selecione',
                              value: 0,
                            }} placeholderTextColor="red"
                            items={[{ label: "Nenhum dano", value: "nenhum_dano" }, { label: "Restaurada", value: "restaurada" },]}
                          />
                      </View>
                      <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                    </View>
                  </View>
                </View>

                <View style={{width: '100%'}}><Text style={styles.TextBarDiv}>Marcadores</Text><View style={styles.barDivWithText}></View></View>

                <View style={styles.centerView}>
                  <TouchableOpacity style={styles.btnAddNew} onPress={this.openModal}>
                    <Image style={styles.iconAddnew} source={require('../../assets/imgs/white/png/plus.png')} />
                    <Text style={styles.textAddnew}>ADICIONAR NOVO</Text>
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: 40, marginLeft: 23}}>
                  <View>
                    <Switch trackColor={{ true: 'green', false: 'grey' }} onValueChange={(isSwitchOn) => setPrivate(isSwitchOn)} />
                    <Text style={[styles.titlePrivate,]}>TORNAR ITEM PRIVADO (NÃO SERÁ MOSTRADO NAS BUSCAS)</Text>
                  </View>
                </View>

                <View style={styles.centerView}>
                  {this.state.token_art_condition == 0 && <TouchableOpacity style={styles.sendRequestDisabled} >
                    <Text style={styles.textsend}>ENVIAR PEDIDO</Text>
                    <Image style={styles.iconsend} source={require('../../assets/imgs/white/png/long-arrow-right.png')} />
                  </TouchableOpacity>}
                  {this.state.token_art_condition != 0 && <TouchableOpacity style={styles.sendRequest} onPress={handleSubmit(submit)}>
                    <Text style={styles.textsend}>ENVIAR PEDIDO</Text>
                    <Image style={styles.iconsend} source={require('../../assets/imgs/white/png/long-arrow-right.png')} />
                  </TouchableOpacity>}
                </View>

                <View style={styles.bottom}></View>
           </ScrollView>}
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
  centeredView: { position: 'absolute', top: '10%', width: '100%', backgroundColor: '#ccc', height: '100%', borderTopLeftRadius: 23, borderTopRightRadius: 23 },
  modalView: { minHeight: 1000, height: '100%', },
  logo: { position: 'absolute', left: 20, top: 0, width: 100, height: 55, },
  background: {
    position: 'absolute', width: '100%', height: '100%', right: -400, padding: 500, top: -50, opacity: 0.1,
  },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', },
  centerView: { justifyContent: 'center', alignItems: 'center' },
  explore: { height: '100%', justifyContent: 'center', alignItems: 'center' },
  head: { width: '90%', height: 65, marginTop: 85, },
  title: { fontFamily: 'Montserrat-Light', left: 20, fontSize: 20, color: '#FFF', top: 0 },
  box: { justifyContent: 'center', alignItems: 'center' },
  area:{ width: '90%', height: 300, backgroundColor: '#CCC', borderRadius: 20, justifyContent: 'center', alignItems: 'center', opacity: 0.9 },
  areaFile: { borderColor: '#00000080', borderRadius: 20, borderWidth: 2, width: '88%', height: '88%', borderStyle: 'dashed', position: 'absolute',
    textAlign: 'center', alignItems: 'center', justifyContent: 'center'
  },
  text1area: { fontFamily: 'Montserrat-Regular', fontSize: 18, color: '#141414', width: '60%', textAlign: 'center', marginTop: -15 },
  text2area: { fontFamily: 'Montserrat-Bold', fontSize: 18,  color: '#141414', },
  text3area: { fontFamily: 'Montserrat-Regular', fontSize: 28, color: '#141414', },
  badgeAreaFile: { width: '60%', height: 34, backgroundColor: '#A72698',textAlign: 'center', color: '#FFF', fontSize: 15, borderRadius: 30, marginTop:'10%'},
  titlebadge: { fontFamily: 'Montserrat-Regular', left:0, marginLeft: '14%', color: '#FFF', fontSize: 15, marginTop: 8, },
  iconbadge: { width: 30, height: 30, right: 0, marginRight: 10, marginTop: 2, position: 'absolute' },
  option: { marginTop: 15, justifyContent: 'center', alignItems: 'center' },
  titleOption: { fontFamily: 'Montserrat-Regular', left:0, fontSize: 15, color: '#FFF', marginLeft: 35, width: '100%' },
  selectPicker: { width: '90%', height: 60, borderRadius:14, backgroundColor: '#FFF', marginTop: 10, },
  picker: { width:'97.2%', marginLeft: 10, marginTop: 0, color: '#141414' },
  iconPicker: { position: 'absolute', right: 0, marginRight: 10, marginTop: 17, width: 28, height: 28 },
  text: { marginTop: 14, textAlign: 'left',width: '100%', justifyContent: 'center', alignItems: 'center' },
  description: { fontFamily: 'Montserrat-Regular',  fontSize: 15, color: '#FFF', marginLeft: 18, width: '94%',},
  barDiv: { backgroundColor: '#FFF', opacity: 0.5, width: '90%', height: 3, borderRadius: 10, marginTop: 16 },
  barDivWithText: { backgroundColor: '#FFF', opacity: 0.5, right: 25, width: '65%', position: 'absolute', height: 3, borderRadius: 10, marginTop: 32 }, 
  TextBarDiv: { fontFamily: 'Montserrat-Regular', textAlign: 'left', width: '30%', marginLeft: 10, color: '#FFF', left: 6, fontSize: 18, color: '#FFF', position: 'absolute', marginTop: 20 },
  areaInput: { marginTop: 18, justifyContent: 'center', alignItems:'center' },
  areaModalInput: { marginTop: 18, justifyContent: 'center', alignItems:'center' },
  titleInput: {  fontFamily: 'Montserrat-Regular', textAlign: 'left', width: '100%', marginLeft: 10, color: '#FFF', fontSize: 15, marginLeft: 35, },
  titleModalInput: {  fontFamily: 'Montserrat-Regular', textAlign: 'left', width: '100%', marginLeft: 10, color: '#141414', fontSize: 15, marginLeft: 35, },
  input: { width: '100%', height: 60, fontSize: 14, fontWeight: '500', color: "#141414" ,paddingLeft: 6, },
  boxinput: { width: '90%', height: 60, borderRadius:14, backgroundColor: '#FFF', marginTop: 10, },
  boxinputDescription: { width: '90%', height: 120, borderRadius:14, backgroundColor: '#FFF', marginTop: 10, },
  containerSelect: { flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  pickImage: {  width: '94%', height: 200, borderRadius: 12, },
  removeFile: { width: '50%', height: 34, backgroundColor: 'transparent', textAlign: 'center', color: '#FFF', fontSize: 15, 
    borderRadius: 30, marginTop:'5%', borderWidth: 1, borderColor: '#FFF' },
  titleremove: { textAlign: 'center' ,left:0, marginLeft: '-15%', color: '#FFF', fontSize: 15, marginTop: 8, },
  iconremove: { width: 30, height: 30, right: 0, marginRight: 12, marginTop: 2, position: 'absolute' },
  inputArrayDuo: { width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10,},
  areaInputDuo: { width: '47.5%', justifyContent: 'center', alignItems:'center' }, 
  titleInputDuo: { textAlign: 'left', width: '100%', marginLeft: 10, color: '#FFF', fontSize: 15, marginLeft: 20, },
  titleModalInputDuo: { left: 0, marginLeft: 10, position: 'absolute', color: '#141414', fontSize: 15, },
  btnAddNew: { backgroundColor: 'transparent', borderColor: '#FFF', borderWidth: 1, borderRadius: 12, width: '90%', height: 60, 
    justifyContent: 'center', alignItems: 'center', marginTop: 60
  },
  iconAddnew: { width: 15, height: 15, position: 'absolute', left: 0, marginLeft: '5%', position: 'absolute' },
  textAddnew: { textAlign: 'center', fontSize: 14, color: '#FFF', fontWeight: '500', marginTop: 10, position: 'absolute' },
  titlePrivate: { fontSize: 15, color: '#FFF', left: 70, top: -30, width: '75%' },
  sendRequestDisabled: { backgroundColor: 'grey', width: '90%', height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 30 },
  sendRequest: { backgroundColor: "#A72698", width: '90%', height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 30 },
  textsend: { fontSize: 16, textAlign: 'center', color: '#fff' },
  iconsend: { width: 43, height: 42, right: 5, position: 'absolute' },
  bottom: { height: 100, width: '100%' },
  modalText: { fontFamily: 'Montserrat-Regular', fontSize: 22, marginTop: 15, left: 40, }, 
  closemodal: { width: 32, height: 32, right: 0, marginRight: 15, marginTop: -30, position: 'absolute' },
  screenLoad: { width: '100%', height: '100%', backgroundColor: '#00000080', position: 'absolute', zIndex: 2000, justifyContent: 'center', alignItems: 'center' },
  load: { position: 'absolute', zIndex: 2001, top: '46%', },
  titleSuccess: { fontSize: 22, fontWeight: 'bold',color: '#FFF', textAlign: 'center', marginTop: 250, },
  ElementSuccessfull: { width: '65%', padding:100, left: 15, height: '35%', top: 88, position: 'absolute' },
  badgeInWait: { backgroundColor: '#FFD700', width: 160, height: 30, marginTop: 10, borderRadius: 30, },
  titlebadge: { color: '#141414', opacity: 0.9, marginTop: 6, textAlign: 'center', fontSize: 14, },
  descriptionSucessfull: { color: '#FFF', opacity: 0.7, textAlign: 'center', marginTop: 20, fontSize: 15, },
  BtnFinish: { backgroundColor: 'transparent', width: 200, height: 50, borderRadius: 30, borderWidth: 1, borderColor: '#FFF', marginTop: 50 },
  iconBtnFinish: { left: 10, position: 'absolute', marginTop: 10, width: 26, height: 26 },
  textBtnFinish: { color: '#FFF', fontSize: 15, textAlign: 'center', marginTop: 6 },
})

export default NewPage;