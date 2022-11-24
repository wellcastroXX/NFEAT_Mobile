import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet, FlatList, TextInput, Image, Switch, TouchableOpacity } from 'react-native';
import CheckBox from "expo-checkbox";
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SearchBar } from 'react-native-elements';

const state = yup.object({
  items: [],
});

class AccountPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          register: true,
          profile: false,
          security: false,
          isSwitchTerms: false,
        };
      }

     Goregister = () => {
       this.setState({register: true});
       this.setState({profile: false});
       this.setState({security: false});
    }

     Goprofile = () => {
        this.setState({register: false});
        this.setState({profile: true});
        this.setState({security: false});
     }

     Gosecurity = () => {
        this.setState({register: false});
        this.setState({profile: false});
        this.setState({security: true});
     }

     Back = () => {
      this.props.navigation.goBack();
     } 

    render(){
        return(
            <SafeAreaView style={styles.container}>
               <ScrollView >
                <StatusBar style={styles.status} 
                    animated={true} 
                    barStyle={'light-content'} />
                    <Image style={styles.background} source={require('../../assets/imgs/elements/Twist_01.png')}/>
                    <TouchableOpacity style={styles.back} onPress={this.Back} >
                      <Image source={require('../../assets/imgs/white/png/arrow-left.png')}/>
                    </TouchableOpacity>
                    <View style={styles.header}>
                      <Image style={styles.logo} source={require('../../assets/logo/logo_white.png')} />
                    </View>

                    <View style={{height: '100%', }}>
                        <View style={styles.head}>
                           <Image style={styles.iconhead} source={require('../../assets/imgs/white/png/user.png')} />
                           <Text style={styles.texthead}>CONTA</Text><View style={styles.barhead}></View>
                        </View>
                        <View style={styles.box}>
                            <View style={styles.boxhead}>
                                {this.state.register && <TouchableOpacity style={styles.boxheadItem} >
                                   <Text style={styles.boxItemTitle}>CADASTRO</Text>
                                </TouchableOpacity>}
                                {!this.state.register && <TouchableOpacity style={styles.boxheadItemDisabled} onPress={this.Goregister}>
                                   <Text style={styles.boxItemTitle}>CADASTRO</Text>
                                </TouchableOpacity>}
                                {this.state.profile && <TouchableOpacity style={styles.boxheadItem} >
                                   <Text style={styles.boxItemTitle}>PERFIL</Text>
                                </TouchableOpacity>}
                                {!this.state.profile && <TouchableOpacity style={styles.boxheadItemDisabled} onPress={this.Goprofile}>
                                   <Text style={styles.boxItemTitle}>PERFIL</Text>
                                </TouchableOpacity>}
                                {this.state.security && <TouchableOpacity style={styles.boxheadItem}>
                                   <Text style={styles.boxItemTitle}>SEGURANÇA</Text>
                                </TouchableOpacity>}
                                {!this.state.security && <TouchableOpacity style={styles.boxheadItemDisabled} onPress={this.Gosecurity}>
                                   <Text style={styles.boxItemTitle}>SEGURANÇA</Text>
                                </TouchableOpacity>}

                            </View>
                            {this.state.register && <View style={styles.boxbody}>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>CATEGORIA</Text>{/* onChangeText={}  */}
                                    <TextInput style={styles.inputDisabled} editable={false} selectTextOnFocus={false}/>
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>MEU ENDEREÇO CRIPTO</Text>
                                    <TextInput style={styles.inputDisabled} editable={false} selectTextOnFocus={false}/>
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>NOME</Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>SOBRENOME</Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>E-MAIL</Text>
                                    <TextInput style={styles.inputDisabled} editable={false} selectTextOnFocus={false}/>
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>TELEFONE</Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>NACIONALIDADE</Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>NASCIMENTO</Text>
                                    <TextInput style={styles.input} />
                                </View>
                                
                                <View style={styles.divbar}>
                                  <Text style={styles.titlediv}>DADOS DO ARSTISTA</Text>
                                </View>

                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>NOME ARTÍSTICO </Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.bottombody}>
                                  <View style={styles.leftbottom}>
                                     <Switch style={styles.switch} value={[this.state.isSwitchTerms, { flexGrow: 1, flexDirection: 'row' }]}  />
                                     <Text style={[styles.titlePrivate,]}>PERFIL PRIVADO (NÃO APARECERÁ NAS BUSCAS)</Text>
                                  </View>
                                  <View style={styles.rightbottom}>
                                    <TouchableOpacity style={styles.btnSaveDisabled}><Text>SALVAR</Text></TouchableOpacity>
                                  </View>
                                </View>

                            </View>}
                            {this.state.profile && <View style={styles.boxbody}>
                                <View style={styles.itembody}>
                                    <Text style={styles.titlePicUser}>FOTO DE PERFIL</Text>{/* onChangeText={}  */}
                                    <TouchableOpacity style={styles.Photoupload}>
                                      <Image style={styles.icon_photo} source={require('../../assets/imgs/white/png/images.png')} />
                                      <Text style={styles.text_photo}>Click para fazer o upload</Text>
                                      <Image style={styles.background_photo} source={require('../../assets/imgs/outros/pic_default.jpeg')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.itembody, {marginTop: 50}]}>
                                    <Text style={[styles.titleInput]}>IMAGEM DE CAPA</Text>
                                    <TouchableOpacity style={styles.cover}>
                                      <Image style={styles.icon_photo} source={require('../../assets/imgs/white/png/images.png')} />
                                      <Text style={styles.text_photo}>Click para fazer o upload</Text>
                                      <Image style={styles.cover_img} source={require('../../assets/imgs/outros/default_bg.jpeg')} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>BIOGRAFIA</Text>
                                    <TextInput style={[styles.input, { height: 100 }]} />
                                </View>
                                
                                <View style={styles.divbar}>
                                  <Text style={styles.titlediv}>REDES SOCIAIS</Text>
                                </View>

                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>TWITTER </Text>
                                    <TextInput style={styles.input} />
                                </View>
                                <View style={styles.itembody}>
                                    <Text style={styles.titleInput}>FACEBOOK </Text>
                                    <TextInput style={styles.input} />
                                </View>

                                <View style={styles.bottombody}>
                                  <TouchableOpacity style={styles.btnSaveProfile}><Text style={{color: '#fff'}}>SALVAR</Text></TouchableOpacity>
                                </View>

                            </View>}
                            <View style={styles.footbar}></View>
                        </View>
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
  head: { width: '90%', height: 65, marginTop: 85, borderBottomWidth: 4, borderColor: '#FFFFFF40', },
  title: { left: 0, fontSize: 26, fontWeight: '500', color: '#FFF',  },
  head: { width: '100%', top: 70, flexDirection: 'row', backgroundColor: 'transparent' },
  iconhead: { height: 42, width: 42, left: 15, opacity: 0.5 },
  texthead: { fontSize: 28, fontWeight: '400', color: '#FFF', marginTop: 4, left: 20 },
  barhead: { height: 3, width: '55%', left: 30, marginTop: 17, backgroundColor: '#fff', opacity: 0.3, borderRadius: 4 },
  box: { width:"100%", height: '100%', minHeight: 1000, backgroundColor: '#3F3F3F', justifyContent: 'center', top: 150,
    alignItems: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50, zIndex: 1000
  },
  boxhead: { width: '96%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -34,  },
  boxheadItem: { width: '30%', height: 40, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#3F3F3F' },
  boxheadItemDisabled: {  width: '30%', height: 40, borderTopLeftRadius: 14, borderTopRightRadius: 14, backgroundColor: '#3F3F3F60', },
  boxItemTitle: { textAlign: 'center', fontSize: 15, marginTop: 8, fontWeight: '500', color: '#FFF',  },
  boxbody: { minHeight: 800, justifyContent: 'center', alignItems: 'center', top: 30 ,width: '100%', },
  itembody: { width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  titleInput: { textAlign: 'left', fontSize: 16, fontWeight: '400', color: '#FFF', left: 2, top: -25, position: 'absolute', },
  input: { height: 58, width: '100%', borderRadius: 10, backgroundColor: '#FFF', paddingLeft: 6, },
  inputDisabled: { height: 58, width: '100%', borderRadius: 10, backgroundColor: '#FFFFFF40' },
  divbar: { height: 50, width: '90%', marginBottom: 20, borderBottomWidth: 3, borderBottomColor: '#ffffff30', marginTop: 10 },
  titlediv: { fontSize: 15, marginTop: 15, fontWeight: '500', color: '#FFF',},
  bottombody: { width: '90%', height: 120, justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row',},
  leftbottom: { left: 0, width: '50%', justifyContent: 'center', alignItems: 'center' },
  switch: { width: 10, height: 20, position: 'absolute', top: 6, left: 0 },
  titlePrivate: { fontSize: 10, fontWeight: '400', textAlign: 'left', color: '#FFF', marginLeft: 70, marginTop: 6 },
  back: { width: 50, height: 50, left: 0, marginLeft: 20, marginTop: 0, borderRadius: '50%', backgroundColor: '#FFFFFF20',
  justifyContent: 'center', alignItems: 'center' },
  iconBack: { width: 20, height: 20 },
  rightbottom: { right: 0, width: '50%', },
  btnSaveDisabled: { backgroundColor: '#747474', width: '80%', height: 46, borderRadius: 30, justifyContent: 'center', alignItems: 'center', 
    right: 0, position: 'absolute', marginTop: -20
  },
  titlePicUser: { fontSize: 13, fontWeight: '300', textAlign: 'center', color: '#FFF', marginTop: 10 },
  Photoupload: { width: '60%', height: 200, borderRadius: '100%', borderColor: '#FFF', borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginTop: 25 },
  background_photo: { width: '99%', height: 196, borderRadius: '100%', marginTop: 0, position: 'absolute', zIndex: 999 },
  icon_photo: { width: 60, height: 60, top: 50, position: 'absolute', zIndex: 1000 },
  text_photo: { color: '#FFF', fontSize: 14, width: '60%', textAlign: 'center', top: 130, position: 'absolute', fontWeight: 'bold' ,zIndex: 1000 },
  cover: { width: '100%', height: 200, borderRadius: 10, borderColor: '#FFF', borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  cover_img:  { width: '100%', height: 196, borderRadius: 8 },
  btnSaveProfile: { backgroundColor: '#9B1397', width: '40%', height: 46, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },

  footbar: { height: 200, width: '100%', flex: 1,  }
})

export default AccountPage;