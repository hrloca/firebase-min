import { createStore } from 'redux'
import reducer from './reducer'

const initialStore = (initialState) => createStore(reducer, initialState)

export default initialStore()
