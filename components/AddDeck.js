import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native'

import {connect} from 'react-redux'
import {Entypo} from '@expo/vector-icons'

import colors from '../utils/colors'
import {newDeck} from '../actions/index'

import IconOverlay from './IconOverlay'
import Button from './Button1'

class AddDeck extends React.Component {
  state = {
    title: '',
    iconName: 'feather'
  }

  componentWillReceiveProps (nextProps) {
    const {count, navigation} = this.props
    if (nextProps.validation) {
      const {validation} = nextProps
      if (validation.passed === false) {
        Alert.alert(validation.message)
      }
    }

    if (nextProps.count !== count) {
      navigation.navigate('Deck', {title: this.state.title.trim()})
    }
  }

  getData = () => {
    return [
      'eye',
      'fingerprint',
      'feather',
      'flashlight',
      'classic-computer',
      'cog',
      'credit',
      'database',
      'dribbble',
      'drink',
      'drop',
      'flash',
      'flag',
      'flower',
      'game-controller',
      'graduation-cap',
      'heart',
      'images',
      'infinity',
      'lab-flask',
      'leaf',
      'network',
      'paper-plane',
      'rainbow',
      'rocket',
      'ruler',
      'star',
      'swarm',
      'thumbs-up'
    ]
  }

  saveDeck = () => {
    this.props.dispatch(newDeck(this.state))
  }

  renderItem = ({item}) => {
    let color = 'grey'
    const {iconName} = this.state
    if (item === iconName) {
      color = 'red'
    }

    return (
        <TouchableOpacity
          onPress={() => this.setState({iconName: item})}
          style={styles.iconButton} >
          <Entypo
            name={item}
            size={60}
            color={color}
          />
        </TouchableOpacity>
    )
  }

  render () {
    const {title, iconName} = this.state
    const {validation} = this.props
    const iconSize = 40
    const iconColor = 'purple'

    return (
      <View style={styles.container} >
        <View style={{flex: 1, alignItems: 'center'}} >
          <TextInput
            style={styles.titleInput}
            value={title}
            placeholder='Title'
            onChangeText={(title) => this.setState({title})}
          />
          <Text style={{marginTop: 50}}>
            Choose an icon:
          </Text>
          <View style={{height: 100}} >
          <FlatList
            data={this.getData()}
            style={styles.icons}
            horizontal
            renderItem={this.renderItem}
            keyExtractor={(index) => index}
          />
          </View>
        </View>
        <Button onPress={this.saveDeck}/>
        <IconOverlay
          iconName={iconName}
          iconSize={iconSize}
          iconColor={iconColor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    backgroundColor: colors.green
  },
  titleInput: {
    height: 60,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    marginHorizontal: 40,
    fontSize: 24,
    marginTop: 50
  },
  icons: {
    margin: 10,
  },
  iconButton: {
    paddingHorizontal: 10,
  },
})

function mapStateToProps ({validation, decks}) {
  return {
    validation,
    count: Object.keys(decks).length
  }
}

export default connect(mapStateToProps)(AddDeck)
