import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native'

import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import reducer from './reducers/index'
import {Constants} from 'expo'

import MainNavigator from './components/MainNavigator'
import {setLocalNotification} from "./utils/helpers";
import colors from "./utils/colors";

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

function FlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store} >
        <View style={styles.container}>
          {Platform.OS === 'ios' ? null : <FlashcardsStatusBar backgroundColor={colors.orange} barStyle='dark-content' /> }
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
