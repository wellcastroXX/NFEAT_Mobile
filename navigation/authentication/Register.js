import React, { useState, Component, useEffect } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Picker, TouchableHighlight ,Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import RNPickerSelect from "react-native-picker-select";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SignupUser } from "../environment/env";
import { useFonts } from 'expo-font';
import { DateInput } from 'react-native-date-input';
import dayjs from 'dayjs';

class RegisterPage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      signed: "",
      steps: 1,
      profileSelected: 0,
      signupStarted: true,
      user_name: "",
      user_lastname: "",
      user_stage_name: "",
      user_password: "",
      user_confirm_password: "",
      user_email: "",
      user_phone: "",
      user_birth_date: "",
      user_nationality: "",
      user_document_type: "CPF",
      user_document_number: "",
      user_is_represented_for_a_gallery: false,
      user_artist_managed_by: "",
      user_number_of_art_pieces: 0,
      user_is_collection_cataloged: "no",
      user_is_private: false,
      verifyPassword1: false,
      verifyPassword2: false,
      verifyPassword3: false,
      verifyPassword4: false,
      //company
      company_name: "",
      company_email: "",
      company_phone: "",
      company_birth_date: "",
      company_nationality: "",
      company_document_type: "CNPJ",
      company_document_number: "",
      company_zipCode: "",
      company_street: "",
      company_city: "",
      company_number: "",
      company_complement: "",
      company_state: "",
      company_country: "",
      user_accepted_terms: false,
      errorMessageSignup: "",
      //features
      isSwitchOn: false,
      isSwitchTerms: false,
      typedocument: false,
      nationality: false,
      myCollection: false,
      step1: true,
      step2: false,
      step3: false,
      step4: false,
      step5: false,
      profile1: true,
      profile2: false,
      profile3: false,
      profile4: false,
      ProfileUser: '',
      date: '',
      errorname: false,
      load: false,
    };
  }

  //Steps
  //Functions navigation
  GoToStep2_colecionador = () => {
    this.setState({step1: false, step2: true, step3: false, step4: false, step5: false, 
      ProfileUser: 'Colecionador', profile1: false, profile2: false, profile3: false, profile4: false,
      profileSelected: 0
    });
    console.log(this.state.profileSelected);
  }
  GoToStep2_artista = () => {
    this.setState({step1: false, step2: true, step3: false, step4: false, step5: false, 
      ProfileUser: 'Artista', profile1: false, profile2: false, profile3: false, profile4: false,
      profileSelected: 1
    });
    console.log(this.state.profileSelected);
  }
  GoToStep2_galeria = () => {
    this.setState({step1: false, step2: true, step3: false, step4: false, step5: false, 
      ProfileUser: 'Galeria', profile1: false, profile2: false, profile3: false, profile4: false,
      profileSelected: 2
    });
    console.log(this.state.profileSelected);
  }
  GoToStep2_museu = () => {
    this.setState({step1: false, step2: true, step3: false, step4: false, step5: false, 
      ProfileUser: 'Museu', profile1: false, profile2: false, profile3: false, profile4: false,
      profileSelected: 3
    });
    console.log(this.state.profileSelected);
  }
  
  BackToStep1 = () => {
    this.setState({step1: true, step2: false, step3: false, step4: false, step5: false});
    this.Profile1();
  }

  BackToStep2 = () => {
    this.setState({step1: false, step2: true, step3: false, step4: false, step5: false});
  }
  GoToStep3 = () => {
    this.setState({step1: false, step2: false, step3: true, step4: false, step5: false});
  }
  GoToStep4 = () => {
    this.setState({step1: false, step2: false, step3: false, step4: true, step5: false});
  }
  FinishRegister = () => {
    console.log('finished register');
    this.props.navigation.navigate('StepOne');
  }
  //
  Profile1 = () => {
    this.setState({profile1: true, profile2: false, profile3: false, profile4: false});
  }
  Profile2 = () => {
    this.setState({profile1: false, profile2: true, profile3: false, profile4: false});
  }
  Profile3 = () => {
    this.setState({profile1: false, profile2: false, profile3: true, profile4: false});
  }
  Profile4 = () => {
    this.setState({profile1: false, profile2: false, profile3: false, profile4: true});
  }

  //Verify Password 
  ChangePassword = (e) => {
    this.setState({ user_password:e });
    const v1 = e.length >= 8;
    /* const v2 = e.match(/^\w+(?:[ `'?!]\w+)*[`.?!]?$/);
    const v3 = e.match(/([0-9].*[a-z])|([a-z].*[0-9])/); */
    const v4 = e == this.state.user_confirm_password;
    console.log(e);
    if(v1 == true){ this.setState({ verifyPassword1: true, }) }else{
      this.setState({ verifyPassword1: false, });
    }
    if(v1 == true){ this.setState({ verifyPassword2: true, }) }else{
      this.setState({ verifyPassword2: false, });
    }
    if(v1 == true){ this.setState({ verifyPassword3: true, }) }else{
      this.setState({ verifyPassword3: false, });
    }
  }
  ConfirmPassword = (e) => {
    this.setState({ user_confirm_password:e });
    console.log(this.state.user_password, this.state.user_confirm_password);
    const v4 = this.state.user_password == e;
    if(v4 == true){ this.setState({ verifyPassword4: true, }) }else{
      this.setState({ verifyPassword4: false, });
    }
  }

  backToStart = () => {
    //navigation.navigate('');
  }

  /* function submit(data) {
    console.log(data);
  } */

  //set date brithd
  handleChange = (date) => {
    setDate(this.state.date);
  };
 
  focus = () => {
    if (!dateInput) {
      return;
    }
 
    dateInput.focus();
  };


  MountPostBody = (userGroupId, requestUrl = false) => {
    var group = ""
    var body = {};

    switch (userGroupId) {
      case 0://Colecionador
        group = "collectors";
        body = {
          "firstName": this.state.user_name,
          "lastName": this.state.user_lastname,
          "email": this.state.user_email,
          "password": this.state.user_password,
          "telephone": "+" + this.state.user_phone.toString(),
          "birthDate": this.state.user_birth_date,
          "nationality": this.state.user_nationality,
          "document": this.state.user_document_number.toString(),
          "documentType": this.state.user_document_type,
          "isPrivate": this.state.user_is_private,
          "numberOfArtsInCollection": parseInt(this.state.user_number_of_art_pieces),
          "catalogedCollection": this.state.user_is_collection_cataloged
        };
        break;
      case 1://Artista
        group = "artists";
        body = {
          "firstName": this.state.user_name,
          "lastName": this.state.user_lastname,
          "stageName": this.state.user_stage_name,
          "email": this.state.user_email,
          "password": this.state.user_password,
          "telephone": "+" + this.state.user_phone.toString(),
          "birthDate": this.state.user_birth_date,
          "nationality": this.state.user_nationality,
          "document": this.state.user_document_number.toString(),
          "documentType": this.state.user_document_type,
          "isPrivate": this.state.user_is_private,
          "isManaged": this.state.user_is_represented_for_a_gallery,
          "managerId": this.state.user_artist_managed_by
        };

        if (this.state.user_is_represented_for_a_gallery) {
          body["managerId"] = this.state.user_artist_managed_by
        } else {
          delete body["managerId"]
        }

        break;
      case 2://Galeria
        group = "galleries";
        body = {
          "firstName": this.state.user_name,
          "lastName": this.state.user_lastname,
          "publicAddress": this.state.accountAddress,
          "email": this.state.user_email,
          "password": this.state.user_password,
          "telephone": "+" + this.state.user_phone.toString(),
          "birthDate": this.state.user_birth_date,
          "nationality": this.state.user_nationality,
          "document": this.state.user_document_number.toString(),
          "documentType": this.state.user_document_type,
          "isPrivate": this.state.user_is_private,
          "businessName": this.state.company_name,
          "businessEmail": this.state.company_email,
          "businessTelephone": "+" + this.state.company_phone.toString(),
          "businessFoundationDate": this.state.company_birth_date,
          "businessDocument": this.state.company_document_number.toString(),
          "businessDocumentType": this.state.company_document_type,
          "zipCode": this.state.company_zipCode,
          "street": this.state.company_street,
          "number": this.state.company_number,
          "complement": this.state.company_complement,
          "city": this.state.company_city,
          "state": this.state.company_state,
          "country": this.state.company_country,

        };
        break;
      case 3://Museu
        group = "museums";
        body = {
          "firstName": this.state.user_name,
          "lastName": this.state.user_lastname,
          "publicAddress": this.state.accountAddress,
          "email": this.state.user_email,
          "password": this.state.user_password,
          "telephone": "+" + this.state.user_phone.toString(),
          "birthDate": this.state.user_birth_date,
          "nationality": this.state.user_nationality,
          "document": this.state.user_document_number.toString(),
          "documentType": this.state.user_document_type,
          "isPrivate": this.state.user_is_private,
          "businessName": this.state.company_name,
          "businessEmail": this.state.company_email,
          "businessTelephone": "+" + this.state.company_phone.toString(),
          "businessFoundationDate": this.state.company_birth_date,
          "businessDocument": this.state.company_document_number.toString(),
          "businessDocumentType": this.state.company_document_type,
          "zipCode": this.state.company_zipCode,
          "street": this.state.company_street,
          "number": this.state.company_number,
          "complement": this.state.company_complement,
          "city": this.state.company_city,
          "state": this.state.company_state,
          "country": this.state.company_country,
        };
        break;
    }
    return !requestUrl ? body : group
  }

  submit(data) {
    //inserting data and variable RNPicker.
    data.nationality = nationality;
    data.documentType = typedocument;
    data.isPrivate = isSwitchOn;
    data.catalogedCollection = myCollection;
    //
    SendSignupRequest(data);
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

  componentWillUnmount() {
    clearInterval(this.intervalId);
  } 

  CheckConnection = async () => {
    if (window.ethereum.selectedAddress === undefined) {
      this.setState({ accountAddress: "" })
    }
  }

  CheckDocumentNumber = (e) => {
    const number = e.toString();
    this.setState({ user_document_number: number });
    console.log(this.state.user_document_number);
  }

  GetAccountAddress = (address = "") => {
    if (address != "") {
      this.setState({ accountAddress: address })
    }
  }

  GroupSelected = (group = null) => {
    this.setState({ profileSelected: group, signupStarted: true })
  }

  GetBrazilianAddress = async (searchCep) => {
    if (searchCep.length === 8) {
      await GetBrazilianAddressDetails(searchCep).then((res) => {
        if (res["cep"]) {
          this.setState({
            company_zipCode: res.cep,
            company_street: res.logradouro,
            company_city: res.localidade,
            company_state: res.uf,
            company_country: "Brasil",
          })
        }
      })
    }
  }

  SendSignupRequest = async () => {
    setTimeout(()=>{
      this.state.load = true;
    }, 0);
    setTimeout(()=>{
      this.state.load = false;
      this.setState({step1: false, step2: false, step3: false, step4: false, step5: true});
    }, 3000);
    const body = this.MountPostBody(this.state.profileSelected);
    const group = this.MountPostBody(this.state.profileSelected, true);
    console.log(body, group);

    //Get URL e Body
    /* const body = this.MountPostBody(this.state.profileSelected.id)
    const group = this.MountPostBody(this.state.profileSelected.id, true)

    const signup = await SignupUser(body, group).then(response => {
      //If Success
      console.log(response.data)
      this.setState({ steps: 5 })

    }).catch((err) => {
      //If Fail
      var errorMessage = err.response.data.message;
      Alert.alert(
        "Usuário já existe!",
        "Esse usuário já existe. Por favor tente novamente com outros dados.",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

      //Recording error state
      this.setState({ errorMessageSignup: errorMessage })
    }) */

  }

  render(){

    //nationality
    const MyContry = [{label:"afghan", name:"Afghan"},
  {label:"albanian", name:"Albanian"},
  {label:"algerian", name:"Algerian"},
  {label:"american", name:"American"},
  {label:"andorran", name:"Andorran"},
  {label:"angolan", name:"Angolan"},
  {label:"antiguans", name:"Antiguans"},
  {label:"argentinean", name:"Argentinean"},
  {label:"armenian", name:"Armenian"},
  {label:"australian", name:"Australian"},
  {label:"austrian", name:"Austrian"},
  {label:"azerbaijani", name:"Azerbaijani"},
  {label:"bahamian", name:"Bahamian"},
  {label:"bahraini", name:"Bahraini"},
  {label:"bangladeshi", name:"Bangladeshi"},
  {label:"barbadian", name:"Barbadian"},
  {label:"barbudans", name:"Barbudans"},
  {label:"batswana", name:"Batswana"},
  {label:"belarusian", name:"Belarusian"},
  {label:"belgian", name:"Belgian"},
  {label:"belizean", name:"Belizean"},
  {label:"beninese", name:"Beninese"},
  {label:"bhutanese", name:"Bhutanese"},
  {label:"bolivian", name:"Bolivian"},
  {label:"bosnian", name:"Bosnian"},
  {label:"brasileiro", name:"Brasileiro"},
  {value:"british", name:"British"},
  {value:"bruneian", name:"Bruneian"},
  {value:"bulgarian", name:"Bulgarian"},
  {value:"burkinabe", name:"Burkinabe"},
  {value:"burmese", name:"Burmese"},
  {value:"burundian", name:"Burundian"},
  {value:"cambodian", name:"Cambodian"},
  {value:"cameroonian", name:"Cameroonian"},
  {value:"canadian", name:"Canadian"},
  {value:"cape verdean", name:"Cape Verdean"},
  {value:"central african", name:"Central African"},
  {value:"chadian", name:"Chadian"},
  {value:"chilean", name:"Chilean"},
  {value:"chinese", name:"Chinese"},
  {value:"colombian", name:"Colombian"},
  {value:"comoran", name:"Comoran"},
  {value:"congolese", name:"Congolese"},
  {value:"costa rican", name:"Costa Rican"},
  {value:"croatian", name:"Croatian"},
  {value:"cuban", name:"Cuban"},
  {value:"cypriot", name:"Cypriot"},
  {value:"czech", name:"Czech"},
  {value:"danish", name:"Danish"},
  {value:"djibouti", name:"Djibouti"},
  {value:"dominican", name:"Dominican"},
  {value:"dutch", name:"Dutch"},
  {value:"east timorese", name:"East Timorese"},
  {value:"ecuadorean", name:"Ecuadorean"},
  {value:"egyptian", name:"Egyptian"},
  {value:"emirian", name:"Emirian"},
  {value:"equatorial guinean", name:"Equatorial Guinean"},
  {value:"eritrean", name:"Eritrean"},
  {value:"estonian", name:"Estonian"},
  {value:"ethiopian", name:"Ethiopian"},
  {value:"fijian", name:"Fijian"},
  {value:"filipino", name:"Filipino"},
  {value:"finnish", name:"Finnish"},
  {value:"french", name:"French"},
  {value:"gabonese", name:"Gabonese"},
  {value:"gambian", name:"Gambian"},
  {value:"georgian", name:"Georgian"},
  {value:"german", name:"German"},
  {value:"ghanaian", name:"Ghanaian"},
  {value:"greek", name:"Greek"},
  {value:"grenadian", name:"Grenadian"},
  {value:"guatemalan", name:"Guatemalan"},
  {value:"guinea-bissauan", name:"Guinea-Bissauan"},
  {value:"guinean", name:"Guinean"},
  {value:"guyanese", name:"Guyanese"},
  {value:"haitian", name:"Haitian"},
  {value:"herzegovinian", name:"Herzegovinian"},
  {value:"honduran", name:"Honduran"},
  {value:"hungarian", name:"Hungarian"},
  {value:"icelander", name:"Icelander"},
  {value:"indian", name:"Indian"},
  {value:"indonesian", name:"Indonesian"},
  {value:"iranian", name:"Iranian"},
  {value:"iraqi", name:"Iraqi"},
  {value:"irish", name:"Irish"},
  {value:"israeli", name:"Israeli"},
  {value:"italian", name:"Italian"},
  {value:"ivorian", name:"Ivorian"},
  {value:"jamaican", name:"Jamaican"},
  {value:"japanese", name:"Japanese"},
  {value:"jordanian", name:"Jordanian"},
  {value:"kazakhstani", name:"Kazakhstani"},
  {value:"kenyan", name:"Kenyan"},
  {value:"kittian and nevisian", name:"Kittian and Nevisian"},
  {value:"kuwaiti", name:"Kuwaiti"},
  {value:"kyrgyz", name:"Kyrgyz"},
  {value:"laotian", name:"Laotian"},
  {value:"latvian", name:"Latvian"},
  {value:"lebanese", name:"Lebanese"},
  {value:"liberian", name:"Liberian"},
  {value:"libyan", name:"Libyan"},
  {value:"liechtensteiner", name:"Liechtensteiner"},
  {value:"lithuanian", name:"Lithuanian"},
  {value:"luxembourger", name:"Luxembourger"},
  {value:"macedonian", name:"Macedonian"},
  {value:"malagasy", name:"Malagasy"},
  {value:"malawian", name:"Malawian"},
  {value:"malaysian", name:"Malaysian"},
  {value:"maldivan", name:"Maldivan"},
  {value:"malian", name:"Malian"},
  {value:"maltese", name:"Maltese"},
  {value:"marshallese", name:"Marshallese"},
  {value:"mauritanian", name:"Mauritanian"},
  {value:"mauritian", name:"Mauritian"},
  {value:"mexican", name:"Mexican"},
  {value:"micronesian", name:"Micronesian"},
  {value:"moldovan", name:"Moldovan"},
  {value:"monacan", name:"Monacan"},
  {value:"mongolian", name:"Mongolian"},
  {value:"moroccan", name:"Moroccan"},
  {value:"mosotho", name:"Mosotho"},
  {value:"motswana", name:"Motswana"},
  {value:"mozambican", name:"Mozambican"},
  {value:"namibian", name:"Namibian"},
  {value:"nauruan", name:"Nauruan"},
  {value:"nepalese", name:"Nepalese"},
  {value:"new zealander", name:"New Zealander"},
  {value:"ni-vanuatu", name:"Ni-Vanuatu"},
  {value:"nicaraguan", name:"Nicaraguan"},
  {value:"nigerien", name:"Nigerien"},
  {value:"north korean", name:"North Korean"},
  {value:"northern irish", name:"Northern Irish"},
  {value:"norwegian", name:"Norwegian"},
  {value:"omani", name:"Omani"},
  {value:"pakistani", name:"Pakistani"},
  {value:"palauan", name:"Palauan"},
  {value:"panamanian", name:"Panamanian"},
  {value:"papua new guinean", name:"Papua New Guinean"},
  {value:"paraguayan", name:"Paraguayan"},
  {value:"peruvian", name:"Peruvian"},
  {value:"polish", name:"Polish"},
  {value:"portuguese", name:"Portuguese"},
  {value:"qatari", name:"Qatari"},
  {value:"romanian", name:"Romanian"},
  {value:"russian", name:"Russian"},
  {value:"rwandan", name:"Rwandan"},
  {value:"saint lucian", name:"Saint Lucian"},
  {value:"salvadoran", name:"Salvadoran"},
  {value:"samoan", name:"Samoan"},
  {value:"san marinese", name:"San Marinese"},
  {value:"sao tomean", name:"Sao Tomean"},
  {value:"saudi", name:"Saudi"},
  {value:"scottish", name:"Scottish"},
  {value:"senegalese", name:"Senegalese"},
  {value:"serbian", name:"Serbian"},
  {value:"seychellois", name:"Seychellois"},
  {value:"sierra leonean", name:"Sierra Leonean"},
  {value:"singaporean", name:"Singaporean"},
  {value:"slovakian", name:"Slovakian"},
  {value:"slovenian", name:"Slovenian"},
  {value:"solomon islander", name:"Solomon Islander"},
  {value:"somali", name:"Somali"},
  {value:"south african", name:"South African"},
  {value:"south korean", name:"South Korean"},
  {value:"spanish", name:"Spanish"},
  {value:"sri lankan", name:"Sri Lankan"},
  {value:"sudanese", name:"Sudanese"},
  {value:"surinamer", name:"Surinamer"},
  {value:"swazi", name:"Swazi"},
  {value:"swedish", name:"Swedish"},
  {value:"swiss", name:"Swiss"},
  {value:"syrian", name:"Syrian"},
  {value:"taiwanese", name:"Taiwanese"},
  {value:"tajik", name:"Tajik"},
  {value:"tanzanian", name:"Tanzanian"},
  {value:"thai", name:"Thai"},
  {value:"togolese", name:"Togolese"},
  {value:"tongan", name:"Tongan"},
  {value:"trinidadian or tobagonian", name:"Trinidadian or Tobagonian"},
  {value:"tunisian", name:"Tunisian"},
  {value:"turkish", name:"Turkish"},
  {value:"tuvaluan", name:"Tuvaluan"},
  {value:"ugandan", name:"Ugandan"},
  {value:"ukrainian", name:"Ukrainian"},
  {value:"uruguayan", name:"Uruguayan"},
  {value:"uzbekistani", name:"Uzbekistani"},
  {value:"venezuelan", name:"Venezuelan"},
  {value:"vietnamese", name:"Vietnamese"},
  {value:"welsh", name:"Welsh"},
  {value:"yemenite", name:"Yemenite"},
  {value:"zambian", name:"Zambian"},
    {value:"zimbabwean", name:"Zimbabwean"}];

    return (
      <SafeAreaView style={[styles.container]}>
        <StatusBar style={styles.status}
          animated={true}
          backgroundColor="#000"
          barStyle={'light-content'} />
        {this.state.load == true && (<View style={styles.screenLoad}>
          <ActivityIndicator style={styles.load} size="large" color="#A72698" />
        </View>)}
        <ScrollView style={styles.buttonsContainer}>
          <View style={styles.page}>
            <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_10.png')} />
            <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
            <TouchableOpacity>
              <Image style={styles.menu} source={require('../../assets/imgs/white/png/three-bars.png')} />
            </TouchableOpacity>
            {this.state.step1 ? (
            <><View style={[styles.row, { top: 60 }]}>
                <Text style={[styles.title, { flexGrow: 1, flexDirection: 'row' }]}>CADASTRO</Text>
                <Text style={styles.subtitle}>Passo 1 de 4</Text>
              </View><View style={{ justifyContent: 'center', alignItems: 'center', top: 106 }}>
              <View style={styles.barprogress}>
                    <View style={styles.progressuntilnow}></View>
                  </View>
            </View></>
            ) : null}
            {this.state.profile1 ? (
                <><View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 650, height: '100%', width: '100%' }}>
                <View style={[styles.row, { top: 120 }]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row' }]}>ESCOLHA SEU PERFIL:</Text>
                  <Text style={styles.selected}>Colecionador</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', bottom: 0 }}>
                  <View style={styles.slides}>
                    <View style={styles.leftSlide}>
                      <Image style={styles.iconType} source={require('../../assets/imgs/white/png/images.png')} />
                    </View>
                    <Text style={styles.titleSlide}>Sou{"\n"}<Text style={styles.type}>Colecionador</Text></Text>
                    <Image style={styles.imgSlids} source={require('../../assets/imgs/artista.jpg')} />
                    <TouchableOpacity onPress={this.Profile2} style={[styles.iconRight]}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-right.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View><View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', left: '5.5%' }}>
                  <TouchableOpacity
                    onPress={this.GoToStep2_colecionador}
                    style={[styles.btn]}>
                    <Text style={styles.textBTN}>Continuar</Text>
                  </TouchableOpacity>
                </View></>
            ) : null}
            {this.state.profile2 ? (
              <><View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 650, height: '100%', width: '100%' }}>
                <View style={[styles.row, { top: 120 }]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row' }]}>ESCOLHA SEU PERFIL:</Text>
                  <Text style={styles.selected}>Artista</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', bottom: 0 }}>
                  <View style={styles.slides}>
                    <TouchableOpacity onPress={this.Profile1} style={styles.iconLeft}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                    </TouchableOpacity>
                    <Image style={styles.iconType2} source={require('../../assets/imgs/white/png/brush.png')} />
                    <Text style={styles.titleSlide2}>Sou{"\n"}<Text style={styles.type}>Artista</Text></Text>
                    <Image style={styles.imgSlids} source={require('../../assets/imgs/artista.jpg')} />
                    <TouchableOpacity onPress={this.Profile3} style={styles.iconRight}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-right.png')} />
                    </TouchableOpacity>
                  </View>

                </View>
              </View><View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', left: '5.5%' }}>
                  <TouchableOpacity
                    onPress={this.GoToStep2_artista}
                    style={styles.btn} buttonstyle={styles.btn}>
                    <Text style={styles.textBTN}>Continuar</Text>
                  </TouchableOpacity>
                </View></>
            ) : null}
            {this.state.profile3 ? (
              <><View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 650, height: '100%', width: '100%' }}>
                <View style={[styles.row, { top: 120 }]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row' }]}>ESCOLHA SEU PERFIL:</Text>
                  <Text style={styles.selected}>Galeria</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', bottom: 0 }}>
                  <View style={styles.slides}>
                    <TouchableOpacity onPress={this.Profile2} style={styles.iconLeft}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                    </TouchableOpacity>
                    <Image style={styles.iconType2} source={require('../../assets/imgs/white/png/gallery.png')} />
                    <Text style={styles.titleSlide2}>Sou{"\n"}<Text style={styles.type}>Galeria</Text></Text>
                    <Image style={styles.imgSlids} source={require('../../assets/imgs/artista.jpg')} />
                    <TouchableOpacity onPress={this.Profile4} style={styles.iconRight}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-right.png')} />
                    </TouchableOpacity>
                  </View>

                </View>
              </View><View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', left: '5.5%' }}>
                  <TouchableOpacity
                    onPress={this.GoToStep2_galeria}
                    style={styles.btn} buttonstyle={styles.btn}>
                    <Text style={styles.textBTN}>Continuar</Text>
                  </TouchableOpacity>
                </View></>
            ) : null}
            {this.state.profile4 ? (
              <><View style={{ justifyContent: 'center', alignItems: 'center', minHeight: 650, height: '100%', width: '100%' }}>
                <View style={[styles.row, { top: 120 }]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row' }]}>ESCOLHA SEU PERFIL:</Text>
                  <Text style={styles.selected}>Museu</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', bottom: 0 }}>
                  <View style={styles.slides}>
                    <TouchableOpacity onPress={this.Profile3} style={styles.iconLeft}>
                      <Image style={{ height: 38, width: 38, marginLeft: 5 }} source={require('../../assets/imgs/white/png/long-arrow-left.png')} />
                    </TouchableOpacity>
                    <Image style={styles.iconType2} source={require('../../assets/imgs/white/png/museum.png')} />
                    <Text style={styles.titleSlide2}>Sou{"\n"}<Text style={styles.type}>Museu</Text></Text>
                    <Image style={styles.imgSlids} source={require('../../assets/imgs/museu.jpeg')} />
                  </View>

                </View>
              </View><View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', left: '5.5%' }}>
                  <TouchableOpacity
                    onPress={this.GoToStep2_museu}
                    style={styles.btn} buttonstyle={styles.btn}>
                    <Text style={styles.textBTN}>Continuar</Text>
                  </TouchableOpacity>
                </View></>
            ) : null}
            {this.state.step2 ? (
              <><View style={[styles.row, { top: 60}]}>
                <Text style={[styles.title, { flexGrow: 1, flexDirection: 'row' }]}>CADASTRO</Text>
                <Text style={styles.subtitle}>Passo 2 de 4</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', top: 106 }}>
                <View style={styles.barprogress}>
                  <View style={styles.progressuntilnowtwo}></View>
                </View>
              </View>
              <View style={[styles.row, {top: 130}]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row'}]}>PREENCHA SEUS DADOS:</Text>
                </View><View style={[styles.spc1, {marginTop: 30}]}>
                  <Text style={styles.titleInpput}>NOME</Text>
                  <TextInput style={[styles.input]} value={this.state.user_name} name={"name"} onChangeText={(e) => { this.setState({ user_name: e }) }} placeholder="NOME" />
                  {this.state.errorname && <Text style={styles.error}>Digite seu nome corretamente</Text>}
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>SOBRENOME</Text>
                  <TextInput style={[styles.input]} value={this.state.user_lastname} name={"user_lastname"} onChangeText={(e) => { this.setState({ user_lastname: e }) }} placeholder="SOBRENOME" />
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>E-MAIL</Text>
                  <TextInput style={[styles.input]} autoCapitalize='none' value={this.state.user_email} onChangeText={(e) => { this.setState({ user_email: e }) }} placeholder="E-MAIL" />
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>TELEFONE</Text>
                  <Image />
                  <TextInput style={[styles.input]} value={this.state.user_phone} keyboardType="numeric" onChangeText={(e) => { this.setState({ user_phone: e }) }} placeholder="TELEFONE" />
                </View>
                <View style={styles.spc1}>
  
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>NASCIMENTO</Text>
                  <TextInput style={[styles.input]} 
                    value={this.state.user_birth_date} onChangeText={(e) => { this.setState({ user_birth_date: e }) }} placeholder="NASCIMENTO" type={'datetime'}
                    options={{
                      format: 'DD-MM-YYYY HH:mm:ss'  
                  }}/>
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>NACIONALIDADE</Text>
                  <View style={styles.selectoptions}>
                    <View style={styles.picker}>
                      <RNPickerSelect value={this.state.user_nationality} onValueChange={(e) => { this.setState({ user_nationality: e.value }) }} placeholder={{
                          label: 'NACIONALIDADE',
                          value: null,
                        }} placeholderTextColor="red"
                          items={[{ label: "Brasileira", value: "brasileira" }, { label: "Estrangeira", value: "estrangeira" },]}
                      />
                    </View>
                    <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                  </View>
                </View> 
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>TIPO DE DOCUMENTO</Text>
                  <View style={styles.selectoptions}>
                    <View style={styles.picker}>
                      <RNPickerSelect value={this.state.company_document_type} onValueChange={(e) => { this.setState({ company_document_type: e.value }) }} placeholder={{
                          label: 'Tipo de Documento',
                          value: null,
                        }} placeholderTextColor="red"
                          items={[{ label: "CPF", value: "CPF" }, { label: "RG", value: "RG" }, { label: "Passaporte", value: "Passaporte" }]}
                      />
                    </View>
                    <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                  </View>
                </View>
                <View style={styles.spc1}>
                  <Text style={styles.titleInpput}>NÚMERO DO DOCUMENTO</Text>
                  <TextInput style={[styles.input2]} value={this.state.user_document_number} onChangeText={(e) => { this.CheckDocumentNumber(e) }} placeholder="NÚMERO (COMO CONSTA NO DOCUMENTO)" />
                </View>
  
                <View style={styles.barDiv}>
                  <Text style={styles.titleCollection}>COLEÇÃO</Text>
                  <View style={{ width: "90%", borderBottomColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth, top: 7, left: 20 }} />
                </View>
                
                <View style={styles.spc2}>
                  <Text style={styles.titleInpput}>SUA COLEÇÃO JÁ ESTÁ CATALOGADA?</Text>
                  <View style={[styles.selectoptions]}>
                    <View style={styles.picker}>
                      <RNPickerSelect value={this.state.user_is_collection_cataloged} onValueChange={(e) => { this.setState({ user_is_collection_cataloged: e.value }) }} placeholder={{
                          label: 'Não',
                          value: 'no',
                        }} placeholderTextColor="red"
                          items={[{ label: "Sim", value: "yes" }, { label: "Parcialmente", value: "partialy" }]}
                      />
                    </View>
                    <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                  </View>
                </View>
                <View style={styles.spc2}>
                  <Text style={styles.titleInpput}>QUANTAS OBRAS JÁ POSSUI EM SUA COLEÇÃO?</Text>
                  <View style={[styles.selectoptions]}>
                    <View style={styles.picker}>
                      <RNPickerSelect value={this.state.user_number_of_art_pieces} onValueChange={(e) => { this.setState({ user_number_of_art_pieces: e.value }) }} placeholder={{
                          label: '0',
                          value: '0',
                        }} placeholderTextColor="red"
                          items={[ { label: "01", value: "01" }, { label: "02", value: "02" }, { label: "03", value: "03" },
                          { label: "04", value: "04" }, { label: "05", value: "05" }, { label: "06", value: "06" }, { label: "06", value: "06" },
                          { label: "07", value: "07" }, { label: "08", value: "08" }, { label: "09", value: "09" }, { label: "10", value: "10" }, { label: "Mais de 10", value: "mais de 10" }]}
                      />
                    </View>
                    <Image style={styles.iconPicker} source={require('../../assets/imgs/outros/arrow-down.png')} />
                  </View>
                </View>
                
                <View style={[styles.barDiv, {top: 185}]}>
                  <Text style={[styles.titleCollection]}>PRIVACIDADE</Text>
                  <View style={{ width: "90%", borderBottomColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth, top: 7, left: 20 }} />
  
                  <View style={[styles.row, { top: 50 }]}>
                  <Switch style={{left: 25, top: 20}}
                      trackColor={{ true: 'green', false: 'grey' }}
                      checked={this.state.user_is_private} onChangeEvent={(e) => this.setState({ user_is_private: e.checked })} />
                  <Text style={[styles.titlePrivate,]}>PERFIL PRIVADO (ELE NÃO SERÁ MOSTRADO NAS BUSCAS E NÃO PODERÁ SER ACESSADO DIRETAMENTE).</Text>
                  </View>
  
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', top: 50, flexGrow: 1, flexDirection: 'row', height: 200}}>
                    <TouchableOpacity style={[styles.btnBack]} onPress={this.BackToStep1}>
                      <Text style={styles.btnBackText}>VOLTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNext} onPress={this.GoToStep3}>
                      <Text style={styles.btnNextText}>CONTINUAR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
  
                <View style={styles.footer}></View>
              </>
            ) : null}
            {this.state.step3 ? (
              <><><View style={[styles.row, { top: 60 }]}>
                <Text style={[styles.title, { flexGrow: 1, flexDirection: 'row' }]}>CADASTRO</Text>
                <Text style={styles.subtitle}>Passo 3 de 4</Text>
              </View>
               <View style={{ justifyContent: 'center', alignItems: 'center', top: 106 }}>
                <View style={styles.barprogress}>
                  <View style={styles.progressuntilnowthree}></View>
                </View>
              </View>
              <View style={[styles.row]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row', top: 135 }]}>DADOS DE ACESSO:</Text>
                </View><View style={{ top: 180}}>
                  <Text style={styles.titleInpput}>CRIE UMA SENHA</Text>
                  <TextInput style={[styles.input3]} value={this.state.user_password} name={"user_password"} onChangeText={(e) => {this.ChangePassword(e)}} placeholder="CRIE UMA SENHA" secureTextEntry={true}/>
                </View><View style={{ top: 180}}>
                  <Text style={styles.titleInpput}>CONFIRME A SENHA</Text>
                  <TextInput style={[styles.input3]} value={this.state.user_confirm_password} name={"user_confirm_password"} onChangeText={(e) => {this.ConfirmPassword(e)}} placeholder="CONFIRMA A SENHA" secureTextEntry={true}/>
                </View></>
                <View style={{top: 175}}>
                  <View style={styles.passwordRequest}>
                    <View style={styles.itemPass}>
                      {this.state.verifyPassword1 == false && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/close.png')} />}
                      {this.state.verifyPassword1 == true && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/checkmark.png')} />}
                      <Text style={styles.textItempass}>A senha deve conter 8 ou mais{"\n"}caracteres</Text>
                    </View>
                    <View style={styles.itemPass}>
                      {this.state.verifyPassword2 == false && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/close.png')} />}
                      {this.state.verifyPassword2 == true && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/checkmark.png')} />}
                      <Text style={styles.textItempass}>Precisa conter pelo menos um{"\n"}caractere especial</Text>
                    </View>
                    <View style={styles.itemPass}>
                      {this.state.verifyPassword3 == false && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/close.png')} />}
                      {this.state.verifyPassword3 == true && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/checkmark.png')} />}
                      <Text style={[styles.textItempass, {position: 'absolute', top: 17}]}>Precisa conter letras e números</Text>
                    </View>
                    <View style={styles.itemPass}>
                      {this.state.verifyPassword4 == false && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/close.png')} />}
                      {this.state.verifyPassword4 == true && <Image style={styles.iconItempass} source={require('../../assets/imgs/outros/checkmark.png')} />}
                      <Text style={styles.textItempass}>Senha e confirmação de senha{"\n"}precisam ser as mesmas</Text>
                    </View>
                  </View>
                </View>
                <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center', top: 100, flexGrow: 1, flexDirection: 'row', height: 400}]}>
                    <TouchableOpacity style={[styles.btnBack]} onPress={this.BackToStep2}>
                      <Text style={styles.btnBackText}>VOLTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNext} onPress={this.GoToStep4}>
                      <Text style={styles.btnNextText}>CONTINUAR</Text>
                    </TouchableOpacity>      
                </View></>
                
            ) : null}
            {this.state.step4 ? (
              <><View style={[styles.row, { top: 60 }]}>
                <Text style={[styles.title, { flexGrow: 1, flexDirection: 'row' }]}>CADASTRO</Text>
                <Text style={styles.subtitle}>Passo 4 de 4</Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', top: 106 }}>
                <View style={styles.barprogress}>
                  <View style={styles.progressuntilnowend}></View>
                </View>
              </View>
              <View style={[styles.row]}>
                  <Text style={[styles.choiseProfile, { flexGrow: 1, flexDirection: 'row', top: 135, fontSize: 14,}]}>TERMOS DE USO E CONDIÇÕES DA PLATAFORMA</Text>
                </View><View>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={styles.areaTerms}>
                      <ScrollView style={styles.termsview}>
                        <Text style={styles.textTerms}>TERMOS E CONDIÇÕES GERAIS DE USO{"\n"}


                          Em vigor a partir de [19/10/2022]{"\n"}
                          {"\n"}


                          Estes Termos e Condições Gerais de Uso (“Termos de Uso”) preveem os termos e condições aplicáveis à utilização de aplicativo móvel, disponível na Apple App Store e na Google Play Store (“Aplicativo”) e por meio de website (“Website”, que em conjunto com Aplicativo, são a “Plataforma”) por usuários (“Usuários” ou “Você”). A Plataforma é oferecida pela NFEAT LTDA., pessoa jurídica de direito privado, com sede na Rua Conceição de Monte Alegre, 107, Anexo Torre B Sala 53, CEP 04563-060, na cidade e estado de São Paulo, inscrita no CNPJ sob o nº 47.352.698/0001-78 (“NFEAT”).


                          Além destes Termos de Uso, é necessário que você leia atentamente a Política de Privacidade, disponível na Plataforma. A Política de Privacidade demonstrará, com transparência, quais informações relacionadas a você (“Dados Pessoais”) a NFEAT coleta e utiliza.


                          POR FAVOR, LEIA COM ATENÇÃO ESTES TERMOS DE USO ANTES DE USAR NOSSOS SERVIÇOS. AO UTILIZAR, DE QUALQUER FORMA, OS NOSSOS SERVIÇOS, VOCÊ DECLARA QUE LEU E CONCORDA COM ESTES TERMOS DE USO E COMPROMETE-SE A CUMPRI-LOS DE FORMA INTEGRAL. CASO VOCÊ NÃO CONCORDE COM QUALQUER DOS TERMOS E CONDIÇÕES ABAIXO ESTABELECIDOS, VOCÊ NÃO DEVE UTILIZAR A PLATAFORMA.


                          Em caso de dúvidas, entre em contato conosco por meio de um de nossos Canais de Atendimento indicados na Seção 10.

                          SOBRE A NFEAT

                          A NFEAT disponibiliza ao Usuário uma Plataforma para a gestão de coleções de obras de arte física e a conexão do mercado de arte.


                          Ao se inscrever e/ou usar os Serviços e/ou funcionalidades ofertados por meio da Plataforma, você declara ser maior de 18 (dezoito) anos caso se registre em qualquer categoria que não o Entusiasta (conforme definido abaixo).


                          Qualquer acesso, navegação e/ou uso dos Serviços ou da Plataforma indica sua concordância com todos os termos e condições aqui presentes. Em caso de impossibilidade de cumprir qualquer das disposições contidas nestes Termos de Uso, você poderá ter o seu acesso aos Serviços e/ou à Plataforma restrito e/ou negado.


                          SERVIÇOS OFERTADOS PELA NFEAT

                          Serviços. A NFEAT disponibiliza ao Usuário uma Plataforma de infraestrutura tecnológica que permite que o Usuário, por meio da abertura de conta:

                          registre e/ou consulte informações em blockchain referentes a obras de arte físicas e/ou digitais (NFTs) (em conjunto, “Obras”);

                          emita certificados de registro em blockchain referentes a Obras;

                          transfira definitivamente o certificado em blockchain referentes a Obras; e/ou

                          registre o empréstimo em blockchain de Obras;

                          coletivamente, denominados (“Serviços”).


                          Perfis de conta. Ao abrir uma conta, Você escolherá em qual perfil preferirá ser classificado, o que definirá as funcionalidades da Plataforma que serão disponibilizadas a Você. As opções de perfil são: (i) colecionador; (ii) artista, (iii) galeria (mercado primário); (iv) galeria (mercado secundário); ou (v) entusiasta, conforme descrito a seguir:

                          Colecionador: utiliza a Plataforma para fazer a gestão de sua coleção de Obras. As informações imputadas por esse Usuário são consideradas apenas um registro em blockchain de unicamente caráter gerencial. Isso significa que o input das informações não resulta em um certificado em blockchain.


                          Artista: utiliza a Plataforma para gerar certificados relacionados à sua atual produção de Obras. O artista precisará inserir evidências da autoria das Obras que estão sendo imputadas na Plataforma. Após esse processo, o registro em blockchain passará a ser classificado como um certificado em blockchain.


                          Representante legal de artista (Projeto Raisonné): representante legal do artista já falecido (“Representante”) utiliza a Plataforma para gerar certificados relacionados à produção conhecida daquele artista. O Representante precisará inserir evidências de que detém os direitos autorais das Obras que estão sendo imputadas na Plataforma. Após esse processo, o registro em blockchain passará a ser classificado como um certificado em blockchain.


                          Galeria (mercado primário): utiliza a Plataforma para gestão da produção de Obras dos artistas por ela representados, podendo gerenciar o perfil de todos os artistas que estão em seu portfólio com a publicação de Obras. O representante da galeria precisará inserir evidências de que detém o direito de representar os artistas em seu portfólio e os direitos autorais das Obras que estão sendo imputadas na Plataforma. Após esse processo, o registro em blockchain passará a ser classificado como um certificado em blockchain.


                          Galeria (mercado secundário): utiliza a Plataforma para divulgar Obras que possui em seu acervo e estão à venda. O representante da galeria precisará inserir evidências de que detém o direito de representar os artistas em seu portfólio e os direitos autorais das Obras que estão sendo imputadas na Plataforma. Após esse processo, o registro em blockchain passará a ser classificado como um certificado em blockchain.


                          Entusiasta: utiliza a Plataforma com o objetivo de apenas navegar na Plataforma e não possui o registro de Obras. Não é possível que esse Usuário faça o registro de informações na blockchain, caso queira é necessário fazer a mudança de perfil para Colecionador.


                          Acesso. A Plataforma pode ser acessada através do Website nfeat.com.br ou por meio do Aplicativo especialmente desenvolvido para tal fim.

                          Funcionamento. A Plataforma somente poderá ser acessada mediante a existência de conexão à internet. O registro/consulta de informações somente será possível mediante a abertura de conta. A indivíduos que acessam a Plataforma sem cadastro por meio de abertura de conta não serão fornecidos os Serviços (“Visitantes”).

                          A NFEAT poderá, a qualquer momento, ampliar os serviços oferecidos na Plataforma. O uso por parte do Usuário de qualquer nova funcionalidade ou serviço significará que o Usuário aceitou e aderiu integralmente aos Termos de Uso aplicáveis a tais funcionalidades ou serviços.

                          A NFEAT poderá, a qualquer tempo, descontinuar de forma definitiva ou temporária os Serviços disponibilizados por meio da Plataforma, mediante comunicação prévia ao Usuário e sem que lhe seja devida qualquer indenização.

                          FUNCIONALIDADES DA PLATAFORMA

                          Registro. A Plataforma disponibiliza a possibilidade de registro de Obras em blockchain. O registro possui caráter unicamente gerencial para o próprio Usuário e não permite, em relação à Obra registrada em blockchain, o uso de qualquer outra funcionalidade na Plataforma para além do registro e/ou consulta de informações.

                          Certificado. A Plataforma disponibiliza a possibilidade de emissão de certificado de Obras em blockchain após a inserção, pelo Usuário e sob única exclusiva responsabilidade do Usuário, de evidências, na Plataforma, de que o Usuário deteria os direitos autorais das Obras (incluindo provenance). O certificado permite, em relação à Obra certificada em blockchain, a utilização completa dos Serviços da Plataforma por parte do Usuário.

                          O USUÁRIO RECONHECE QUE A DISPONIBILIZAÇÃO DE INFRAESTRUTURA TECNOLÓGICA, PELA PLATAFORMA, DE REGISTROS E/OU CERTIFICADOS EM BLOCKCHAIN, NÃO SÃO DECLARAÇÕES E/OU GARANTIAS DE QUE A OBRA: (I) EXISTE, NO CASO DE OBRAS FÍSICAS; (II) É ORIGINAL; (III) ESTÁ DEVIDAMENTE PROTEGIDA POR DIREITOS AUTORAIS; E (III) NÃO VIOLA A PROPRIEDADE INTELECTUAL DE TERCEIROS, NOS TERMOS DAS LEGISLAÇÕES APLICÁVEIS.

                          Se Você acreditar que alguma Obra registrada ou certificada na Plataforma viola seus direitos de autor ou outros direitos de propriedade intelectual, nós encorajamos Você a nos contactar por meio dos nossos Canais de Atendimento (cláusula 12), conforme Política de Direitos Autorais.

                          O USUÁRIO RECONHECE QUE QUAISQUER TRANSFERÊNCIAS, EMPRÉSTIMOS E/OU TRANSAÇÕES REALIZADAS EM RELAÇÃO ÀS OBRAS, PELOS USUÁRIOS, SÃO DE ÚNICA E EXCLUSIVA RESPONSABILIDADE DOS USUÁRIOS. A PLATAFORMA NÃO É PARTE E NÃO TEM QUALQUER RESPONSABILIDADE NESSAS ATIVIDADES, BEM COMO NÃO GARANTE A CONCLUSÃO E EFETIVAÇÃO DE TRANSFERÊNCIAS, EMPRÉSTIMOS E/OU TRANSAÇÕES.

                          VOCÊ TAMBÉM RECONHECE E ENTENDE QUE, EM TAIS TRANSFERÊNCIAS, EMPRÉSTIMOS E/OU TRANSAÇÕES, A NFEAT AGIRÁ E SERÁ CONSIDERADA POR VOCÊ EXCLUSIVAMENTE COMO UM FORNECEDOR DE APLICAÇÃO INTERMEDIÁRIA REGULAMENTADO DE ACORDO COM OS TERMOS DA LEI 12.965/14 (CONHECIDA COMO “MARCO CIVIL DA INTERNET”), O QUE SIGNIFICA QUE NOSSOS SERVIÇOS ESTÃO LIMITADOS A DISPONIBILIZAR UMA PLATAFORMA PARA QUE OS USUÁRIOS SE CONECTEM E PARA QUE REGISTREM E CERTIFIQUEM OBRAS EM BLOCKCHAIN.

                          PRIVACIDADE
                          Coleta e tratamento de Dados Pessoais. O escopo e as formas de tratamento de seus Dados Pessoais pela NFEAT se encontram descritos e detalhados na Política de Privacidade, que é aplicada no âmbito dos Serviços e da Plataforma em adição a estes Termos de Uso.

                          VINCULAÇÃO DO USUÁRIO

                          Você reconhece e declara que: (i) acessa a Plataforma por livre e espontânea vontade; e (ii) realizou todos os passos indicados na Plataforma para finalização do seu cadastro junto à NFEAT, conforme definido abaixo (cláusula 5.2), incluindo, mas não se limitando, ao preenchimento de dados cadastrais e ao aceite dos Termos de Uso e da Política de Privacidade da NFEAT.

                          Os presentes Termos de Uso terão início na data de seu aceite e têm como objetivo regular os direitos e obrigações atribuíveis à NFEAT e ao Usuário no âmbito do acesso à Plataforma e da utilização dos Serviços.

                          São ainda consideradas parte integrante destes Termos de Uso quaisquer comunicações enviadas e/ou disponibilizadas pela NFEAT ao Usuário por meio da Plataforma ou e-mail informados pelo Usuário no momento do seu Cadastro. [O cadastro do Usuário na Plataforma implicará no recebimento de comunicações eletrônicas enviadas pela ou em nome da NFEAT. Caso o Usuário não queira receber comunicações promocionais, o Usuário poderá efetuar seu descredenciamento a qualquer momento, usando o link para opt-out que será enviado conjuntamente à comunicação eletrônica da NFEAT.]

                          A NFEAT poderá, a qualquer momento, alterar os presentes Termos de Uso, o que fará mediante publicação da versão atualizada na Plataforma e prévia comunicação ao Usuário por meio (i) do envio de comunicação ao endereço de e-mail cadastrado pelo Usuário na Plataforma; (ii) de aviso no momento de acesso à Plataforma; e/ou (iii) de comunicação de qualquer outra forma aos Usuários. Caso o Usuário não concorde com as modificações, poderá solicitar o encerramento da sua conta como um todo, com o consequente cancelamento dos Serviços.

                          As atualizações destes Termos de Uso entrarão em vigor na data de sua publicação, a não ser que seja informado em sentido diverso.


                          Para identificar a data e a versão dos Termos de Uso vigentes, o Usuário deverá verificar a seção “Data da última atualização”, no início deste documento.


                          ACESSO E USO DA PLATAFORMA

                          Para fazer uso dos Serviços oferecidos pela Plataforma, o Usuário deverá ser maior de 18 (dezoito) anos caso se registre em qualquer categoria que não o Entusiasta. Caso você tenha se registrado em categoria que não o Entusiasta e possua entre 12 (doze) anos completos e 18 (dezoito) anos incompletos, você declara estar assistido e/ou representado pelos seus pais ou seu responsável legal, nos termos da legislação aplicável. A Plataforma não é voltada para o uso de crianças (ou seja, que tenham menos de 12 anos) e crianças não devem tentar se registrar para ter acesso à Plataforma ou nos enviar qualquer informação.

                          No acesso à Plataforma, o Usuário deverá fornecer as informações cadastrais solicitadas pela Plataforma, bem como complementar informações antes fornecidas caso as exigências alterem com o tempo (“Cadastro”), que contemplarão, sem prejuízo de outros que venham a ser solicitados, os dados que permitam a identificação do Usuário, tais como: (a) nome completo (b) CPF/ME; (c) informações para contato (e-mail e telefone); e (d) endereço residencial. Para mais informações sobre dados de cadastro coletados, visite a Política de Privacidade da NFEAT.

                          Será permitido apenas um Cadastro por CPF, de forma que cada pessoa somente poderá abrir uma conta através da Plataforma.

                          O Usuário declara que as informações fornecidas para efetuar os cadastros junto à Plataforma são verdadeiras, exatas, atuais e completas.

                          O Usuário é o único responsável pelos dados fornecidos, de maneira que se responsabiliza criminal e civilmente pela veracidade, completude, atualização e exatidão das informações fornecidas. A NFEAT não se responsabiliza por erros nos cadastros efetuados pelos Usuários.

                          O Usuário compromete-se a cumprir com quaisquer alterações nos requisitos de acesso que a NFEAT venha a aplicar tanto à Plataforma como um todo como à conta, adicionando métodos e/ou critérios adicionais de autenticação ou alterando os existentes, a fim de aumentar a segurança da Plataforma e Serviços.

                          O Usuário declara que as informações fornecidas para efetuar os registros, bem como as evidências de titularidade de direitos autorais enviadas à NFEAT para emissão de certificados das Obras junto à Plataforma, são todas verdadeiras, exatas, atuais e completas.

                          A NFEAT poderá solicitar e o Usuário se compromete a fornecer, a qualquer tempo, informações e evidências adicionais a fim de garantir a veracidade e a atualização das informações pessoais e das informações referentes às Obras, fornecidas para fins cadastrais.

                          O USUÁRIO É O ÚNICO E EXCLUSIVO RESPONSÁVEL POR TODAS E QUAISQUER ATIVIDADES QUE OCORRAM EM SUA CONTA. A NFEAT RECOMENDA QUE O USUÁRIO: (I) TENHA CUIDADO AO UTILIZAR COMPUTADORES E REDES PÚBLICAS DESCONHECIDAS E/OU DE TERCEIROS, BEM COMO AO GRAVAR SENHAS DE FORMA AUTOMÁTICA NOS COMPUTADORES QUE UTILIZAR; (II) MEMORIZE SUAS CREDENCIAIS DE ACESSO E AS MANTENHA EM SIGILO, EVITANDO ANOTAR OU GUARDÁ-LAS EM SUPORTES FÍSICOS OU DIGITAIS; (III) NÃO UTILIZE SENHAS RELACIONADAS A DATAS OU OUTRAS REFERÊNCIAS PESSOAIS; (IV) EFETUE ROTINEIRAMENTE A TROCA DE SUA SENHA COMO MEDIDA DE SEGURANÇA; E (V) INFORME IMEDIATAMENTE A NFEAT NO CASO DE FURTO DE APARELHO CELULAR.

                          USO INDEVIDO DA CONTA

                          Em caso de perda, extravio, furto ou roubo das credenciais de acesso, bem como de suspeita de acesso indevido à conta por terceiros, o Usuário deve informar o fato à NFEAT imediatamente através de um dos Canais de Comunicação. O uso e acesso da conta poderão ser temporariamente bloqueados até que o Usuário receba novas credenciais de acesso.

                          O Usuário é responsável por todas as alterações realizadas através de sua conta até que a NFEAT seja devidamente comunicada.

                          PRÁTICAS PROIBIDAS

                          Proibições. O Usuário fica ciente e concorda que, durante a utilização da Plataforma, é terminantemente proibido:

                          (i) ceder, sublicenciar, vender, doar, alienar, alugar, distribuir, transmitir ou transferir, total ou parcialmente, a terceiros, sob quaisquer modalidades, a qualquer título, bem como copiar, modificar, ampliar, reduzir, adaptar, traduzir, decompilar, desmontar, executar engenharia reversa ou de qualquer forma explorar economicamente a Plataforma, incluindo os dados e as informações disponibilizadas pela Plataforma, bem como utilizá-los (a) para finalidades que não estejam previstas nestes Termos de Uso, ou, ainda, (b) para a criação ou fornecimento de outros produtos ou serviços concorrentes à Plataforma;


                          (ii) disseminar ou instalar vírus ou qualquer outro código, arquivo ou software malicioso com o propósito de interromper, destruir, acessar indevidamente, limitar ou interferir no funcionamento ou segurança da Plataforma, bem como das informações, dados e equipamentos da NFEAT, de outros Usuários da Plataforma ou de terceiros, ou, ainda, para qualquer outra finalidade ilícita;


                          (iii) usar e acessar a Plataforma, ou praticar atos, de forma que prejudique a segurança, integridade, disponibilidade e/ou o funcionamento normal da Plataforma;


                          (iv) acessar a Plataforma, ou quaisquer dados nela contidos, de maneira não autorizada, ou praticar qualquer ato que resulte em violação da privacidade de outros Usuários da Plataforma;


                          (v) utilizar as credenciais de acesso de terceiro, ou compartilhar as suas credenciais de acesso com terceiro;


                          (vi) carregar, transmitir, divulgar, exibir, enviar, ou de qualquer outra forma tornar disponível qualquer conteúdo que viole direitos de terceiros ou seja ilegal, incluindo, sem limitação, conteúdo ofensivo à honra e à privacidade de terceiros, racista, discriminatório, pornográfico, obsceno, difamatório ou calunioso, vulgar, preconceituoso, ou que possa gerar responsabilidade civil ou criminal;


                          (vii) utilizar a conta para finalidades não previstas ou proibidas por estes Termos de Uso, bem como em atividades que resultem em benefícios diretos ou indiretos para agentes criminosos e/ou quaisquer práticas ilícitas; e


                          (viii) praticar qualquer ato contrário à legislação em vigor e a estes Temos de Uso.


                          A NFEAT reserva-se o direito de, mediante simples comunicação ao Usuário em questão, suspender preventivamente ou cancelar, a qualquer momento, o respectivo cadastro e a correspondente prestação dos Serviços, em caso de mera suspeita de fraude, obtenção de benefício ou vantagem de forma ilícita, ou pelo não cumprimento de quaisquer condições previstas nestes Termos de Uso ou na legislação aplicável.

                          MODERAÇÃO DE CONTEÚDO E COMENTÁRIOS

                          Quando Você transmite, publica, faz upload, compartilha ou contribui de outra forma com qualquer conteúdo para a Plataforma, esse conteúdo será considerado como conteúdo gerado pelo Usuário (user-generated content, “UGC”) na medida em que esse conteúdo seja visível ou acessível a quaisquer outros Visitantes ou Usuários da Plataforma. Ao aceitar estes Termos de Uso, Você concorda em não contribuir com nenhum UGC que possa ser razoavelmente considerado como implicando, contendo, fornecendo ou promovendo qualquer um dos seguintes:

                          (1) conteúdo sexualmente explícito ou pornográfico;

                          (2) profanação;

                          (3) comentários ou incitações depreciativos, discriminatórios ou de ódio contra indivíduos ou grupos específicos com base em sua raça ou origem étnica, religião, gênero, deficiência, idade, nacionalidade etc.;

                          (4) incitações à violência ou outras atividades perigosas;

                          (5) terrorismo ou outras atividades criminosas;

                          (6) comentários insensíveis ou ofensivos relacionados a desastres naturais, atrocidades, crise de saúde, mortes, conflitos ou outros eventos trágicos;

                          (7) assédio, bullying ou ameaças;

                          (8) produtos perigosos, drogas ilícitas ou uso ou venda inadequada de tabaco e/ou álcool;

                          (9) falsas alegações ou conteúdos médicos;

                          (10) conteúdo que infrinja direitos de terceiro, incluindo direitos de propriedade intelectual;

                          (11) conteúdo ao qual você não está autorizado ou não tem direito legal de compartilhar, publicar ou exibir; ou

                          (12) qualquer outro conteúdo que possa ser considerado ilegal, ofensivo ou restrito de acordo com as leis ou regulações aplicáveis.


                          Você reconhece e concorda que a NFEAT poderá remover e/ou bloquear qualquer UGC que ela determinar que está em violação aos requisitos acima. Publicar o UGC em violação destes Termos de Uso pode levar à suspensão ou rescisão subsequente de todos ou parte dos nossos Serviços. Ao aceitar estes Termos de Uso, você reconhece e concorda em publicar somente UGC adequado para um público familiar.

                          Você reconhece e concorda que a NFEAT não é obrigada a policiar ou revisar ativamente o UGC antes de sua exibição nas Plataformas, e que Você é, portanto, o único responsável pelo UGC que você optar por publicar nas Plataformas.

                          RESPONSABILIDADES DO USUÁRIO E DA NFEAT

                          O Usuário é exclusivamente responsável pelo uso da Plataforma, devendo respeitar as regras destes Termos de Uso, bem como a legislação aplicável. O Usuário concorda em utilizar a Plataforma de forma adequada, com boa-fé, apenas para fins lícitos e de acordo com as regras previstas nestes Termos de Uso.

                          O Usuário está ciente de que, para acessar e usar a Plataforma, deverá:

                          (i) fornecer, sempre que solicitado, informações verdadeiras, exatas, atuais e completas;


                          (ii) atualizar imediatamente as informações fornecidas, sempre que estas sofrerem qualquer alteração, inclusive para assegurar o recebimento pelo Usuário de quaisquer comunicações da NFEAT;


                          (iii) zelar pela manutenção da segurança e confidencialidade de suas credenciais de acesso;


                          (iv) utilizar a conta de maneira adequada, responsabilizando-se exclusiva e integralmente pelo seu uso;


                          (v) comunicar imediatamente à NFEAT, por meio da Central de Atendimento, a perda, extravio, furto ou roubo de suas credenciais de acesso, bem como qualquer suspeita de movimentação indevida da conta, e seguir as instruções indicadas;


                          (vi) respeitar, entre outros, os Direitos de Propriedade Intelectual da NFEAT (conforme definidos abaixo);


                          (vii) arcar com eventuais custos de conexão e acesso à internet para utilização da Plataforma;


                          (viii) zelar para que o acesso à Plataforma e aos Serviços se dê sempre em condições técnicas adequadas, conforme detalhado na cláusula 9.3, abaixo.


                          A NFEAT não oferece aos Usuários dispositivos de hardware, tampouco serviços de conexão à internet ou qualquer outro serviço técnico necessário para uso da Plataforma, isentando-se de qualquer responsabilidade nesse sentido. É de inteira responsabilidade do Usuário:

                          (i) equipar-se e responsabilizar-se pelos dispositivos de hardware (computador, celular, tablet, entre outros) necessários para o acesso à Plataforma, bem como pelo acesso destes à internet;


                          (ii) manter seguro o ambiente de seus dispositivos de acesso à Plataforma, valendo-se de ferramentas específicas para tanto, tais como antivírus, firewall, entre outras, de modo a contribuir para a prevenção de riscos eletrônicos;


                          (iii) utilizar navegadores e/ou, conforme o caso, sistemas operacionais atualizados e eficientes para a plena utilização da Plataforma, de acordo com as especificações fornecidas pela NFEAT;


                          (iv) manter o Aplicativo sempre atualizado, de acordo com a última versão disponível nas lojas oficiais para dispositivos Apple (App Store) e Android (Google Play Store);


                          (v) manter seus sistemas antispam configurados de modo que não interfiram no recebimento pelo Usuário das comunicações feitas pela NFEAT; e


                          (vi) arcar com eventuais custos de conexão e acesso à internet para o uso da Plataforma.


                          O USUÁRIO É RESPONSÁVEL POR TODA E QUALQUER VIOLAÇÃO DESTES TERMOS DE USO E DA LEI APLICÁVEL, SEJA POR AÇÃO OU OMISSÃO. EM CASO DE INFRAÇÃO COMETIDA PELO USUÁRIO, EM RAZÃO DO DESCUMPRIMENTO DESTES TERMOS DE USO, VIOLAÇÃO DE QUALQUER LEI APLICÁVEL OU DE DIREITOS DA NFEAT E/OU DE TERCEIROS, O Usuário RESPONDERÁ, PERANTE A NFEAT E TERCEIROS, POR TODAS AS PERDAS, DANOS E PREJUÍZOS, DIRETOS E/OU INDIRETOS, A QUE DER CAUSA, SUJEITANDO-SE, INCLUSIVE, ÀS SANÇÕES CIVIS E PENAIS PREVISTAS NA LEGISLAÇÃO APLICÁVEL. O USUÁRIO COMPROMETE-SE A INDENIZAR A NFEAT PELOS DANOS CAUSADOS, INCLUSIVE NOS CASOS DE DEMANDAS PROMOVIDAS POR OUTROS USUÁRIO E/OU TERCEIROS.

                          A NFEAT, SUAS AFILIADAS, PARCEIROS, EMPREGADOS OU COLABORADORES, NÃO PODERÃO SER, EM HIPÓTESE ALGUMA, RESPONSABILIZADOS (I) POR ACESSOS OU MOVIMENTAÇÕES INDEVIDAS EM SUA CONTA POR TERCEIROS; (II) POR DANOS, DIRETOS OU INDIRETOS, QUE RESULTEM DE, OU QUE TENHAM RELAÇÃO COM O MAU USO OU INABILIDADE NO USO DA PLATAFORMA, DA CONTA PELO USUÁRIO OU POR QUAISQUER TERCEIROS; OU (III) PELA VERACIDADE DAS INFORMAÇÕES PESSOAIS E PELAS INFORMAÇÕES DAS OBRAS PRESTADAS PELO USUÁRIO.

                          DIREITO DE RECUSA, CANCELAMENTO E SUSPENSÃO DE CADASTRO

                          O Usuário tem o direito de solicitar, a qualquer momento, mediante simples comunicação à NFEAT pelo e-mail [_], o cancelamento de seu cadastro na Plataforma, o que necessariamente implicará no cancelamento de sua conta.

                          Uma vez solicitado o cancelamento a conta será definitivamente encerrada dentro do prazo máximo de [•] dias.

                          A NFEAT reserva-se o direito de, mediante simples comunicação ao Usuário em questão, suspender preventivamente ou cancelar, a qualquer momento, o respectivo cadastro e a correspondente prestação dos Serviços, caso identifique a ocorrência de desvio de finalidade na utilização da Plataforma, uso indevido da conta obtenção de benefício ou vantagem de forma ilícita, fornecimento de informações falsas, imprecisas, incompletas ou enganosas, não fornecimento de informações e/ou documentos adicionais ou o não cumprimento de quaisquer das condições previstas nestes Termos de Uso ou na legislação aplicável. Nesses casos, nenhuma indenização será devida pela NFEAT ao Usuário ou a terceiros pelos danos diretos e indiretos porventura causados. O Usuário está ciente e de acordo que a NFEAT poderá promover todas as medidas necessárias para perseguir e resguardar seus direitos, incluindo medidas judiciais.


                          DIREITOS DA NFEAT SOBRE A PLATAFORMA

                          Sujeito a estes Termos de Uso, a NFEAT concede ao Usuário uma licença limitada, temporária, não exclusiva e não transferível para usar a Plataforma somente para usufruir dos Serviços, desde que o Usuário cumpra com as suas obrigações dispostas nestes Termos de Uso. A autorização aqui concedida não permite a exploração comercial da Plataforma.

                          Todos os direitos de propriedade intelectual relativos à Plataforma, bem como todas as suas funcionalidades, são de propriedade exclusiva da e/ou são licenciados à NFEAT, inclusive no que diz respeito aos seus textos, imagens, marcas, layouts, software, códigos, bases de dados, gráficos, artigos, fotografias, vídeos, obras audiovisuais e demais conteúdos produzidos direta ou indiretamente pela NFEAT (“Conteúdo NFEAT”).

                          A Plataforma e o Conteúdo NFEAT são protegidos pela legislação de direitos de propriedade intelectual, incluindo direitos autorais, direitos de propriedade industrial, dentre outros direitos. É proibido usar, copiar, reproduzir, modificar, traduzir, publicar, transmitir, distribuir, executar, fazer o upload, exibir, licenciar, vender, explorar, fazer scraping e/ou engenharia reversa da Plataforma e do Conteúdo NFEAT, para qualquer finalidade, sem o consentimento prévio e expresso da NFEAT. Qualquer uso não autorizado da Plataforma e do Conteúdo NFEAT será considerado como violação aos direitos de propriedade intelectual da NFEAT.

                          A NFEAT reserva-se o direito de alterar ou remover da Plataforma, total ou parcialmente, o Conteúdo NFEAT, incluindo funcionalidades, sem comunicação prévia ao Usuário, sem que lhe seja devida qualquer indenização, mas, em nenhum caso, os direitos do Usuário serão afetados.

                          Nenhuma disposição destes Termos de Uso deve ser entendida como restrição ou renúncia de quaisquer direitos da NFEAT sobre a Plataforma, tampouco cessão aos Usuários dos direitos de propriedade intelectual da NFEAT.

                          Todo e qualquer desenvolvimento, arranjo, melhoria, atualização ou nova versão realizados pela NFEAT na Plataforma, nas suas funcionalidades e/ou no Conteúdo NFEAT, ainda que por sugestão ou solicitação do Usuário, serão de titularidade da NFEAT, podendo a NFEAT empregá-los livremente e, sem limitação, adaptá-los, aperfeiçoá-los, transformá-los, reproduzi-los, distribui-los, comercializá-los, levá-los a registro, cedê-los e licenciá-los, a qualquer título e a seu exclusivo critério.

                          Você reconhece que a NFEAT é livre para usar, aplicar, modificar, publicar, reproduzir e comercializar quaisquer comentários, informações, ideias, conceitos, opiniões, técnicas e/ou quaisquer outros materiais contidos em qualquer comunicação que Você envie à NFEAT, seja por meio da Plataforma ou por outros canais de comunicação, incluindo, sem limitação, qualquer sugestão, solicitação de melhorias, recomendações oferecidas pelo Usuário à NFEAT, sejam ou não relacionadas à Plataforma ("Feedback"). Você, neste ato, cede à NFEAT todos os direitos patrimoniais de propriedade intelectual relacionados aos Feedbacks, de forma gratuita, irrevogável, irretratável, total, perpétua e global, sem que seja devido ao Usuário qualquer remuneração, reconhecimento, pagamento ou indenização. Você declara e garante que, anteriormente à presente cessão, era o titular de todos os direitos de propriedade intelectual sobre os Feedbacks (na medida do aplicável) e que o oferecimento dos Feedbacks à NFEAT, incluindo a presente cessão, não viola quaisquer direitos de terceiros.

                          Todos os anúncios, ofertas, promoções, marcas, textos e conteúdo de terceiros veiculados através da Plataforma são de propriedade de seus respectivos titulares, sendo expressamente proibida a utilização indevida de quaisquer conteúdos ou marcas apresentadas na Plataforma.

                          CANAIS DE ATENDIMENTO

                          Somente os contatos realizados por meio dos Canais de Atendimento oficiais da NFEAT serão reconhecidos. Os Canais de Atendimento da NFEAT podem ser consultados aqui: [inserir link].

                          Comunicações ao Usuário. Serão consideradas válidas todas as comunicações e notificações enviadas pela NFEAT ao endereço de correio eletrônico constante do cadastro do Usuário, cabendo a este a responsabilidade por mantê-lo atualizado.


                          O QUE MAIS O USUÁRIO PRECISA SABER SOBRE ESSES TERMOS DE USO?

                          Estes Termos de Uso são regidos pelas leis vigentes na República Federativa do Brasil. Para todos os assuntos referentes à interpretação, ao cumprimento ou a qualquer outro questionamento relacionado a estes Termos de Uso, as partes concordam em se submeter ao Foro da Comarca da Capital de São Paulo, com exceção de demandas apresentadas por Usuários que se enquadrem no conceito legal de consumidores e que apresentem dificuldades concretas em exercer seu direito de ação, que poderão submeter tais reclamações aos foros de seus respectivos domicílios.

                          Qualquer ação que configure, ou possa configurar, prática de crime ou ato de má-fé ou contrário aos bons costumes poderá ensejar a comunicação pela NFEAT às autoridades competentes.

                          Estes Termos de Uso não criam qualquer outra modalidade de vínculo entre o Usuário e a NFEAT, inclusive, sem limitação, mandato, representação, parceria, associação, vínculo empregatício ou similar. A NFEAT permanecerá uma entidade independente e autônoma.

                          A NFEAT poderá, a qualquer tempo, mediante prévia comunicação na Plataforma, ceder os direitos e obrigações referentes a estes Termos de Uso a terceiros, ficando desde já ressalvado que a cessionária continuará a cumprir com todas as obrigações cedidas.

                          Se alguma disposição destes Termos de Uso for considerada inválida, a validade das demais disposições destes Termos de Uso não será afetada e estas continuarão produzindo efeitos.

                          A omissão ou tolerância da NFEAT em exigir o estrito cumprimento das obrigações previstas nestes Termos de Uso não constituirá, em nenhuma hipótese, novação ou renúncia, nem impedirá que a NFEAT cobre esses direitos do Usuário a qualquer tempo.

                          Caso Você tenha qualquer dúvida ou deseje fazer um comentário, sugestão, reclamação ou elogio à NFEAT, Você poderá acessar a seção [∙] ou entrar em contato com a NFEAT por meio do e-mail [∙].


                          [        ] Declaro que li e aceito o inteiro teor destes Termos de Uso, ficando desde já obrigado(a) e sujeito(a) aos direitos e obrigações aqui previstos.

                          JUR_SP - 45436484v5 - 14084002.498808</Text>
                      </ScrollView>
                    </View>
                  </View>
                  <View style={[{ top: 185 }]}>
                    <Switch style={[styles.switch,{top: 32, left: 20}]} checked={true} onChangeEvent={(e) => this.setState({ isSwitchTerms: e.checked })} />
                    <Text style={[styles.titlePrivate, {top: -20, marginLeft: 40}]}>LI E ACEITO OS TERMOS DE RESPONSABILIDADE E CONDIÇÕES DE USO DA PLATAFORMA.</Text>
                  </View>
                  <View style={[{width: '100%', justifyContent: 'center', alignItems: 'center', top: 120, flexGrow: 1, flexDirection: 'row', height: 200}]}>
                    <TouchableOpacity style={[styles.btnBack]} onPress={this.GoToStep3} >
                      <Text style={styles.btnBackText}>VOLTAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnNext} onPress={this.SendSignupRequest}>
                      <Text style={styles.btnNextText}>FINALIZAR CADASTRO</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.marginBottom}></View>
                </View></>
            ) : null}
            {this.state.step5 ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles.imgEndSign} source={require('../../assets/imgs/elements/Twist_12.png')} />
              <Text style={styles.titleSigned}>SEU CADASTRO FOI CONCLUÍDO!</Text>
              <View style={styles.barDiv}></View>
              <Text style={styles.subtitleSigned}>Enviamos um link de confirmação para o seu {"\n"}
                e-mail. Após verificação, você poderá se conectar {"\n"}
                com seu login e senha na área de login. 
              </Text>
              <TouchableOpacity style={styles.btnFinish} onPress={this.FinishRegister}>
                <Text style={styles.textstart}>Iniciar</Text>
              </TouchableOpacity>
            </View>
          ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const width_proportion = '100%';
const height_proportion = '100%';
const styles = StyleSheet.create({
  status: {
    height: 50
  },
  container: {
    overflow: 'scroll', height: '100%', backgroundColor: '#000000'
  },
  background: {
    position: 'absolute', width: width_proportion, height: height_proportion, padding: 620, top: -300, opacity: 0.2,
  },
  page: {
    minHeight: 600, height: '100%'
  },
  buttonsContainer: {
    height: '100%',
  },
  logo: {
    position: 'absolute', left: 20, top: 0, width: 100, height: 55,
  },
  menu: {
    position: 'absolute', right: 0, top: 5,
  },
  title: {
    fontSize: 30, fontFamily: 'Montserrat-Bold', textAlign: 'left', color: '#fff', left: 20
  },
  subtitle: {
    fontSize: 15, fontFamily: 'Montserrat-Regular', textAlign: 'center', color: '#fff', top: 10, right: 20
  },
  titleInpput: { fontSize: 14, left: 20, color: '#fff', marginTop: 10, top: 0 },
  input: {
    backgroundColor: '#FFF', width: '90%', height: 55, borderRadius: 8, color: '#000', fontSize: 16, paddingLeft: 6, left: 20, marginTop: 5, marginBottom: 5, zIndex: 1001
  }, spc1: { top: 125 }, spc2: { top: 160 }, spc3: { top: 125 },
  input2: {
    backgroundColor: '#FFF', width: '90%', height: 55, borderRadius: 8, color: '#000', fontSize: 16, paddingLeft: 6, left: 20, marginTop: 5, marginBottom: 5
  },
  input3: {
    backgroundColor: '#FFF', width: '90%', height: 55, borderRadius: 8, color: '#000', fontSize: 16, top: 0, paddingLeft: 6, left: 20, marginTop: 5, marginBottom: 5, zIndex: 1001
  },
  btn: {
    backgroundColor: "#A72698", width: '90%', height: 55, borderRadius: 25, color: "#fff", justifyContent: "center",
    alignSelf: "stretch", textAlignVertical: "center", bottom: 5,
  },
  textBTN: { color: '#FFF', fontFamily: 'Montserrat-Regular', fontSize: 16, textAlign: 'center', top: 0, },
  help: { color: '#FFF', position: 'absolute', fontSize: 11, textAlign: 'center', left: 0, right: 0, bottom: -220, textDecorationLine: 'underline' },
  error: { color: '#ff375b', fontSize: 15, alignSelf: 'center', top: -90 }, errorpassword: { color: '#ff375b', fontSize: 15, alignSelf: 'center', top: -55 },
  row: { flexDirection: 'row', width: '100%', minHeight: 100, height: '100%', position: 'absolute' },
  choiseProfile: { fontSize: 18, fontFamily: 'Montserrat-Regular', textAlign: 'left', color: '#666', left: 20, top: -3 }, selected: { fontSize: 15, fontFamily: 'Montserrat-Light', textAlign: 'center', color: '#fff',right: 20 },
  slides: { width: '90%', height: 200, borderRadius: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', alignContent: 'center', backgroundColor: '#CCC', top: 210 },
  imgSlids: { width: '100%', height: 200, borderRadius: 30 },
  titleSlide: { fontFamily: 'Montserrat-Bold', fontSize: 28, color: '#FFF', left: 65, top: 60, position: "absolute", zIndex: 1000, },
  titleSlide2: { fontSize: 28, color: '#FFF', left: 100, top: 60, position: "absolute", zIndex: 1000, },
  type: { fontFamily: 'Montserrat-Bold', fontSize: 36, textAlign: 'left' },
  iconType: { position: 'absolute', zIndex: 1001, left: 8, height: 38, width: 38 },
  iconType2: { position: 'absolute', zIndex: 1001, left: 45, },
  description: { position: 'absolute', color: '#fff', fontFamily: 'Montserrat-Light', fontSize: 16, textAlign: 'left', top: 430, left: 10 },
  textdescription: { position: 'absolute', color: '#fff', fontSize: 13, textAlign: 'left', top: 465, left: 10 },
  iconLeft: { position: 'absolute', top: 0, zIndex: 1001, left: 0, top: 0, height: '100%', width: 50, justifyContent: 'center' },
  iconRight: { position: 'absolute', top: 0, zIndex: 1001, right: 0, top: 0, height: '100%', width: 50, justifyContent: 'center' },
  leftSlide: { width: 50, height: '100%', left: 3, position: 'absolute', top: 0, zIndex: 1001, justifyContent: 'center' },
  icon: { width: 50, height: 50 },
  selectoptions: { backgroundColor: '#FFF', width: '90%', height: 55, borderRadius: 8, color: '#ddd', fontSize: 16, paddingLeft: 12, left: 20, marginTop: 5, marginBottom: 5 },
  iconPicker: { position: 'absolute', right: 0, marginRight: 10, marginTop: 17, width: 28, height: 28 },
  titlePicker: { color: '#d1d1d1', fontSize: 16, left: 0, top: 17 }, picker: { left: 0, top:20, height: '80%', width: '100%' },
  barDiv: { top: 140 },
  titleCollection: { fontSize: 18, color: '#FFF', left: 20,},
  titlePrivate: { fontSize: 15, color: '#FFF', left: 65, width: '60%'},
  switch: { left: 20 },
  btnBack: { borderWidth: 2, borderColor: '#FFF', backgroundColor: 'transparent', borderRadius: 30, left: -10, width: '42%', height: 45, justifyContent: 'center' },
  btnBackText: { color: '#FFF', fontSize: 14, textAlign: 'center', top: 0 },
  btnNext: { backgroundColor: '#CCC', borderRadius: 30, width: '42%', height: 45, justifyContent: 'center', left: 10 },
  btnNextText: { color: '#101010', fontSize: 14, textAlign: 'center', top: 0 },
  footer: { height: 250, width: 200, top: 160 },
  inpuTitle: { fontSize: 13, color: '#FFF', textAlign: 'left', justifyContent: 'flex-start', top: 10, left: 10 },
  passwordRequest: {alignItems: 'center', justifyContent: 'center', width: '80%', height: 200, left: 35 },
  itemPass: { height: 45 }, iconItempass: { height: 34, width: 34, top: 10,  alignItems: 'flex-start', left: -105 }, textItempass: { width: '80%', fontSize: 15, textAlign: 'left', top: 10, color: '#fff', left: -65, position: 'absolute' },
  areaTerms: { width: '90%', height: 350, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', top: 180 },
  termsview: { width: '96%', height: 320 }, textTerms: { left: 10, top: 10, }, marginBottom: { height: 150, width: '100%', top: 250 },
  barprogress: { width: '90%', height: 3, borderRadius: 5, backgroundColor: '#FFFFFF28', marginTop: 10, position: 'absolute' },
  progressuntilnow: { width: '30%', height: 3, borderRadius: 5, backgroundColor: '#67D3C5', left: 0 },
  progressuntilnowtwo: { width: '60%', height: 3, borderRadius: 5, backgroundColor: '#67D3C5', left: 0 },
  progressuntilnowthree: { width: '90%', height: 3, borderRadius: 5, backgroundColor: '#67D3C5', left: 0 },
  progressuntilnowend: { width: '100%', height: 3, borderRadius: 5, backgroundColor: '#67D3C5', left: 0 },
  screenLoad: { width: '100%', height: '100%', backgroundColor: '#00000070', position: 'absolute', zIndex: 2000, justifyContent: 'center', alignItems: 'center' },
  load: { position: 'absolute', zIndex: 2001, top: '46%', },
  imgEndSign: { width: 220, height: 220, top: '24%' },
  titleSigned: { fontFamily: 'Montserrat-Bold', fontSize: 30, color: '#fff', top: 110, textAlign: 'center' },
  subtitleSigned: { fontFamily: 'Montserrat-Light', fontSize: 15, textAlign: 'center', color: '#cccccc80', top: 120 },
  btnFinish: { backgroundColor: 'transparent', borderRadius: 25, width: '50%', height: 50, borderColor: '#FFFF', borderWidth: 2, marginTop: 150, justifyContent: 'center', alignItems: 'center' },
  textstart: { fontFamily: 'Montserrat-Regular', fontSize: 15, color: '#fff', textAlign: 'center' },
});

export default RegisterPage;