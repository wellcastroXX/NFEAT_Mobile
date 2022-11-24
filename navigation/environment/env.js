'use strict'
const axios = require('axios')
const SERVER_PATH = "https://api.nfeat.io";
import AsyncStorage from '@react-native-async-storage/async-storage';

//Header
const header = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Authorization, X-CSRF-Token, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
};

//[GET] Get users (Full data)
async function GetUserData(id) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/users/${id}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get User Webform Data (edit screen)
async function GetWebformData() {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/accounts/edit/web-form-data`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get users (Web-Profile)
async function GetUsers(address) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/users/web-profile-info?publicAddress=${address}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get Login Info
async function GetUserInfo() {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/accounts`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}


//[GET] Explorer
async function UseExplorer(query, items, page="1") {
  const res = await fetch(`${SERVER_PATH}/v1/explorer${query !== "" ? "?title="+query+"&" : "?"}page=${page}&perPage=${items}&orderBy=desc`, { method: 'GET', headers: header })
  const data = await res.json();
  return data;
}


//[GET] Get Arts from Artists
async function GetArtsFromArtist(address, orderBy = "desc", page = 1, perPage= 12, query="") {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/certificates${query !== "" ? "?title="+query+"&" : "?"}artistPublicAddress=${address}&page=${page}&perPage=${perPage}&orderBy=${orderBy}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get Arts from user
async function GetArtsFromUser(address, orderBy = "desc", page = 1, perPage= 12, query ="") {
  console.log(`${SERVER_PATH}/v1/certificates?${query !== "" ? "title="+query+"&" : ""}${address !== "" ? "ownerPublicAddress="+address+"&" : ""}page=${page}&perPage=${perPage}&orderBy=${orderBy}`)

  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/certificates?${query !== "" ? "title="+query+"&" : ""}${address !== "" ? "ownerPublicAddress="+address+"&" : ""}page=${page}&perPage=${perPage}&orderBy=${orderBy}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get Drafts from user
async function GetDraftsFromUser(orderBy = "desc", page = 1, perPage= 12, query="") {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/certificates/drafts${query !== "" ? "?title="+query+"&" : "?"}page=${page}&perPage=${perPage}&orderBy=${orderBy}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}


//[GET] Get Art
async function GetArt(artId) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/certificates/${artId}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  if (data.statusCode === 409) {
    finalResult = { result: null }
  }
  return data;
}
//[GET] Get Artists
async function GetArtists(query) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/artists?search=${query}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[GET] Get Artist
async function GetArtist(artistId) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await fetch(`${SERVER_PATH}/v1/account/artists/${artistId}`, { method: 'GET', headers: header })
  const data = await res.json();
  delete header.Authorization;
  return data;
}

//[POST] Create Art
async function CreateArt(body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.post(`${SERVER_PATH}/v1/certificates`, body, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    return err;
  }
  )
  delete header.Authorization;
  return res;
}

//[POST] Change Profile Picture
async function ChangeProfilePicture(formData) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.post(`${SERVER_PATH}/v1/accounts/edit/profile-picture`, formData, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    return err;
  }
  )
  delete header.Authorization;
  return res;
}

//[POST] Change Background Picture
async function ChangeBackgroundPicture(formData) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.post(`${SERVER_PATH}/v1/accounts/edit/background-picture`, formData, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    return err;
  }
  )
  delete header.Authorization;
  return res;
}

//[POST] Signup User
async function SignupUser(body, group) {
  const res = await axios.post(`${SERVER_PATH}/v1/accounts/${group}`, body, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    console.log(err)
    return err;
  }
  )
  return res;
}

//[PATCH] Edit User
async function EditUser(body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.patch(`${SERVER_PATH}/v1/accounts/edit`, body, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    console.log(err)
    return err;
  }
  )
  delete header.Authorization;
  return res;
}

//[PATCH] Edit Password
async function EditPassword(body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.patch(`${SERVER_PATH}/v1/accounts/edit/password`, body, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    console.log(err)
    return err;
  }
  )
  delete header.Authorization;
  return res;
}


//[PATCH] Edit Certificate 
async function EditCertificate(certificateId, body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.patch(`${SERVER_PATH}/v1/certificates/${certificateId}`, body, { headers: header }).then(response => {
    return response;
  }).catch((err) => {
    console.log(err)
    return err;
  }
  )
  delete header.Authorization;
  return res;
}


//[POST] Upload Certificate Image
async function AddCertificateImage(artId,formData) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');

  const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/images`, formData, { headers: header }).then(response => {
    return response;
  }).catch((err) => { console.log(err) })
  delete header.Authorization;
  return res;
}


//[POST] Add Attachments
async function AddAttachments(artId, attachments) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  var attsProcessed = 0;
  try{
    for(var i = 0; i < attachments.length; i++){
      const attc = {
        "data": [
          {
            "name": attachments[i].name,
            "description": attachments[i].description,
            "type": attachments[i].type,
            "timestamp": attachments[i].timestamp
          }
        ]
      };
      const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/attachments`, attc, { headers: header });
      const newAt = await AddAttachmentImage(artId, res.data.data[0].id, attachments[i].documentUrl);
      console.log("Attachment added.")
      attsProcessed++;
    }
    
    if(attsProcessed === attachments.length) {
      return {result:"success"};
    }

  } catch(err){
    console.log(err)
  }
  delete header.Authorization;
}

//[POST] Add Attachments
async function AddAttachmentImage(artId, attachmentId, formData) {
  if(header["Authorization"] !== null){
    header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  }
  const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/attachments/${attachmentId}/files`, formData, { headers: header }).then(response => {
    return response;
  }).catch((err) => { console.log(err) })
  return res;
}


//[POST] Set Certificate Privacy
async function SetCertificatePrivacy(artId, privacy) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/set-privacy`, { "isPrivate": privacy }, { headers: header }).then(response => {
    return response;
  }).catch((err) => { console.log(err) })
  delete header.Authorization;
  return res;
}


//[DELETE] Delete Draft Certificate
async function DeleteDraftCertificate(artId) {
    header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
  const res = await axios.delete(`${SERVER_PATH}/v1/certificates/${artId}`, { headers: header }).then(response => {
    return response;
  }).catch((err) => { console.log(err) })
  delete header.Authorization;
  return res;
}

//[POST] Publish Draft Certificate
async function PublishCertificate(artId) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/publish`, {}, { headers: header }).then(response => {
  return response;
}).catch((err) => { 
  return err; })
  delete header.Authorization;
  return res;
}

//[POST] Publish Draft Certificate
async function TransferCertificate(artId, body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
const res = await axios.post(`${SERVER_PATH}/v1/certificates/${artId}/transfer`, body, { headers: header }).then(response => {
  return response;
}).catch((err) => { 
  return err; })
  delete header.Authorization;
  return res;
}

//[POST] Set Account Privacy
async function SetAccountPrivacy(body) {
  header.Authorization = 'Bearer ' + await AsyncStorage.getItem('access-token');
const res = await axios.post(`${SERVER_PATH}/v1/accounts/edit/set-privacy`, body, { headers: header }).then(response => {
  return response;
}).catch((err) => { 
  return err; })
  delete header.Authorization;
  return res;
}

//[POST][GET] Login
 async function Login(auth) { 
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  axios.post(`${SERVER_PATH}/v1/auth/login`, auth, header)
  .then(response => {;
    const token = response.data.access_token;
    console.log(token);
    const myToken = JSON.stringify(token);
    AsyncStorage.setItem('token', myToken);
    //setCookie('token', token);
    header.Authorization = 'Bearer ' + token;
    const loginData = SetLoginData(token);
    return loginData
  })
  .catch(errors => console.log("errors 1:", errors));
}

//[GET] Set Login Data
async function SetLoginData(token) {
  header.Authorization = 'Bearer ' + `${token}`;
  await axios.get(`${SERVER_PATH}/v1/accounts`, { headers: header })
  .then(response => {
    if (response.status === 200) {
      //Setting User Data into LocalStorage
      //error because its callings multiple set values, ex: "value, 1"
      AsyncStorage.setItem('account-details', JSON.stringify(response.data));
      AsyncStorage.setItem('public-address', response.data.publicAddress);
      AsyncStorage.setItem('access-token', token);
      AsyncStorage.setItem('account-id', response.data.id);
      AsyncStorage.setItem('login-status', "connected");
    }
  })
  .catch(errors => console.log("error:", errors));
}

// Get Login Data
  async function GetLoginData(redirect=true) {

  var getPublic = await AsyncStorage.getItem('public-address');
  var getAccount = await AsyncStorage.getItem('account-details');
  var getAccessToken = await AsyncStorage.getItem('access-token');
  var getAccountID = await AsyncStorage.getItem('account-id');

  if (getPublic !== "" && getAccount !== "" && getAccessToken !== "" && getAccountID !== "") {
    return [{
      publicAddress: getPublic,
      accountDetails: getAccount,
      accessToken: getAccessToken,
      accountId: getAccountID
    }]
  } else {
    LogoutApp(redirect)
    return null
  }
}


// Logout
function LogoutApp(redirect = true) {
  /* eraseCookie('account-details');
  eraseCookie('public-address');
  eraseCookie('access-token');
  eraseCookie('account-id'); */
  if(CheckConnectionStatus() === "connected"){
    AsyncStorage.setItem('login-status', "disconnected");
  }
  if(redirect){
    navigation.navigate('Login');
    //window.location.href = "/login";
  }
}

async function GetAuthToken(redirect=true){
  if(GetLoginData(false) != null){
    const token = await AsyncStorage.getItem('access-token');
    return token
  } else {
    LogoutApp(redirect)
  }
}

//Cookies
async function CheckConnectionStatus(){
  const status = await AsyncStorage.getItem('login-status');

  if(status !== ""){
    if(status === "disconnected"){
      AsyncStorage.setItem('login-status', "");
      return "disconnected";
    } else {
      return status
    }
  } else {
    return status
  }
}

function setCookie(cname, cvalue, time) {
  const d = new Date();
  d.setTime(d.getTime() + (time * 60 * 60 * 1000)); //lógica para horas
  // d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000)); //lógica para dias
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

//Abbreviation of a contract
//E.g: => 0x3e1...2efD
function EthAddressAbbr(address){
  return address.substring(0,4)+"..."+address.substring(36)
}

//System Alert Messages
function NfeatAlertMessage(message, isError){
  var oldMessageList = [];
  if(localStorage.getItem("alertMessages") !== null){
   oldMessageList = JSON.parse(localStorage.getItem("alertMessages"));
  }

  oldMessageList.push({"id":String(
    Date.now().toString(32) +
      Math.random().toString(16)
  ).replace(/\./g, ''),"message":message, "isError":isError});

  localStorage.setItem("alertMessages",  JSON.stringify(oldMessageList));
}

module.exports = {
  GetUsers,
  GetArtsFromUser,
  GetArt,
  GetArtists,
  GetArtist,
  CreateArt,
  AddAttachments,
  Login,
  LogoutApp,
  GetLoginData,
  SetLoginData,
  SignupUser,
  GetUserInfo,
  GetUserData,
  EditUser,
  AddCertificateImage,
  SetCertificatePrivacy,
  DeleteDraftCertificate,
  PublishCertificate,
  EditCertificate,
  TransferCertificate,
  EthAddressAbbr,
  EditPassword,
  ChangeProfilePicture,
  ChangeBackgroundPicture,
  SetAccountPrivacy,
  CheckConnectionStatus,
  deleteAllCookies,
  NfeatAlertMessage,
  GetWebformData,
  GetDraftsFromUser,
  GetArtsFromArtist,
  UseExplorer
}