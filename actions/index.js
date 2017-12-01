import {saveNewDeck, getDecks, saveDeckQuestions} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RECEIVE_NEW_DECK = 'RECEIVE_NEW_DECK'
export const ITEM_NOT_VALID = 'ITEM_NOT_VALID'
export const RECEIVE_NEW_QUESTION = 'RECEIVE_NEW_QUESTION'

export const loadDecks = () => dispatch => {
  getDecks()
    .then(decks => {
      dispatch(receiveDecks(decks))
    })
}

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})


export const newDeck = (deck, overwrite = false) => (dispatch, getState) => {
  deck.title = deck.title.trim()
  const {title} = deck
  const validation = new Validation()
  if (title.trim() === '') {
    validation.fail('title cannot be empty')
  } else if (!overwrite && getState().decks[title]) {
    validation.fail('title already exists')
  }

  if (!validation.passed) {
    dispatch(itemNotValid(validation))
    return
  }

  saveNewDeck(deck)
    .then(() => dispatch(receiveNewDeck(deck)))
}

const receiveNewDeck = (deck) => ({
  type: RECEIVE_NEW_DECK,
  deck
})


const itemNotValid = (validation) => ({
  type: ITEM_NOT_VALID,
  validation
})

export const newQuestion = (deck, item) => (dispatch) => {
  item.question = item.question.trim()
  item.answer = item.answer.trim()

  const validation = new Validation()
  if (item.question === '') {
    validation.fail('question cannot be empty')
  } else if (item.answer === '') {
    validation.fail('answer cannot be empty')
  }

  if (!validation.passed) {
    dispatch(itemNotValid(validation))
    return
  }

  if (!deck.questions) {
    deck.questions = []
  }
  deck.questions.push(item)

  saveDeckQuestions(deck.title, deck.questions)
    .then(decks => dispatch(receiveNewQuestion(deck)))
}

const receiveNewQuestion = (deck) => ({
  type: RECEIVE_NEW_QUESTION,
  deck
})


class Validation {
  passed = true

  fail = (errorMessage) => {
    this.passed = false
    this.message = errorMessage
  }
}