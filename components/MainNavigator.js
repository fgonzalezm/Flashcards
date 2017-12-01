import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'

import {StackNavigator} from 'react-navigation'

import DeckList from './DeckList'
import Deck from './Deck'
import AddDeck from './AddDeck'
import AddQuestion from './AddQuestion'
import Quiz from './Quiz'

import colors from '../utils/colors'

export default MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks',
    }
  },
  Deck: {
    screen: Deck
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck'
    }
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      title: 'Add Question'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
}, {
  navigationOptions: {
    headerTintColor: '#222',
    headerStyle: {
      backgroundColor: colors.orange
    },
    headerTitleStyle: {
      fontSize: 30
    }
  }
})