import {AsyncStorage} from 'react-native'

const DECKS_KEY = 'ReactFlashcards:Decks'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
}

export function saveNewDeck (deck) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [deck.title]: deck
  }))
}

export function saveDeckQuestions (title, questions) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [title]: {questions}
  }))
}