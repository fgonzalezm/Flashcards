import {combineReducers} from 'redux'

import {
  RECEIVE_DECKS,
  RECEIVE_NEW_DECK,
  ITEM_NOT_VALID,
  RECEIVE_NEW_QUESTION
} from '../actions/index'

// const testDeck = () => {
//   return {
//     Probability: {
//       title: 'Probability',
//       questions: [
//         {
//           question: 'What is bayes rule',
//           answer: 'Probability of A and B / Probability of B'
//         }
//       ]
//     }
//   }
// }

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case RECEIVE_NEW_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case RECEIVE_NEW_QUESTION: {
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck,
          questions: action.deck.questions
        }
      }
    }
    default:
      return state
  }
}

function validation (state = {}, action) {
  switch (action.type) {
    case ITEM_NOT_VALID:
      return action.validation
    case RECEIVE_NEW_DECK:
    case RECEIVE_NEW_QUESTION:
      return {}
    default:
      return state
  }
}

export default combineReducers({
  decks,
  validation
})