import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Alert
} from 'react-native'

import {connect} from 'react-redux'

import colors from '../utils/colors'
import Button from './Button1'
import IconOverlay from './IconOverlay'
import {newQuestion} from '../actions/index'

class AddQuestion extends React.Component {
  state = {
    question: '',
    answer: '',
    answerHeight: 60,
    questionHeight: 60
  }

  componentWillReceiveProps (nextProps) {
    const {navigation, count} = this.props
    if (nextProps.validation) {
      const {validation} = nextProps
      if (validation.passed === false) {
        Alert.alert(validation.message)
      }
    }

    if (nextProps.count !== count) {
      navigation.goBack()
    }
  }

  saveQuestion = () => {
    const {question, answer} = this.state
    const {deck, dispatch} = this.props

    dispatch(newQuestion(deck, {question, answer}))
  }

  render () {
    const {question, answer, answerHeight, questionHeight} = this.state
    const {deck} = this.props

    return (
      <View style={styles.container} >
        <View style={{flex: 1, alignSelf: 'stretch'}} >
          <ScrollView>
            <TextInput
              style={[styles.titleInput, {
                height: questionHeight < 60 ? 60 : questionHeight
              }]}
              value={question}
              multiline
              placeholder='Question'
              onContentSizeChange={({nativeEvent}) => {
                console.log('Question height', nativeEvent.contentSize.height)
                this.setState({questionHeight: nativeEvent.contentSize.height})
              }}
              onChangeText={(question) => this.setState({question})}
            />
            <TextInput
              style={[styles.titleInput, {
                height: answerHeight < 60 ? 60 : answerHeight
              }]}
              value={answer}
              onContentSizeChange={({nativeEvent}) => {
                console.log('Answer height', nativeEvent.contentSize.height)
                this.setState({answerHeight: nativeEvent.contentSize.height})
              }}
              multiline
              placeholder='Answer'
              onChangeText={(answer) => this.setState({answer})}
            />
          </ScrollView>
        </View>
        <Button onPress={this.saveQuestion} />
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
})

function mapStateToProps ({decks, validation}, {navigation}) {
  const {title} = navigation.state.params
  const deck = decks[title]
  return {
    deck,
    validation,
    count: deck.questions ? deck.questions.length : 0
  }
}

export default connect(mapStateToProps)(AddQuestion)