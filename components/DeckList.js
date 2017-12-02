import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated
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

  state = {
    position: new Animated.Value(0),
  }

  componentDidMount () {
    this.props.dispatch(loadDecks())
  }

  componentWillReceiveProps (nextProps) {
    // const {decks} = this.props
    // const nextDeck = nextProps.decks
    //
    // if (decks.length !== nextDeck.length) {
    //   this.setState({positions})
    // }
  }

  renderItem = ({item, index}) => {
    const {navigation, positions} = this.props

    const animatedStyle = {transform: [{scale: positions[index]}]}

    return (
      <TouchableOpacity onPress={() => {
        Animated.sequence([
          Animated.timing(positions[index], {duration: 200, toValue: 1.04}),
          Animated.spring(positions[index], {toValue: 1, friction: 4})
        ]).start(() => {
          navigation.navigate('Deck', {title: item.title})
        })
      }} >
        <Animated.View style={[styles.itemContainer, animatedStyle]} >
          <Text style={styles.titleText} >
            {item.title}
          </Text>
          <Text style={styles.cardsCountText} >
            {item.questions ? item.questions.length : 0} Cards
          </Text>
        </Animated.View>
        <IconOverlay
          animatedStyle={animatedStyle}
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
  const positions = deckArray.map(() => new Animated.Value(1))
  return {
    decks: deckArray,
    positions
  }
}

export default connect(mapStateToProps)(DeckList)
