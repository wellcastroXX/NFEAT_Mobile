import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    'Montserrant': require('./assets/fonts/Montserrat-Medium.ttf'),
  });
