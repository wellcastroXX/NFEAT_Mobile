import React, { useState, useEffect } from 'react';
import { Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Login, SetLoginData, ForgotPassword } from "../environment/env";
/* import TouchID from 'react-native-touch-id'; */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { CheckBox } from 'react-native-elements'
import { WebView } from 'react-native-webview';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];
const schema = yup.object({
  email: yup.string().email("Email inválido").required("Informe seu email"),
  password: yup.string().required("Informe sua senha")
})

const LoginPage = () => {
  
  const navigation = useNavigation(); 
  const [load, setLoad] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [supported, SetSupported] = useState(null);
  const [SecLogin, SetSecondLogin] = useState('');
  const [Conect, SetConnect] = useState(false);
  const [recoverPassEmailSent, SetRecoverEmail] = useState(false);
  const [allowFaceID, SetAllowFaceID] = useState(false);
  const [allowWebPassword, SetAllowForgetWeb] = useState(false);
  const [email, SetEmail] = useState('');
  const [password, SetPassword] = useState('');

  useEffect(() => {
    /* const allow = true;
    SetAllowFaceID(allow);
    TouchID.isSupported().then(success => {
      SetSupported(true);
      const VerifyLogin = AsyncStorage.getItem('Login').then((response) => {
        const res = response; 
        SetSecondLogin(res);
      });
      console.log(SecLogin);
      if(SecLogin == 1){
        console.log('Second Login');
        const allow = true;
        SetAllowFaceID(allow);
      }else{
        console.log('First Login');
      }
    })
    .catch((error) => {
      console.log('Device is not supported: ', error);
    }) */
  }, []);

  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const DeclineFaceID = () => {
    const notAllow = false;
    SetAllowFaceID(notAllow);
    const uncheck = false;
    SetConnect(uncheck);
  }

  /* LOGIN */
  const AuthRequest = async (data) => {
    const allowLoad = true;
    setLoad(allowLoad);
    console.log('start login');
      if (data.email === "" || data.password === "") {
        const disableLoad = false;
        setLoad(disableLoad);
        Alert.alert(
          "Erro",
          "Favor preencher corretamente os campos de e-mail e senha",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      } else {
        const auth = {
          "email": data.email,
          "password": data.password
        }
        //saving data login
        AsyncStorage.setItem('emailuser', auth.email);
        AsyncStorage.setItem('passworduser', auth.password);
        console.log(auth);
        try {
          console.log('trying logeed');
          const loginAttempt = await Login(auth);
          const userData = await loginAttempt;

          setTimeout(()=>{
            const Token = AsyncStorage.getItem('access-token').then((response) => {
              console.log(response);
              if(response != undefined){
                
                AsyncStorage.setItem('Login', '1');
                navigation.navigate('MainContainer');
                const disableLoad = false;
                setLoad(disableLoad);
              }else{
                Alert.alert(
                  "Falha ao fazer login",
                  "Preencha seus dados corretamente e tente novamente!",
                  [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ]
                );
                const disableLoad = false;
                setLoad(disableLoad);
              }
            });
          }, 1500); 
        } catch (e) {
          var err = e.message;
          console.log(err);
          if(e.response.data !== null){
            if(e.response.data.message !== null){
              err = e.response.data.message[0];
            }
          }
          Alert.alert(
            "Algo deu errado!",
            "Digite seus dados e tente novamente",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          const disableLoad = false;
          setLoad(disableLoad);
        }
      }
  }

  const AuthWithFaceID = async () => {
    const configs = {
      title: 'Autenticação Face ID/Touch ID',
      color: '#A72698',
      sensorErrorDescription: 'Autenticação Face ID/Touch ID inválida',
    };
    TouchID.authenticate("Login NFEAT", configs)
    .then( async success => {
      console.log('Accept');
      const emailuser = AsyncStorage.getItem('emailuser').then((response) => {
        const email = response;
        SetEmail(email);
      });
      const passworduser = AsyncStorage.getItem('passworduser').then((response) => {
        const pass = response;
        SetPassword(pass);
      });
      const auth = {
        "email": email,
        "password": password
      }
      console.log(auth);
      try {
        console.log('trying logeed');
        const loginAttempt = await Login(auth);
        const userData = await loginAttempt;
        navigation.navigate('MainContainer');
        const disableLoad = false;
        setLoad(disableLoad);
      } catch (e) {
        var err = e.message;
        console.log(err);
        if(e.response.data !== null){
          if(e.response.data.message !== null){
            err = e.response.data.message[0];
          }
        }
        Alert.alert(
          "Erro",
          "Algo deu errado! Tente novamente",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        const disableLoad = false;
        setLoad(disableLoad);
      }
    })
    .catch( error => {
      console.log('Authentication failed: ', error);
    })
  }

  const enableLoginWithBio = async () => {
    AsyncStorage.setItem('Bio', 'true');
    const closeModal = false;
    SetAllowFaceID(closeModal);
  }

  function submit(data) {
    AuthRequest(data);
  }

  const Back = () => {
    navigation.navigate('Start');
  }

  const CheckConnect = () => {
    SetConnect(true);
    AsyncStorage.setItem('KeepConnected', 'true');
    const OpenModal = true;
    SetAllowFaceID(OpenModal);
  }

  const ForgetPassword = () => {
    const allow = true;
    SetAllowForgetWeb(allow);
  }

  const BackToLogin = () => {
    const allow = false;
    SetAllowForgetWeb(allow);
  }

  function Request(data) {
    RequestPassword(data)
  }

  const RequestPassword = async (data) => {
    const allowLoad = true;
    setLoad(allowLoad);
    const auth = {
      "email": data.email,
    }
    try {
      const passReset = await ForgotPassword(auth);
      console.log(passReset)
      const request = true;
      SetRecoverEmail = request;
      const allowLoad = false;
      setLoad(allowLoad);
      if(passReset.status === 201){
        this.setState({recoverPassEmailSent:true })
      } else {
        Alert.alert(
          "Ocorreu algum erro. Favor tentar novamente!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }

    } catch (e) {
      var err = e.message;
      if(e.response.data !== null){
        if(e.response.data.message !== null){
          err = e.response.data.message;
        }
      }
      const allowLoad = false;
      setLoad(allowLoad);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {allowWebPassword && 
      <View style={{height: '100%', zIndex: 50000}}>
        {!recoverPassEmailSent && <><View>
          <TouchableOpacity style={styles.back} onPress={BackToLogin}>
            <Image source={require('../../assets/imgs/white/png/arrow-left.png')} />
          </TouchableOpacity>
          <View style={styles.header}>
            <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
          <Text style={styles.titleforget}>RECUPERAÇÃO {"\n"} DE SENHA</Text>
          <View style={styles.bardiv}></View>
          <Text style={styles.subtitleforget}>Digite seu e-mail para continuar</Text>
        </View>
          <View style={[styles.boxInput, {top:30}]}>
            <View style={styles.BoxEmail}>
              <Text style={styles.titleEmail}>E-MAIL</Text>
              <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={[styles.input, { borderWidth: errors.password && 1, borderColor: errors.password && '#ff375b' }]} onChangeText={onChange} onBlur={onBlur} value={value} />
              )} />
            </View>
          </View><View style={{width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', top: 80, flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btnbackforget} onPress={BackToLogin}>
              <Text style={styles.btntitle}>VOLTAR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSentEmailforget} onPress={handleSubmit(Request)}>
              <Text style={styles.btntitle}>SOLICITAR TROCA</Text>
            </TouchableOpacity>
          </View></>}
          {recoverPassEmailSent &&
          <View>
            <View>
              <Text>RECUPERAÇÃO {"\n"}DE SENHA</Text>
              <Text>Seu pedido de recuperação de senha foi enviado para {"\n"}
              {email}. Caso não tenha recebido, favor {"\n"}
              aguardar alguns minutos e verificar em sua caixa de SPAM.</Text>
              <View style={styles.bardiv}></View>
              <TouchableOpacity><Text>REVISAR E ENVIAR NOVAMENTE</Text></TouchableOpacity>
            </View>
          </View>}

      </View>}
      {load && (<View style={styles.screenLoad}>
         <ActivityIndicator style={styles.load} size="large" color="#A72698" />
      </View>)}
      <StatusBar style={styles.status}
        animated={true}
        backgroundColor="#FFF"
        barStyle={'light-content'} />
      <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_10.png')}/>
      {!allowWebPassword && <View style={{height: '100%'}}>
          <View>
            <TouchableOpacity style={styles.back} onPress={Back} >
              <Image source={require('../../assets/imgs/white/png/arrow-left.png')} />
            </TouchableOpacity>
            <View style={styles.header}>
              <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
            </View>
          </View>
          <Text style={styles.title}>LOGIN</Text>
          <View style={{ width: 200, borderBottomColor: 'white', borderBottomWidth: StyleSheet.hairlineWidth, top: -190, left: 75 }} />
          <Text style={styles.subtitle}>Entre com seus dados de acesso para {"\n"}acessar sua conta.</Text>
          <View style={styles.boxInput}>
            <View style={styles.BoxEmail}>
              <Text style={styles.titleEmail}>E-MAIL</Text>
              <Controller control={control} name="email" render={({ field: { onChange, onBlur, value } }) => (
                <TextInput autoCapitalize='none' style={[styles.input, { borderWidth: errors.password && 1, borderColor: errors.password && '#ff375b' }]} onChangeText={onChange} onBlur={onBlur} value={value} />
              )}
              />
              {errors.email && <Text style={styles.error}>{errors.email?.message}</Text>}
            </View>
            <View style={styles.BoxPassword}>
              <Text style={styles.titlePassword}>SENHA</Text>
              <Controller control={control} name="password" render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={[styles.input2, { borderWidth: errors.password && 1, borderColor: errors.password && '#ff375b' }]} onChangeText={onChange} onBlur={onBlur} value={value} secureTextEntry={true} />
              )}
              />
              {errors.password && <Text style={styles.errorpassword}>{errors.password?.message}</Text>}
            </View>
            <CheckBox
              title='Manter conectado' containerStyle={styles.checkedbox} textStyle={{color: '#fff'}} center
              checkedIcon={<Image style={styles.iconcheck} source={require('../../assets/imgs/outros/toggle-on-solid.png')} />}
              uncheckedIcon={<Image style={styles.iconcheck} source={require('../../assets/imgs/outros/toggle-off-solid.png')} />}
              checked={Conect} onPress={CheckConnect}
            />
            <TouchableOpacity style={styles.BtnForgetPassword} onPress={ForgetPassword}>
              <Text style={styles.forgetpassword}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
          {allowFaceID && (<View style={styles.modalarea}>
            <View style={styles.modal}>
              <View>
                <Image style={styles.iconfaceid} source={require('../../assets/imgs/outros/face-id.png')} />
              </View>
              <View>
                <Text style={styles.titlefaceid}>Login com Face ID/Touch ID</Text>
                <Text style={styles.descriptionfaceid}>Ative a Face ID/Touch ID, para ter acesso a sua{"\n"}conta mais rápido e com mais segurança.</Text>
              </View>
              <TouchableOpacity onPress={enableLoginWithBio} style={styles.btnEnabledFaceID}><Text style={styles.textBTN}>Ativar</Text></TouchableOpacity>
              <TouchableOpacity onPress={DeclineFaceID}><Text style={styles.declineFaceID}>Agora não</Text></TouchableOpacity>
            </View>
          </View>)}
          <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={styles.btn} buttonstyle={styles.btn} >
              <Text style={styles.textBTN}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{position: 'absolute', bottom: 50 , width: '100%', height: 20}}>
            <Text style={styles.help}>Ainda não tem conta? Cadastrar-se</Text>
          </TouchableOpacity>
      </View>}
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
    flex: 1, top: 0,
    justifyContent: 'center',
    height: '100%', width: '100%',
    backgroundColor: '#000000', zIndex: 1,
  },
  background: {
    position: 'absolute', width: width_proportion, height: height_proportion, right: -300, padding: 500, top: -450, opacity: 0.2,
  },
  buttonsContainer: {
    flex: 1, height: '100%', width: '100%', top: -5
  },
  logo: { top: -52, width: 100, height: 55, position: 'absolute' },
  menu: {
    position: 'absolute', right: 0, top: 20, width: 400, height: 400,
  },
  title: {
    fontFamily: 'Montserrat-Bold', fontSize: 45, textAlign: 'center', color: '#fff', top: 40
  },
  subtitle: {
    fontFamily: 'Montserrat-Regular', fontSize: 15, textAlign: 'center', color: '#fff', top: 50
  },
  boxInput: {
    top: 100,
  },
  back: {
    width: 50, height: 50, left: 0, marginLeft: 20, marginTop: 0, borderRadius: 50, backgroundColor: '#FFFFFF30',
    justifyContent: 'center', alignItems: 'center'
  },
  iconBack: { width: 20, height: 20 },
  header: { justifyContent: 'center', alignItems: 'center' },
  titleEmail: { color: '#FFF', fontSize: 14, fontFamily: 'Montserrat-Light', textAlign: 'center', left: 30, position: 'absolute', top: -10 },
  titlePassword: { color: '#FFF', fontSize: 14, fontFamily: 'Montserrat-Light', textAlign: 'center',fontWeight: 'normal', left: 30, position: 'absolute', top: 20,  },
  input: {
    backgroundColor: '#FFF', height: 50, borderRadius: 8, color: '#000', fontSize: 16, width: '85%', paddingLeft: 6,
  }, input2: {backgroundColor: '#FFF', height: 50, width: '85%', borderRadius: 8, color: '#000', fontSize: 16, top: 30, paddingLeft: 6,},
  btn: {
    backgroundColor: "#A72698", width: '80%', height: 55, borderRadius: 25, color: "#fff", justifyContent: "center",
    alignSelf: "stretch", position: 'absolute', textAlignVertical: "center", left: 45, position:  'absolute', bottom: 100
  },
  textBTN: { color: '#FFF', fontFamily: 'Montserrat-Bold', fontSize: 16, textAlign: 'center', top: 0, },
  help: { color: '#FFF', fontFamily: 'Montserrat-Regular', fontSize: 12, textAlign: 'center', left: 0, right: 0, position: "absolute", bottom: 0, zIndex: 5000, textDecorationLine: 'underline'},
  error: { color: '#ff375b', fontSize: 15, alignSelf: 'center', top: 0 }, errorpassword: { color: '#ff375b', fontSize: 15, alignSelf: 'center', top: 40 },
  screenLoad: { width: '100%', height: '100%', backgroundColor: '#00000070', position: 'absolute', zIndex: 2000, justifyContent: 'center', alignItems: 'center' },
  load: { position: 'absolute', zIndex: 2001, top: '46%', },
  BoxEmail: { height: 80, width: '100%', justifyContent:  'center', alignItems: 'center' },
  BoxPassword: { height: 80, width: '100%', justifyContent:  'center', alignItems: 'center', marginTop: -10 },
  modalarea: { justifyContent: 'center', alignItems: 'center', height: '120%', top: -50, position: 'absolute', width: '100%', zIndex: 2000, backgroundColor: '#00000080' },
  modal: { width: '96%', height: 346,  position: 'absolute', bottom: 84, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', },
  iconfaceid: { width: 100, height: 100, marginTop: -50 },
  titlefaceid: { color: '#141414', fontFamily: 'Montserrat-Bold', fontSize: 18, textAlign: 'center', top: 0, },
  descriptionfaceid: { color: '#141414', fontFamily: 'Montserrat-Regular', fontSize: 14, textAlign: 'center', top: 10, },
  btnEnabledFaceID: { backgroundColor: "#A72698", width: '40%', height: 38, borderRadius: 25, color: "#fff", textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 25 },
  declineFaceID: { color: '#141414', top: 20, fontFamily: 'Montserrat-Regular', textAlign: 'center', justifyContent: 'center', alignItems: 'center', }, 
  iconcheck: { height: 32, width: 38 },
  checkedbox: { backgroundColor: 'transparent', borderColor: 'transparent', marginTop: 15, left: 10 },
  BtnForgetPassword: { marginTop: 10, width: '100%', justifyContent: 'center', alignItems: 'center' },
  forgetpassword: { fontFamily: 'Montserrat-Regular', textAlign: 'center', fontSize: 12, color: '#fff' },
  titleforget: { fontFamily: 'Montserrat-Bold', textAlign: 'center', fontSize: 30, color: '#fff', marginTop: 20 },
  bardiv: { width: '34%', height: 0.3, backgroundColor: '#ccc', marginTop: 15, marginBottom: 15  },
  subtitleforget: { fontFamily: 'Montserrat-Regular', textAlign: 'center', fontSize: 13, color: '#fff' },
  btnbackforget: { width: '38%', height: 46, right: 5, backgroundColor: 'transparent', borderColor: '#fff', borderWidth: 1, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  btntitle: { textAlign: 'center', fontFamily: 'Montserrat-Regular', textAlign: 'center', fontSize: 14, color: '#FFF' },
  btnSentEmailforget: { width: '45%', height: 46, backgroundColor: '#A72698', borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
});

export default LoginPage;