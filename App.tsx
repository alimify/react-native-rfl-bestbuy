import { Provider } from 'mobx-react'
import store from './store'
import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'

import AppNavigator from './navigation/AppNavigator'
import NavigationService from './navigation/NavigationService'

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSansCondensed-Light.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
		'open-sans-light-italic': require('./assets/fonts/OpenSansCondensed-LightItalic.ttf'),
	});
}


export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => setFontLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <AppNavigator
        ref={navigatorRef =>
          NavigationService.setTopLevelNavigator(navigatorRef)
        }
      />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
