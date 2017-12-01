import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'

import {connect} from 'react-redux'
import {Entypo} from '@expo/vector-icons'
import {AppLoading} from 'expo'

import colors from '../utils/colors'
import {loadDecks} from '../actions/index'
import IconOverlay from './IconOverlay'

class DeckList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={() => {
          navigation.navigate('AddDeck')
        }}>
          <Entypo name='circle-with-plus' size={30}/>
        </TouchableOpacity>
      )
    }
  }



  componentDidMount () {
    this.props.dispatch(loadDecks())
  }

  renderItem = ({item}) => {
    const {navigation} = this.props

    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('Deck', {title: item.title})
      }} >
        <View style={styles.itemContainer} >
          <Text style={styles.titleText} >
            {item.title}
          </Text>
          <Text style={styles.cardsCountText} >
            {item.questions ? item.questions.length : 0} Cards
          </Text>
        </View>
        <IconOverlay
          iconName={item.iconName}
          iconSize={30}
          iconColor={'purple'}
        />
      </TouchableOpacity>
    )
  }

  render () {
    const {decks} = this.props
    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 150,
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: colors.green,
    alignItems: 'center',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 30,

  },
  cardsCountText: {
    fontSize: 24,
    color: 'grey'
  }
})

function mapStateToProps ({decks}) {
  const deckArray = Object.keys(decks).map(deck => {
    decks[deck].key = deck
    return decks[deck]
  })
  return {
    decks: deckArray
  }
}

export default connect(mapStateToProps)(DeckList)
