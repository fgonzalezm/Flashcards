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


class Quiz extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {count, index} = navigation.state.params
    const page = (index + 1) > count ? count : index + 1
    return {
      headerRight: (
        <Text style={{fontSize: 24, marginRight: 5}}>{page} / {count}</Text>
      )
    }
  }

  state = {
    index: 0,
    showAnswer: false
  }

  correct = 0

  handleCorrect = () => {
    this.setState(({index}) => {
      index++
      this.props.navigation.setParams({index})
      this.correct++
      return {
        index,
        showAnswer: false
      }
    })
  }

  handleIncorrect = () => {
    this.setState(({index}) => {
      index++
      this.props.navigation.setParams({index})
      return {
        index,
        showAnswer: false
      }
    })
  }

  startOver = () => {
    this.setState(({index}) => {
      index = 0
      this.correct = 0
      this.props.navigation.setParams({index})
      return {
        index,
        showAnswer: false
      }
    })
  }

  renderScore () {
    const {deck, questionsTotal} = this.props

    let iconName
    let iconColor
    const grade = this.correct / questionsTotal * 100
    if (grade >= 90) {
      iconName = 'emoji-flirt'
      iconColor = 'green'
    } else if (grade >= 80) {
      iconName = 'emoji-happy'
      iconColor = 'green'
    } else if (grade >= 60) {
      iconName = 'emoji-neutral'
      iconColor = 'orange'
    } else {
      iconName = 'emoji-sad'
      iconColor = 'red'
    }

    return (
      <View style={[styles.container, {justifyContent: 'space-around'}]} >
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: 'green'}}>Finished!</Text>
          <Text style={{fontSize: 30}}>{this.correct} / {questionsTotal} Correct</Text>
        </View>
        <Text style={{fontSize: 30, fontWeight: 'bold', margin: 10}}>
          Score: <Text style={{color: iconColor}}>{roundValues(grade)} %</Text>
        </Text>
        <Entypo
          name={iconName}
          size={200}
          color={iconColor}
        />
        <View style={{justifyContent: 'center', alignItems: 'center' }} >
          <TouchableOpacity
            onPress={this.startOver}
            style={{marginBottom: 25}} >
            <Text style={{fontSize: 24, color: 'red'}} >Start Over</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{color: 'red'}} >
            <Text style={{fontSize: 24, color: colors.orange}} >Back to Deck</Text>
          </TouchableOpacity>
        </View>
        <IconOverlay
          iconName={deck.iconName}
          iconSize={40}
          iconColor={'purple'}
        />
      </View>
    )
  }

  render () {
    const {deck, questionsTotal} = this.props
    const {index, showAnswer} = this.state

    let element

    if (index === (questionsTotal)) {
      return this.renderScore()
    } else if (showAnswer) {
      element = (
        <View style={styles.questionView}>
          <Text style={styles.text}>
            {deck.questions[index].answer}
          </Text>
          <TouchableOpacity onPress={() => this.setState({showAnswer: false})} >
            <Text style={{color: 'red', fontSize: 24}}>Question</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      element = (
        <View style={styles.questionView}>
          <Text style={styles.text}>
            {deck.questions[index].question}
          </Text>
          <TouchableOpacity onPress={() => this.setState({showAnswer: true})} >
            <Text style={{color: 'red', fontSize: 24}}>Answer</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View style={styles.container} >
        {element}
        <TouchableOpacity
          onPress={this.handleCorrect}
          style={[styles.button, styles.correct]} >
          <Text style={styles.buttonText} >Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleIncorrect}
          style={[styles.button, styles.incorrect]} >
          <Text style={styles.buttonText} >Incorrect</Text>
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

function roundValues (number, length) {
  let value = number
  if (value > 10) {
    value = Math.round(value)
  } else {
    let endIndex = length || 3
    if (value < 0) {
      endIndex++
    }
    let string = value.toString()
    value = string.substring(0, endIndex)
  }
  return value
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    backgroundColor: colors.green
  },
  questionView: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
  },
  text: {
    fontSize: 36,
    marginTop: 30,
    textAlign: 'center',
    // marginHorizontal: 10
  },
  button: {
    borderRadius: 12,
    // paddingHorizontal: 40,
    width: 200,
    paddingVertical: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  correct: {
    backgroundColor: 'green',
    marginTop: 30
  },
  incorrect: {
    backgroundColor: 'red',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 30,
    color: 'white'
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

export default connect(mapStateToProps)(Quiz)