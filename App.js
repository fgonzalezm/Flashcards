import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'

import reducer from './reducers/index'

import MainNavigator from './components/MainNavigator'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <View style={styles.container}>
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
