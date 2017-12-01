import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux'

import {Entypo} from '@expo/vector-icons'
import colors from '../utils/colors'
import IconOverlay from './IconOverlay'

class Deck extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params
    return {
      title,
      headerRight:  (
        <TouchableOpacity onPress={() => {
          navigation.navigate('AddQuestion', {title})
        }} >
          <Entypo name='circle-with-plus' size={30} />
        </TouchableOpacity>
      )
    }
  }

  render () {
    const {title} = this.props.navigation.state.params
    const {questionsTotal, deck, navigation} = this.props

    return (
      <View style={styles.container} >
        <Text style={styles.cardsCountText} >
          {questionsTotal} Cards
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(
            'Quiz', {count: questionsTotal, index: 0, title: deck.title}
            )}
          style={styles.testButton} >
          <Text style={{fontSize: 36}} >Test Yourself</Text>
        </TouchableOpacity>
        <IconOverlay
          iconName={deck.iconName}
          iconSize={40}
          iconColor={'purple'}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    backgroundColor: colors.green
  },
  cardsCountText: {
    fontSize: 30,
    color: 'grey',
    marginTop: 50
  },
  testButton: {
    borderWidth: 1,
    backgroundColor: 'green',
    borderRadius: 7,
    margin: 20,
    padding: 10
  }
})

function mapStateToProps ({decks}, {navigation}) {
  const {title} = navigation.state.params
  const deck = decks[title]
  return {
    questionsTotal: deck.questions ? deck.questions.length : 0,
    deck
  }
}

export default connect (mapStateToProps) (Deck)